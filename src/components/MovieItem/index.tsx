import React,{useEffect, useState} from 'react'
import {TouchableWithoutFeedback, Image, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { Category, Movie } from '../../models';
import {Storage} from 'aws-amplify'


function MovieItem(props) {

    const {movie} = props
    const [imageUrl, setimageUrl] = useState('');
    const navigation = useNavigation();

    const navigate_movie_details = () =>{
        console.log(props, 'movie')
        navigation.navigate('movie_detail',{id:movie.id})
    }

    useEffect(()=>{
        if(movie.poster.startsWith('http')){
            setimageUrl(movie.poster);
            return
        }
        Storage.get(movie.poster).then(setimageUrl)
    },[])
    return (
        <TouchableWithoutFeedback onPress={()=> navigate_movie_details()}>
            <Image style={styles.image} source={{uri: imageUrl}}/>
        </TouchableWithoutFeedback>
    )
}

export default MovieItem


const styles = StyleSheet.create({
    image:{
        height:150,
        width:100,
        resizeMode:'cover',
        // borderWidth:0.2,
        // borderColor:'grey',
        borderRadius:5,
        margin:5
    },
})