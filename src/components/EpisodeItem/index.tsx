import React from 'react'
import {View, Text, Image, Pressable} from 'react-native'
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Episode } from '../../../types';
import {useNavigation} from '@react-navigation/native'

interface EpisodeItemProps{
    episode: Episode
}

function EpisodeItem(props: EpisodeItemProps) {
    const {episode} = props;
    const navigation = useNavigation();

    const navigate_to_videoScreen = () =>{
        navigation.navigate('videoscreen',{episode: episode})
    }

    return (
        <View style={{margin:10}}>
            <Pressable onPress={navigate_to_videoScreen}>
                <View style={styles.row}>
                    <Image style={styles.image} source={{uri: episode.poster}}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{episode.title}</Text>
                        <Text style={styles.duration}>{episode.duration}</Text>
                    </View>
                    <AntDesign name="download" size={24} color='white'/>
                </View>
            </Pressable>
            <Text style={styles.plot}>{episode.plot}</Text>
        </View>
    )
}

export default EpisodeItem;
