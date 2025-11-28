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
            {url && (
                <Image source={{ uri: url }} style={styles.imagem} />
            )}
            <Text style={styles.titulo} numberOfLines={1}> {titulo} </Text>
            <Text style={styles.descricao} numberOfLines={3}> {descricao} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        maxWidth: '48%',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    titulo: {
        fontSize: 14,
        marginBottom: 8,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    imagem: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        backgroundColor: '#ddd',
    },
    descricao: {
        fontSize: 12,
        color: '#646464ff',
        textAlign: 'center',
        paddingHorizontal: 10,
        marginTop: 8,
    },
})