import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    image:{
        height:150,
        width:100,
        resizeMode:'cover',
        // borderWidth:0.2,
        // borderColor:'grey',
        borderRadius:5,
        margin:5
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    }
})

export default styles;