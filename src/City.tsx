import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import Summary from './Summary';
import {StackScreenProps} from './types';
import {useWeatherForCity} from './WeatherContext';

export default function City({route}: StackScreenProps<'City'>) {
  const {colors} = useTheme();
  const [error, weather] = useWeatherForCity(route.params.id);

  if (error || !weather) {
    return <Text style={{color: colors.text}}>An error occurred</Text>;
  }

  return <Summary item={weather} />;
}
