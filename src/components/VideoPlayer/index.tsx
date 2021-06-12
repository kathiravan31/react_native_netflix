import React,{useRef, useState, useEffect} from 'react'
import {View, Text, StatusBar} from 'react-native'
import { Episode } from '../../../types'
import styles from './style'

import Orientation from 'react-native-orientation-locker';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';

import MediaControls, {PLAYER_STATES} from 'react-native-media-controls'
import {Storage} from 'aws-amplify'



interface VideoPlayerProps{
    episode: Episode;
}

function VideoPlayer_(props: VideoPlayerProps) {
    const {episode} = props;


    const video = useRef(null);
    const [status, setStatus] = useState({})
    const [videoUrl, setVideoUrl] = useState('')


    const _back = ()=>{
        const {goBack} = this.props.navigation
        Orientation.lockToPortrait()
        goBack()
    }
    
    useEffect(()=>{
        if(episode.video.startsWith('http')){
            setVideoUrl(episode.video)
            return; 
        }
        Storage.get(episode.video).then(setVideoUrl)
    },[])

    console.log(videoUrl , 'video uri')

    if(!videoUrl){
        return null;
    }

    return (
        <View style={{width:'100%'}}> 
            <Video 
                ref={video}                                    
                style={styles.video}
                source={{uri: videoUrl}}
                // poster={{uri: 'https://baconmockup.com/300/200/'}}
                posterSource={{uri: episode.poster}}
                posterStyle={{resizeMode: 'cover'}}
                posterResizeMode="cover"
                useNativeControls
                resizeMode="cover"
                repeat
                // controls
                hideShutterView={true}
                onPlaybackStatusUpdate={ status => setStatus(()=> status )}

                />
                
        </View>
    )
}

export default VideoPlayer_
