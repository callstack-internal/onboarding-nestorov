import {NativeModules} from 'react-native';

const {RNTNativeNotification: module} = NativeModules;

export function showNotification(title: string, body: string) {
  module.showNotification(title, body);
}
