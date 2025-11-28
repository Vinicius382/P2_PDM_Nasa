import React from 'react'
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api, STORAGE_KEY } from '../utils/config'

interface FotoDoDia {
    date: string
    title: string
    url: string
}

interface State {
    fotosDoDia: FotoDoDia[]
    carregando: boolean
}

export default class ImagemDia extends React.Component<{}, State> {
    state: State = {
        fotosDoDia: [],
        carregando: true,
    }

    componentDidMount() {
        this.carregarFotos()
        this.buscarFotosDoDia()
    }

    salvarFotos = async (fotos: FotoDoDia[]) => {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fotos))
    }

    carregarFotos = async () => {
        const dados = await AsyncStorage.getItem(STORAGE_KEY)
        if (dados) {
            const fotos = JSON.parse(dados) as FotoDoDia[]
            this.setState({
                fotosDoDia: fotos,
                carregando: false,
            })
        } else {
            this.setState({ carregando: false })
        }
    }

    buscarFotosDoDia = async () => {
        const response = await api.get(`/imagem-dia`)
        const foto = response.data
        const { fotosDoDia } = this.state

        const jaExiste = fotosDoDia.filter(item => item.date === foto.date).length > 0

        const deveSalvar = !jaExiste && foto.media_type === 'image'

        if (deveSalvar) {
            const novaLista = [
                {
                    date: foto.date,
                    title: foto.title,
                    url: foto.url
                },
                ...fotosDoDia]
            await this.salvarFotos(novaLista)
            this.setState({ fotosDoDia: novaLista })
        }
    }

    formatarData = (dataString: string) => {
        const objetoData = new Date(dataString)
        const ano = objetoData.getUTCFullYear()
        const mes = objetoData.getUTCMonth() + 1
        const dia = objetoData.getUTCDate()
        return `${dia}/${mes}/${ano}`
    }

    render() {
        const { fotosDoDia, carregando } = this.state
        return (
            <View>
                <Text style={styles.titulo}>Fotos do dia</Text>
                <View style={styles.fotosDoDiaContainer}>
                    {carregando ? (
                        <Text style={styles.placeholder}>Carregando... </Text>
                    ) : (
                        <FlatList
                            data={fotosDoDia}
                            inverted
                            horizontal
                            keyExtractor={(item) => item.date}
                            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                            ListEmptyComponent={
                                <Text style={styles.placeholder}>Nenhuma foto do dia no momemnto.</Text>
                            }
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <Image source={{ uri: item.url }} style={styles.imagem} />
                                    <Text style={styles.texto}>{this.formatarData(item.date)}</Text>
                                </View>
                            )}
                        />
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20,
        textAlign: 'center',
    },
    fotosDoDiaContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    placeholder: {
        color: '#999',
        textAlign: 'center',
    },
    card: {
        width: 200,
        alignItems: 'center',
    },
    imagem: {
        width: 200,
        height: 200,
        borderRadius: 8,
        backgroundColor: '#ddd',
    },
    texto: {
        marginTop: 8,
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
})