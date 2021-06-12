import React from 'react'
import {View, Text} from 'react-native'
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native'
import { Provider as PaperProvider , DarkTheme as PaperDarktheme} from 'react-native-paper'

import {createDrawerNavigator} from '@react-navigation/drawer'
import BottomTab from './BottomTab'
import CustomDrawer from './CustomDrawer'
import HomeStack from './HomeStack'

const Drawer = createDrawerNavigator();

const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'rgb(255,255,255)',
    },
};

const MainStack = () => {
    return(
        <PaperProvider theme={PaperDarktheme}>
            <NavigationContainer theme={ MyTheme}>
                <Drawer.Navigator
                    drawerContent={props => <CustomDrawer {...props}/>}
                >
                    <Drawer.Screen component={HomeStack} name="bottom"/>
                </Drawer.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default MainStack;