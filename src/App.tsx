import React from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Cities from './Cities';
import City from './City';
import {StackParamList} from './types';

const Stack = createNativeStackNavigator<StackParamList>();

const cityOptions = ({route}: {route: {params: {city: string}}}) => ({
  title: route.params.city,
});

const App = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Cities" component={Cities} />
        <Stack.Screen name="City" component={City} options={cityOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
