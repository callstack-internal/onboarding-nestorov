import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {
  FlatList,
  Text,
  FlatListProps,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {StackScreenProps} from './types';
import {useWeatherContext, Weather} from './WeatherContext';

export default function Cities({navigation}: StackScreenProps<'Cities'>) {
  const {colors} = useTheme();
  const {loadWeather, weather, error} = useWeatherContext();
  useEffect(() => {
    loadWeather();
  }, [loadWeather]);
  const textStyle = useMemo(
    () => StyleSheet.flatten([styles.listItemText, {color: colors.text}]),
    [colors],
  );
  const renderItem = useCallback<ListRenderItem<Weather>>(
    ({item}) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('City', {city: item.id, name: item.name});
        }}
        accessibilityRole="button"
        style={styles.listItem}>
        <Text style={textStyle}>{item.name}</Text>
      </TouchableOpacity>
    ),
    [navigation, textStyle],
  );

  if (error) return <Text style={textStyle}>An error occurred</Text>;

  if (!weather) return <Text style={textStyle}>Loading...</Text>;

  return (
    <FlatList
      data={weather}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}
type KeyExtractor = Exclude<FlatListProps<Weather>['keyExtractor'], undefined>;
const keyExtractor: KeyExtractor = item => item.id.toString();

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
  },
  listItemText: {
    fontSize: 18,
  },
});
