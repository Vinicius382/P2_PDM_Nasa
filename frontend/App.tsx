import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react'

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

export default function App() {
  const [fotosDoDia, setFotosDoDia] = useState<FotoDoDia[]>([])
  const [resultados, setResultados] = useState<ResultadoBusca[]>([])

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Fotos do dia</Text>
      <View style={styles. fotosDoDiaContainer}>
        <Text style={styles.placeholder}>Fotos do dia</Text>
      </View>

      <View style={styles.buscaContainer}>
        <Text style={styles.placeholder}>Componente de busca</Text>
      </View>

      <View style={styles.resultadosContainer}>
          <Text style={styles.placeholder}>Resultados da busca</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles. placeholder}>Footer</Text>
      </View>
    </View>
  )
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