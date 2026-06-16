import { Linking, Platform } from 'react-native';

export const openPhoneDialer = (phoneNumber: string): void => {
  const scheme = Platform.OS === 'ios' ? 'telprompt:' : 'tel:';
  Linking.openURL(`${scheme}${phoneNumber}`).catch(() => {});
};
