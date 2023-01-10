import React from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Cities from './src/Cities';
import City from './src/City';
import {StackParamList} from './src/types';
import {WeatherContextProvider} from './src/WeatherContext';

const Stack = createNativeStackNavigator<StackParamList>();

const cityOptions = ({route}: {route: {params: {name: string}}}) => ({
  title: route.params.name,
});

const App = () => {
  const scheme = useColorScheme();
  return (
    <WeatherContextProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Cities" component={Cities} />
          <Stack.Screen name="City" component={City} options={cityOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherContextProvider>
  );
};

export default App;
