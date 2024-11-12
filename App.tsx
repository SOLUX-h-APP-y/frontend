import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';

function App(): React.JSX.Element {
  return (
    // <SafeAreaView>
    //   <StatusBar />
    // </SafeAreaView>

    // <OnboardingScreen />
    // <SignUpScreen />
    <HomeScreen />
    // <StackNavigation />
  );
}

export default App;
