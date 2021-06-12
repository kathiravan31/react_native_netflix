import React,{useEffect, useState} from 'react';
import { Text, View, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import styles from './style'
import {useNavigation} from '@react-navigation/native'
import { Category, Movie } from '../../models';
import { DataStore, Storage } from 'aws-amplify';
import MovieItem from '../MovieItem';

interface HomeCategoryProps {
    category: Category
}


function HomeCategory(props: HomeCategoryProps) {

    const {category} = props;

    const [movies, setMovies] = useState<Movie[]>([]);

    const navigation = useNavigation();

    useEffect(()=>{
        const fetchMovies = async ()=>{
            const result = (await DataStore.query(Movie))
                            .filter((movie)=>movie.categoryID === category.id)

            setMovies(result);
        }

        fetchMovies();
    },[])

    

    return (
        <>
            <Text style={styles.title}>{category.title}</Text>
            <FlatList
                data={movies}
                renderItem={({item})=> <MovieItem movie={item}/>}
                horizontal
                showsHorizontalScrollIndicator={false}
            />

        </>
    )
};

export default HomeCategory;
