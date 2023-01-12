import {requireNativeComponent, ViewProps} from 'react-native';

type Props = Pick<ViewProps, 'style'> & {
  title: string;
  onTouchUpInside?(): void;
};
const NativeButton = requireNativeComponent<Props>('RNTNativeButton');

export default NativeButton;
