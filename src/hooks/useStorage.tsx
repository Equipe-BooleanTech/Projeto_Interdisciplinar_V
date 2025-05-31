import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const useStorage = () => {
  const deviceType = Platform.OS;

  const setItem = async (key: string, value: string): Promise<void> => {
    console.log(`Setting item in storage: ${key} = ${value}`);
    if (deviceType === 'web') {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  };

  const getItem = async (key: string): Promise<string | null> => {
    console.log(`Getting item from storage: ${key}`);
    let value: string | null;
    if (deviceType === 'web') {
      value = localStorage.getItem(key);
    } else {
      value = await AsyncStorage.getItem(key);
    }
    console.log('Retrieved value:', value);
    return value;
  };


  const removeItem = async (key: string): Promise<void> => {
    return deviceType === 'web'
      ? Promise.resolve(localStorage.removeItem(key))
      : await AsyncStorage.removeItem(key);
  };

  const clear = async (): Promise<void> => {
    return deviceType === 'web'
      ? Promise.resolve(localStorage.clear())
      : await AsyncStorage.clear();
  };

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  };
};

export default useStorage;