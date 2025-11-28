import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImagemDia from './componentes/ImagemDia'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api, STORAGE_KEY } from './utils/config';
import BuscaImagens from './componentes/BuscaImagens';
import ResultadoBusca from './componentes/ResultadoBusca';

interface FotoDoDia {
  date: string
  title: string
  url: string
}

interface ResultadoBusca {
  titulo: string
  descricao: string
  urlImagem: string
}

interface State {
  fotosDoDia: FotoDoDia[]
  resultados: ResultadoBusca[]
  carregando: boolean
  buscando: boolean
}

export default class App extends Component<{}, State> {

  state: State = {
    fotosDoDia: [],
    resultados: [],
    carregando: false,
    buscando: false,
  }

  componentDidMount() { 
    this.buscarFotosDoDia()  
}

  salvarFotos = async (fotos: FotoDoDia[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fotos))
  }

  carregarFotos = async () => {
    const dados = await AsyncStorage.getItem(STORAGE_KEY)
      if (dados) {
        return JSON.parse(dados) as FotoDoDia[]
      }
      return []
  }

buscarFotosDoDia = async () => {
  this.setState({ carregando: true })

  const fotosSalvas = await this.carregarFotos()

  const response = await api.get(`/imagem-dia`)
  const foto = response.data

  const verificarExistencia = () => {
    for (const item of fotosSalvas) {
      if (item.date === foto.date) {
        return true
      }
    }
    return false
  }

  const jaExiste = verificarExistencia()
  if (!jaExiste && foto.media_type === 'image') {
    const novaLista = [
      { date: foto.date, 
        title: foto.title, 
        url: foto.url
      },
      ...fotosSalvas,
    ]
    await this.salvarFotos(novaLista)

    this.setState({
      fotosDoDia: novaLista,
      carregando: false,
    })
  } else {
    this.setState({
      fotosDoDia: fotosSalvas,
      carregando: false,
    })
  }
}

buscarImagens = async (termo: string, ano: number) => {
  this.setState({ buscando:true })

  const response = await api.get(`/buscar?termo=${termo}&ano=${ano}`)

  this.setState({
    resultados: response.data,
    buscando: false
  })
}


render () {
  const { fotosDoDia, resultados, carregando, buscando } = this.state
  return (
  <View style={styles.container}>

    <Text style={styles.titulo}>Fotos do dia</Text>
    <View style={styles.fotosDoDiaContainer}>
      {fotosDoDia.length === 0 ? (
        <Text style={styles.placeholder}>Nenhuma foto do dia no momento</Text>
      ) : (
        <FlatList
          data={fotosDoDia}
          horizontal
          keyExtractor={(item) => item.date}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={({ item }) => (
            <ImagemDia
              date={item.date}
              url={item.url}
            />
          )}
        />
      )}
    </View>

    <View style={styles.buscaContainer}>
      <BuscaImagens aoBuscar={this.buscarImagens} />
    </View>

    <View style={styles.resultadosContainer}>
      {buscando ? (
        <Text style={styles.placeholder}>Buscando....</Text>
      ): resultados.length === 0 ? (
        <Text style={styles.placeholder}>
          Digite o que procura e selecione um ano para filtrar
        </Text>
      ) : (
        <FlatList
          data={resultados}
          keyExtractor={(item, indice) => indice.toString()}
          renderItem={({ item }) => (
            <ResultadoBusca 
              titulo={item.titulo}
              descricao={item.descricao}
              url={item.urlImagem}
              />
          )}
          />
      )}
    </View>

    <View style={styles.footer}>
      <Text style={styles.placeholder}>Footer</Text>
    </View>
  </View>
)
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 16,
    maxWidth: 700,
    marginInline: 'auto',
  },
  titulo: {
    fontSize: 20,
  },
  fotosDoDiaContainer: {
    height: 140,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  buscaContainer: {
    marginTop: 5,
  },
  resultadosContainer: {
    flex: 1,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  footer: {
    height: 100,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: '#999',
    textAlign: 'center',
  },
});