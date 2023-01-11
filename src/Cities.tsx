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
import Summary from './Summary';
import {StackScreenProps} from './types';
import {useWeatherContext, Weather} from './WeatherContext';

export default function Cities({navigation}: StackScreenProps<'Cities'>) {
  const {colors} = useTheme();
  const {loadWeather, weather, error} = useWeatherContext();
  useEffect(() => {
    loadWeather();
  }, [loadWeather]);
  const listItemStyle = useMemo(
    () => StyleSheet.flatten([styles.listItem, {borderColor: colors.border}]),
    [colors],
  );
  const renderItem = useCallback<ListRenderItem<Weather>>(
    ({item}) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('City', {id: item.id, name: item.name});
        }}
        accessibilityRole="button"
        style={listItemStyle}>
        <Summary item={item} />
      </TouchableOpacity>
    ),
    [navigation, listItemStyle],
  );

  if (error) {
    return <Text style={{color: colors.text}}>An error occurred</Text>;
  }

  if (!weather) {
    return (
      <Text testID="loading" style={{color: colors.text}}>
        Loading...
      </Text>
    );
  }

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
    borderBottomWidth: 1,
  },
});
