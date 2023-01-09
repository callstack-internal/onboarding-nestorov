import React, {useCallback, useMemo} from 'react';
import {
  FlatList,
  Text,
  FlatListProps,
  ListRenderItem,
  TouchableOpacity,
  Alert,
  StyleSheet,
  useColorScheme,
} from 'react-native';

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

export default function Cities() {
  const colorScheme = useColorScheme();
  const textStyle = useMemo(
    () =>
      StyleSheet.flatten([
        styles.listItemText,
        {color: colorScheme === 'dark' ? 'white' : 'black'},
      ]),
    [colorScheme],
  );
  const renderItem = useCallback<ListRenderItem<(typeof cities)[number]>>(
    ({item}) => (
      <TouchableOpacity
        onPress={() => {
          Alert.alert(`${item} pressed`);
        }}
        accessibilityRole="button"
        style={styles.listItem}>
        <Text style={textStyle}>{item}</Text>
      </TouchableOpacity>
    ),
    [textStyle],
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
