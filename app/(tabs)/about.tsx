import {Text, View, StyleSheet} from 'react-native';


export default function AboutS(){

    return (
        <View style={styles.container}>
            <Text style = {styles.text}>This is About Page Built</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color:"#fff",
        fontSize : 20,
        fontStyle : "italic",
    },

    container: {
        backgroundColor: "green",
        flex : 1,
        alignItems: "center",
        justifyContent: "center",
    },
});