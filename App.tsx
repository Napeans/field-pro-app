import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens();

const App: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F0F4F2"
        translucent={Platform.OS === 'android'}
      />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
