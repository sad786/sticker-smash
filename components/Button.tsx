import {StyleSheet, View, Pressable, Text} from 'react-native';
import  FontAwesome  from '@expo/vector-icons/FontAwesome';
type Props = {
    label: string,
    theme?: 'primary',
    onClick: ()=>void,
}

export default function Button({label,theme,onClick}:Props){

    if(theme==='primary'){
        return(
            <View
                style={[styles.buttonContainer,{borderWidth:4, borderColor:'#ffd33d', borderRadius:18},]}>
                <Pressable
                style={[styles.button,{backgroundColor:'#fff'}]}
                onPress={onClick}>
                <FontAwesome name="picture-o" size={18} color='#25292e' sytle={styles.buttonIcon}/>
                <Text style={[styles.buttonLabel,{color:'#25292e'},]}>{label}</Text>
                </Pressable>

            </View>
        )
    }
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={()=>{alert("You Pressed on button");}}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer:{
        width:320,
        height:68,
        marginHorizontal:20,
        padding:20,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonLabel:{
        color:'#fff',
        fontSize:16,
    },
    button:{
        borderRadius:16,
        flexDirection:'row',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    buttonIcon:{
        paddingRight:8,
    },
});