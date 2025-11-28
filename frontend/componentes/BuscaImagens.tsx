import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import { useState } from 'react'
import { api } from '../utils/config'
import ResultadoBusca from './ResultadoBusca'

interface Resultado {
    titulo: string
    descricao: string
    urlImagem: string
}

export default function BuscaImagens() {
    const [termo, setTermo] = useState<string>('')
    const [anoEscolhido, setAnoEscolhido] = useState<number>(new Date().getFullYear())
    const [resultados, setResultados] = useState<Resultado[]>([])
    const [buscando, setBuscando] = useState<boolean>(false)

    const anoAtual = new Date().getFullYear()
    const gerarAnosAnteriores = () => {
        return [
            anoAtual - 5,
            anoAtual - 4,
            anoAtual - 3,
            anoAtual - 2,
            anoAtual - 1,
        ]
    }

    const buscar = async () => {
        if (termo.length > 0) {
            setBuscando(true)

            const response = await api.get(`/buscar?termo=${termo}&ano=${anoEscolhido}`)
            setResultados(response.data)
            setBuscando(false)
        }
    }

    const anosAnteriores = gerarAnosAnteriores()
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite a imagem que procura"
                value={termo}
                onChangeText={setTermo}
            />


            <View style={styles.anosContainer}>
                {anosAnteriores.map((ano) => (
                    <Pressable
                        key={ano}
                        style={[
                            styles.botaoAno,
                            anoEscolhido === ano && styles.anoSelecionado
                        ]}
                        onPress={() => setAnoEscolhido(ano)}
                    >
                        <Text
                            style={[
                                styles.textoAno,
                                anoEscolhido === ano && styles.textoAnoSelecionado
                            ]}
                        >
                            {ano}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Pressable style={[styles.botaoAnoAtual, anoEscolhido === anoAtual && styles.anoSelecionado]}
                onPress={() => setAnoEscolhido(anoAtual)}
            >
                <Text style={[styles.textoAno, anoEscolhido === anoAtual && styles.textoAnoSelecionado]}
                > {anoAtual} </Text>
            </Pressable>

            <Pressable style={styles.botaoBuscar} onPress={buscar}>
                <Text style={styles.textoBotaoBuscar}>Buscar</Text>
            </Pressable>

            <View style={styles.resultadosContainer}>
                {buscando ? (
                    <Text style={styles.placeholder}>Buscando...</Text>
                ) : (
                    <FlatList
                        data={resultados}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.listContent}
                        keyExtractor={(item) => item.urlImagem}
                        ListEmptyComponent={
                            <Text style={styles.placeholder}>
                                O resultado de sua busca aparecerá aqui.
                            </Text>
                        }
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 6,
    },
    anosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        gap: 8,
    },
    botaoAno: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    botaoAnoAtual: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 6,
    },
    anoSelecionado: {
        backgroundColor: '#358f00ff',
    },
    textoAno: {
        color: '#333',
        fontSize: 14,
    },
    textoAnoSelecionado: {
        color: '#fff',
    },
    botaoBuscar: {
        backgroundColor: '#0069F3',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    textoBotaoBuscar: {
        color: '#fff',
        fontSize: 16,
    },
    resultadosContainer: {
        flex: 1,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,

    },
    listContent: {
        gap: 16,
    },
    row: {
        justifyContent: 'space-between',
        gap: 16,
    },
    placeholder: {
        color: '#999',
        textAlign: 'center',
    },
})