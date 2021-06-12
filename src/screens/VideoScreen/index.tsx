import React, {useRef, useState, useEffect} from 'react'
import {View, StatusBar, Pressable, Text, BackHandler} from 'react-native'
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';

import styles from './style'
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign'

import {Storage} from 'aws-amplify'

import {useNavigation, useRoute, useFocusEffect} from '@react-navigation/native'


function VideoScreen(props) {

    const video = useRef(null);
    const [status, setStatus] = useState({})
    const [statusbar, setStatusbar] = useState(true)
    const [videoUrl, setVideoUrl] = useState('')

    const route = useRoute();
    const navigation = useNavigation();

    const episode = route.params.episode

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            // navigation.navigate('ThirdPage');
            Orientation.lockToPortrait()
            // Return true to stop default back navigaton
            // Return false to keep default back navigaton
            return false;
          };
    
          // Add Event Listener for hardwareBackPress
          BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
          );
    
          return () => {
            // Once the Screen gets blur Remove Event Listener
            BackHandler.removeEventListener(
              'hardwareBackPress',
              onBackPress
            );
          };
        }, []),
      );
    

    const hide = () => {
        hideNavigationBar();
    };

    useEffect(()=>{
        Orientation.lockToLandscape()
        hide();
    },[])

    useEffect(()=>{
        if(episode.video.startsWith('http')){
            setVideoUrl(episode.video)
            return; 
        }
        Storage.get(episode.video).then(setVideoUrl)
    },[])

    console.log(videoUrl , 'video uri')


    const show = () => {
        showNavigationBar();
    };

    const GoBack = () =>{
        show()
        setStatusbar(false)
        Orientation.lockToPortrait()
        navigation.goBack();
    }

    if(videoUrl === ''){
        return null;
    }

    return (
        <View style={{flex:1}}>
            <StatusBar hidden={statusbar}/>
            <Video 
                ref={video}                                    
                style={styles.video}
                source={{uri: videoUrl}}
                // poster={{uri: episode.poster}}
                useNativeControls
                resizeMode="cover"
                repeat
                controls
                hideShutterView={true}
                fullscreen={true}
                fullscreenAutorotate
                fullscreenOrientation='all'
                onPlaybackStatusUpdate={ status => setStatus(()=> status )}

                />

                <View style={styles.headerContainer}>
                    <Pressable style={{padding:5}} onPress={GoBack}>
                        <AntDesign name="arrowleft" size={20} color='white'/>
                    </Pressable>
                </View>
        </View>
    )
}

export default VideoScreen
