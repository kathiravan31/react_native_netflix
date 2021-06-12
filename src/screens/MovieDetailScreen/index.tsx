import React,{useState,useEffect} from 'react'
import {View, Text, Image, Pressable, FlatList, StatusBar, ActivityIndicator} from 'react-native'
import movie from '../../data/movie'
import styles from './style'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EpisodeItem from '../../components/EpisodeItem'
// import Orientation from 'react-native-orientation-locker';
// import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import {useNavigation, useRoute} from '@react-navigation/native'
import {DataStore} from 'aws-amplify'
import {Episode, Movie, Season} from '../../models'



import {Picker} from '@react-native-picker/picker';
import VideoPlayer from '../../components/VideoPlayer'



const firstSeason = movie.seasons.items[0]
const firstEpisode = firstSeason.episodes.items[0]


function MovieDetailScreen() {
    const [movie,setMovie] = useState<Movie|undefined>(undefined);
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [episodes, setEpisodes] = useState<Episode[]>([]);


    const [currentSeason, setCurrentSeason] = useState<Season|undefined>(undefined);
    const [currentEpisode, setCurrentEpisode] = useState<Episode|undefined>(undefined);
    const seasonNames = seasons? seasons.map(season=> season.name) : [];


    const navigation = useNavigation();
    const route = useRoute();

    useEffect(()=>{
        const fetchMovie = async () =>{
            console.log(route.params.id, 'movie id')
            setMovie(await DataStore.query(Movie, route?.params?.id))
            
        }

        fetchMovie();
    },[])

    useEffect(()=>{
        if(!movie){
            return
        }
        const fetchSeasons = async () =>{
            console.log(movie, 'movie')
            const movieSeasons = (await DataStore.query(Season)).filter(s => s.movie?.id === movie.id)
            setSeasons(movieSeasons);
            setCurrentSeason(movieSeasons[0]);
            
        }
        fetchSeasons();
    },[movie])

    // useEffect(()=>{
    //     if(!currentSeason){
    //         return
    //     }

    //     const fetchEpisodes = async () =>{
    //         console.log(currentSeason, "current season")
    //         console.log(seasons, "setSeason")
    //         const seasonEpisode = (await DataStore.query(Episode))
    //                             .filter(e => e?.season?.id === currentSeason?.id);
    //         console.log(await DataStore.query(Episode)).filter(e => e?.season?.id === currentSeason?.id)
    //         setEpisodes(seasonEpisode);
    //         console.log(seasonEpisode, "season episode")
    //         setCurrentEpisode(seasonEpisode[0])
    //     }

    //     fetchEpisodes();
    // },[currentSeason])

    useEffect(() => {
        if(!currentSeason) {
            return;
        }
        const fetchEpisodes = async () => {
            console.log(seasons, 'season')
            console.log(currentSeason, 'current season')
            console.log(currentSeason.id, 'current season id')
            // await (DataStore.query(Episode)).filter(e => e?.season?.id === currentSeason.id)
            const seasonEpisored = (
                await DataStore.query(Episode)
            ).filter(e => e?.season?.id === currentSeason?.id)


            await console.log(seasonEpisored, 'season episored')
            
            setEpisodes(seasonEpisored);
            setCurrentEpisode(seasonEpisored[0])
            
            console.log(seasonEpisored)
            console.log(episodes)
            console.log(currentEpisode)
        }

        fetchEpisodes();
    }, [currentSeason])

    useEffect(()=>{
        console.log(episodes, 'episodes')
    },[episodes])


    if(!movie){
        return <ActivityIndicator/>
    }


    return (    
        <View>
            {currentEpisode && <VideoPlayer episode={currentEpisode}/>}
            
            <FlatList
                data={episodes}
                style={{marginBottom:200}}
                renderItem={({item})=>(
                    <EpisodeItem episode={item}/>
                )}
                ListHeaderComponent={(
                    <View style={{padding:5}}>
                        <Text style={styles.title}>{movie.title}</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={styles.match}>98% match</Text>
                            <Text style={styles.year}>{movie.year}</Text>
                            <View style={styles.ageContainer}>
                                <Text style={styles.age}>12+</Text>
                            </View>
                            <Text style={styles.year}>{movie.numberOfSeasons} Seasons</Text>
                            <MaterialIcons name="hd" size={24} color="white"/>
                        </View>

                        {/*  Play Button */}
                        <Pressable onPress={()=>{navigation.navigate('videoscreen',{episode:currentEpisode})}} style={styles.playButton}>
                            <Text style={styles.playButtonText}>
                                <Entypo name="controller-play" size={16} color="black"/>
                                Play
                            </Text>
                        </Pressable>

                        {/*  Download Button */}
                        <Pressable onPress={()=>{console.warn('Download')}} style={styles.downloadButton}>
                            <Text style={styles.downloadButtonText}>
                                <AntDesign name="download" size={16} color="white" style={{marginRight:10}}/>
                                {' '}Download
                            </Text>
                        </Pressable>
                        <Text style={{marginVertical:10, color:'white'}}>{movie.plot}</Text>
                        <Text style={styles.year}>Cast: {movie.cast}</Text>
                        <Text style={styles.year}>Creator: {movie.creator}</Text>

                        <View style={{flexDirection:'row'}}>
                            <View style={{alignItems:'center', justifyContent:'center', marginHorizontal:20}}>
                                <AntDesign name="plus" color="white" size={30}/>
                                <Text style={{color:'darkgrey'}}>My List</Text>
                            </View>
                            <View style={{alignItems:'center', justifyContent:'center', marginHorizontal:20}}>
                                <Feather name="thumbs-up" color="white" size={30}/>
                                <Text style={{color:'darkgrey'}}>Rate</Text>
                            </View>
                            <View style={{alignItems:'center', justifyContent:'center', marginHorizontal:20}}>
                                <FontAwesome name="send-o" color="white" size={30}/>
                                <Text style={{color:'darkgrey'}}>Share</Text>
                            </View>
                        </View>
                        {currentSeason && (
                            <Picker style={{color:'white',width:150}} itemStyle={{backgroundColor:'white'}} dropdownIconColor={'white'}
                                selectedValue={currentSeason.name}
                                onValueChange={(itemValue, itemIndex)=>{
                                    setCurrentSeason(seasons[itemIndex])
                                }}>
                                {seasonNames.map(seasonName=>(
                                    <Picker.Item key={seasonName} label={seasonName} value={seasonName}/>
                                ))}
                                
                            </Picker>
                        )}
                        
                    </View>
                )}
            />
        </View>
    )
}

export default MovieDetailScreen
