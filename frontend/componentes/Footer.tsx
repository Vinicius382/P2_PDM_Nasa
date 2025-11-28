import {
    Image,
    Linking,
    Pressable,
    StyleSheet,
    Text,
    View,
}
    from 'react-native'
import Anticon from '@expo/vector-icons/AntDesign'

const desenvolveres = [
    {
        id: 1,
        nome: 'Felipe Magnani Lobo Alvarez',
        linkedin: 'https://www.linkedin.com',
        github: 'https://github.com/FelipeMLAPerez'
    },
    {
        id: 2,
        nome: 'Juan Pablo Mandarino ',
        linkedin: 'https://www.linkedin.com',
        github: 'https://github.com/JuanesPablo'
    },
    {
        id: 3,
        nome: 'Peterson Liborio de Jesus Rocha',
        linkedin: 'https://www.linkedin.com',
        github: 'https://github.com/petersonljr'
    },
    {
        id: 4,
        nome: 'Vinicius Oliveira Santos',
        linkedin: 'https://www.linkedin.com',
        github: 'https://github.com/Vinicius382'
    }
]

export default function Footer() {
    return (
        <View style={styles.container}>
        <Text style={styles.tituloFooter}>Desenvolvido por:</Text>

        <View style={styles.listaDesenvolvedores}>
            {desenvolveres.map((dev) => (
                <View key={dev.id} style={styles.card}>
                    <View style={styles.iconePerfil}>
                        <Anticon name='user' size={36} color='#000000ff' />
                    </View>
                    <Text style={styles.nome}>{dev.nome}</Text>

                    <View style={styles.redesSociais}>
                        {dev.linkedin && (
                            <Pressable onPress={() => Linking.openURL(dev.linkedin)}>
                                <Anticon name='linkedin' size={32} color='#0A66C2' />
                            </Pressable>
                        )}
                        {dev.github && (
                            <Pressable onPress={() => Linking.openURL(dev.github)}>
                                <Anticon name='github' size={32} color='#000' />
                            </Pressable>
                        )}
                    </View>
                </View>
            ))}
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        width: '100%',
    },
    tituloFooter: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
    listaDesenvolvedores: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 16,
    },
    card: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: 140,
    },
    iconePerfil: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#ccc',
    },
    nome: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    redesSociais: {
        flexDirection: 'row',
        gap: 12,
    },
})