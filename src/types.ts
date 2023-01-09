import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type StackParamList = {
  Cities: undefined;
  City: {city: string};
};

export type StackScreenProps<T extends keyof StackParamList> =
  NativeStackScreenProps<StackParamList, T>;
