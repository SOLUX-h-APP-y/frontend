import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';

function App(): React.JSX.Element {
  return (
    // <SafeAreaView>
    //   <StatusBar />
    // </SafeAreaView>
    <OnboardingScreen />
    // <StackNavigation />
  );
}

export default App;
