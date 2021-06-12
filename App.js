import React from 'react';
import {View, Text, StatusBar, SafeAreaView } from 'react-native';

import MainStack from './src/navigator/MainStack';
import { withAuthenticator } from 'aws-amplify-react-native'


const App = () =>{
  return(
    <>
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <MainStack/>
    </SafeAreaView >
    </>
  )
};

export default withAuthenticator(App);