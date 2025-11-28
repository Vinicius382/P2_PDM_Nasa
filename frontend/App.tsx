import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import ImagemDia from './componentes/ImagemDia'
import BuscaImagens from './componentes/BuscaImagens';
import Footer from './componentes/Footer';

export default function App() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ImagemDia />
      <BuscaImagens />
      <Footer />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    maxWidth: 700,
    alignSelf: 'center',
    width: '100%',
  },
})