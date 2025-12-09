import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import TrackDetailsScreen from './src/screens/TrackDetailsScreen';
import { enableScreens } from 'react-native-screens'; 

// 👈 ADD THIS LINE TO INITIALIZE NATIVE MODULES 
enableScreens(); 

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Jack Johnson Tracks' }} 
        />
        <Stack.Screen 
          name="Details" 
          component={TrackDetailsScreen} 
          options={{ title: 'Track Details' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;