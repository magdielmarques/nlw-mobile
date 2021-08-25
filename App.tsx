import React from 'react';
import { StatusBar } from 'react-native';

import AppLoading from 'expo-app-loading';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import {Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'

import Home from './src/pages/Home';

export default function App() {
  const [fonstLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if (!fonstLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Home />
    </>
  );
}

