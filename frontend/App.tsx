import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import ImagemDia from './componentes/ImagemDia';

interface FotoDoDia {
  date: string;
  title: string;
  url: string;
}

interface ResultadoBusca {
  titulo: string;
  descricao: string;
  urlImagem: string;
}

interface State {
  fotosDoDia: FotoDoDia[];
  resultados: ResultadoBusca[];
  carregando: boolean;
}

const back_url = 'http://localhost:3000'

export default class App extends Component<{}, State> {

  state: State = {
    fotosDoDia: [],
    resultados: [],
    carregando: false,
  }

  componentDidMount() { 
    this.buscarFotosDoDia()  
}

buscarFotosDoDia = async () => {
  this.setState({ carregando: true })

  const response = await axios.get(`${back_url}/imagem-dia`)
  const foto = response.data

  const verificarExistencia = () => {
    for (const item of this.state.fotosDoDia) {
      if (item.date === foto.date) {
        return true
      }
    }
    return false
  }

  const jaExiste = verificarExistencia()
  if (!jaExiste && foto.media_type === 'image') {
    this.setState({
      fotosDoDia: [
        {
          date: foto.date,
          title: foto.title,
          url: foto.url
        },
        ...this.state.fotosDoDia,
      ],
    });
  }

  this.setState({ carregando: false })
}



render () {
  const { fotosDoDia, carregando } = this.state
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
      <Text style={styles.placeholder}>Componente de busca</Text>
    </View>

    <View style={styles.resultadosContainer}>
      <Text style={styles.placeholder}>Resultados da busca</Text>
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
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 28,
    marginTop: 10,
    marginBottom: 10,
  },
  fotosDoDiaContainer: {
    height: 130,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  buscaContainer: {
    marginTop: 16,
  },
  resultadosContainer: {
    flex: 1,
    marginTop: 16,
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