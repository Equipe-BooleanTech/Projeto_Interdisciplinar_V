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

  const clear = async () => {
    if (deviceType === 'web') {
      localStorage.clear();
    } else {
      // For SecureStore, you need to remove each key individually
      // You'll need to know all keys you want to remove
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('refreshToken');
      await SecureStore.deleteItemAsync('userId');
      // Add any other keys you're storing
    }
  };

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  };
};

export default useStorage;
