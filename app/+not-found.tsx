import {Text, View, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

export default function NotFoundScreen(){
    return (
        <View style={styles.contaner}>
            <Text style={styles.text}>The Page you are looking is not available</Text>
            <Link href="/" style={styles.text}>Go To HomePage</Link>
        </View>
    );
}
const styles = StyleSheet.create({
    contaner: {
        backgroundColor: 'blue',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: 'green',
        fontSize: 20,
        textDecorationLine:'underline',
        textDecorationColor:'yellow'
    },
});