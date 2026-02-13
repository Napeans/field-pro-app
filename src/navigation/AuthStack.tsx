import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import { navigationProps } from './../types/navigation';
const Stack = createNativeStackNavigator();



const AuthStack: React.FC<navigationProps> = ({ onLogin }) => {
  
  const handleLoginSuccess = () => {
    onLogin?.();
  };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} onLogin={handleLoginSuccess} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
