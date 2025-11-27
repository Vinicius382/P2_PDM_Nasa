import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View,
}from 'react-native'

interface Props {
    date: string;
    url: string;
}

export default function ImagemDia({date, url}: Props) {
  
    const formatarData = (dataString: string) => {
        const objetoData = new Date(dataString)
        
        const ano = objetoData.getUTCFullYear()
        const mes = objetoData.getUTCMonth() + 1
        const dia = objetoData.getUTCDate()

        return `${dia}/${mes}/${ano}`
    }
  
    return (
    <View style={styles.card}>
        <Image source={ {uri: url }} style={styles.imagem} />
        <Text style={styles.texto}>{formatarData(date)}</Text> 
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        width: 160,
        marginRight: 12,
        alignItems: 'center',
    },
    imagem: {
        width: 150,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#ddd',
    },
    texto: {
        marginTop: 4,
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
})
