import React from 'react'
import {View} from 'react-native'
import {DrawerContentScrollView, DrawerItem,} from '@react-navigation/drawer'
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Auth} from 'aws-amplify'

function CustomDrawer(props){
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View>
                    <Text style={{color:'white'}}>Main Content</Text>
                </View>
            </DrawerContentScrollView>  
            <Drawer.Section>
                <DrawerItem onPress={()=>{Auth.signOut()}}
                 icon={({color, size})=>(
                     <Icon name="exit-to-app" color={color} size={size}/>
                 )}
                 label="Sign Out"
                />
            </Drawer.Section>
        </View>
    )
}

export default CustomDrawer;