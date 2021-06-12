import React,{useEffect, useState} from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import styles from './style'
import {DataStore} from 'aws-amplify'
import {Category} from '../../models'


import categories from '../../data/categories'
import HomeCategory from '../../components/HomeCategory';



function HomeScreen() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(()=>{
        const fetchCategories = async () => {
            setCategories(await DataStore.query(Category));
        }

        fetchCategories();
    })
    return (
        <View style={styles.container}>
            {/*  List of category  */}
            <FlatList
                data={categories}
                renderItem={({item})=> <HomeCategory category={item}/>}
            />
            
        </View>
    )
};

export default HomeScreen;
