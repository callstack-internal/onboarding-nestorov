import {useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Summary from './Summary';
import {StackScreenProps} from './types';
import {useWeatherForCity} from './WeatherContext';

export default function City({route}: StackScreenProps<'City'>) {
  const {colors} = useTheme();
  const [error, weather] = useWeatherForCity(route.params.id);

  const computedStyles = useMemo(
    () => ({
      summaryContainer: StyleSheet.flatten([
        styles.summaryContainer,
        {borderColor: colors.border},
      ]),
      textContainer: StyleSheet.flatten([
        styles.textContainer,
        {borderColor: colors.border},
      ]),
      text: StyleSheet.flatten([styles.text, {color: colors.text}]),
    }),
    [colors],
  );

  if (error || !weather) {
    return <Text style={{color: colors.text}}>An error occurred</Text>;
  }

  return (
    <View testID="city">
      <Summary item={weather} style={computedStyles.summaryContainer} />
      <View style={computedStyles.textContainer}>
        <Text style={computedStyles.text} testID="humidity">
          Humidity: {weather.humidity}%
        </Text>
      </View>
      <View style={computedStyles.textContainer}>
        <Text style={computedStyles.text}>
          Pressure: {weather.pressure} hPa
        </Text>
      </View>
      <View style={computedStyles.textContainer}>
        <Text style={computedStyles.text}>
          Wind Speed: {weather.windSpeed} m/s
        </Text>
      </View>
      <View style={computedStyles.textContainer}>
        <Text style={computedStyles.text}>Cloud Cover: {weather.clouds}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    borderBottomWidth: 1,
  },
  textContainer: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 20,
  },
});
