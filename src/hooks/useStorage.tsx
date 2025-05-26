import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const useStorage = () => {
  const deviceType = Platform.OS;

  const setItem = (key: string, value: string) => {
    deviceType === 'web' ? localStorage.setItem(key, value) : SecureStore.setItemAsync(key, value);
  };

  const getItem = (key: string) => {
    return deviceType === 'web' ? localStorage.getItem(key) : SecureStore.getItemAsync(key);
  };

  const removeItem = (key: string) => {
    deviceType === 'web' ? localStorage.removeItem(key) : SecureStore.deleteItemAsync(key);
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
};
export default useStorage;
