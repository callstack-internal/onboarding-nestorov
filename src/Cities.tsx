import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {
  FlatList,
  Text,
  FlatListProps,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {StackScreenProps} from './types';

const cities = [
  'London',
  'Berlin',
  'Madrid',
  'Rome',
  'Bucharest',
  'Paris',
  'Vienna',
  'Warsaw',
  'Budapest',
  'Sofia',
  'Tokyo',
  'Delhi',
  'Beijing',
  'Seoul',
  'New York',
  'Sydney',
  'Los Angeles',
  'Istanbul',
  'Houston',
  'Vancouver',
];

export default function Cities({navigation}: StackScreenProps<'Cities'>) {
  const {colors} = useTheme();
  const textStyle = useMemo(
    () => StyleSheet.flatten([styles.listItemText, {color: colors.text}]),
    [colors],
  );
  const renderItem = useCallback<ListRenderItem<(typeof cities)[number]>>(
    ({item}) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('City', {city: item});
        }}
        accessibilityRole="button"
        style={styles.listItem}>
        <Text style={textStyle}>{item}</Text>
      </TouchableOpacity>
    ),
    [navigation, textStyle],
  );

  return (
    <FlatList
      data={cities}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}
type KeyExtractor = Exclude<FlatListProps<string>['keyExtractor'], undefined>;
const keyExtractor: KeyExtractor = item => item;

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
  },
  listItemText: {
    fontSize: 18,
  },
});
