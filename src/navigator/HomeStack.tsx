import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native'
import BottomTab from './BottomTab';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import VideoScreen from '../screens/VideoScreen';



const Stack = createStackNavigator();
function HomeStack() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator
        initialRouteName='homestack'
        >
            <Stack.Screen 
            name="homestack" 
            component={BottomTab}
            options={{
                title:"NetFlix",
                headerLeft: () => (
                    <View style={{height:'100%',paddingLeft:10,alignItem:'center',justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=> navigation.openDrawer()}>
                            <Foundation name="indent-more" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                ),
                headerRight:()=>(
                    <View style={{height:'100%',paddingRight:10,alignItem:'center',justifyContent:'center'}}>
                        <AntDesign name="search1" size={24} color="white"/>
                    </View>
                )
            }}
            />
            <Stack.Screen name="movie_detail" component={MovieDetailScreen}/>
            <Stack.Screen name="videoscreen" component={VideoScreen} options={{
                headerShown:false
            }}/>
        </Stack.Navigator>
    )
}

export default HomeStack;
