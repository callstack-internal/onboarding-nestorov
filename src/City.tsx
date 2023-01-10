import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import {StackScreenProps} from './types';

export default function City({route}: StackScreenProps<'City'>) {
  const {colors} = useTheme();
  return (
    <Text style={{color: colors.text}}>Selected city: {route.params.city}</Text>
  );
}
