import React from 'react';
import {Text, useColorScheme} from 'react-native'
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native'
import { Provider as PaperProvider , DarkTheme as PaperDarktheme} from 'react-native-paper'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeStack from './HomeStack';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'rgb(255,255,255)',
    },
};

const Tab = createBottomTabNavigator();



const BottomTab = () =>{
    const scheme = useColorScheme();
    return(
        
                <Tab.Navigator>
                    <Tab.Screen 
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarIcon:({color}) => <AntDesign name='home' size={24} color={color}/>
                        }}
                    />
                    <Tab.Screen 
                        name="Coming_Soon"
                        component={()=> <Text>ComingSoon</Text>}
                        options={{
                            tabBarIcon:({color}) => <MaterialIcons name='video-library' size={24} color={color}/>
                        }}
                    /><Tab.Screen 
                        name="Search"
                        component={()=> <Text>Search</Text>}
                        options={{
                            tabBarIcon:({color}) => <Ionicons name='search' size={24} color={color}/>
                        }}
                    />
                    <Tab.Screen 
                        name="Download"
                        component={()=> <Text>Download</Text>}
                        options={{
                            tabBarIcon:({color}) => <AntDesign name='download' size={24} color={color}/>
                        }}
                    />
                </Tab.Navigator>
    )
}

export default BottomTab;