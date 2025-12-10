// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import TrackDetailsScreen from './src/screens/TrackDetailsScreen'; // New Screen

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Tracks' }} 
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