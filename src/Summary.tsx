import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, ICON_CDN_BASE_URL} from './constants';
import {Weather} from './WeatherContext';

export default function Summary({item}: {item: Weather}) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Image
        source={{uri: `${ICON_CDN_BASE_URL}${item.icon}@2x.png`}}
        style={styles.image}
        accessibilityIgnoresInvertColors
      />
      <View style={styles.grow}>
        <Text style={[styles.city, {color: theme.colors.text}]}>
          {item.name}
        </Text>
        <Text style={[styles.condition, {color: theme.colors.text}]}>
          {item.condition}
        </Text>
      </View>
      <View style={styles.temperature}>
        <Text style={styles.temeperatureText}>{item.temperature} °C</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 8,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  city: {
    fontSize: 22,
    marginBottom: 2,
  },
  condition: {
    fontSize: 16,
    opacity: 0.5,
  },
  grow: {
    flexGrow: 1,
  },
  temperature: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.blue,
    borderRadius: 18,
  },
  temeperatureText: {
    color: colors.white,
    fontSize: 15,
  },
});
