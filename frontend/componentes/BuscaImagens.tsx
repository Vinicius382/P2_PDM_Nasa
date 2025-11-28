import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import { useState } from 'react'

interface Props {
    aoBuscar: (termo: string, ano: number) => void
}

export default function BuscaImagens({ aoBuscar }: Props) {
    const [termo, setTermo] = useState<string>('')
    const [anoEscolhido, setAnoEscolhido] = useState<number>(new Date().getFullYear())

    const gerarAnosAnteriores = () => {
        const anoAtual = new Date().getFullYear()

        return [
            anoAtual - 5,
            anoAtual - 4,
            anoAtual - 3,
            anoAtual - 2,
            anoAtual - 1,
            anoAtual
        ]
    }

    const buscar = () => {
        if (termo.length > 0) {
            aoBuscar(termo, anoEscolhido)
        }
    }
    const anos = gerarAnosAnteriores()

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite a imagem que procura"
                value={termo}
                onChangeText={setTermo}
            />

            <Text style={styles.titulo}></Text>

            <View style={styles.anosContainer}>
                {anos.map((ano) => (
                    <Pressable
                        key={ano}
                        style={[styles.botaoAno,
                        anoEscolhido === ano && styles.anoSelecionado]}
                        onPress={() => setAnoEscolhido(ano)}
                    >
                        <Text
                            style={[styles.textoAno,
                            anoEscolhido === ano && styles.textoAnoSelecionado]}
                        >
                            {ano}
                        </Text>
                    </Pressable>
      ))
    }
            </View>
            <Pressable style={styles.botaoBuscar} onPress={buscar}>
                <Text style={styles.textoBotaoBuscar}>Buscar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 12,
        borderRadius: 4,
        marginBottom: 16,
    },
    titulo: {
        fontSize: 18,
        marginBottom: 10,
    },
    anosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 16,
    },
    botaoAno: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    anoSelecionado: {
        backgroundColor: '#007BFF',
        borderColor: '#007BFF',
    },
    textoAno: {
        color: '#333',
    },
    textoAnoSelecionado: {
        color: '#fff',
    },
    botaoBuscar: {
        backgroundColor: '#0069F3',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    textoBotaoBuscar: {
        color: '#fff',
        fontSize: 16,
    },
})