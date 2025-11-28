import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Props {
    titulo: string;
    descricao: string;
    url: string;
}

export default function ResultadoBusca({ titulo, descricao, url }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.titulo}>{titulo}</Text>
            {url && (
                <Image source={{ uri: url }} style={styles.imagem} />
            )}
            <Text style={styles.descricao}>{descricao}</Text>
            </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,   
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    titulo: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',    
    },
    imagem: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#ddd',
    },
    descricao: {
        fontSize: 12,
        color: '#646464ff',
        textAlign: 'justify',
    },
})