import { MMKV, Mode } from 'react-native-mmkv';
import { Platform } from 'react-native';

const useStorage = () => {
  const deviceType = Platform.OS;

  const storage = new MMKV({
    id: 'storage',
    mode: Mode.MULTI_PROCESS,
  });

  const setItem = (key: string, value: string) => {
    deviceType === 'web' ? localStorage.setItem(key, value) : storage.set(key, value);
  };

  const getItem = (key: string) => {
    return deviceType === 'web' ? localStorage.getItem(key) : storage.getString(key);
  };

  const removeItem = (key: string) => {
    deviceType === 'web' ? localStorage.removeItem(key) : storage.delete(key);
  };

  const clear = () => {
    deviceType === 'web' ? localStorage.clear() : storage.clearAll();
  };

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  };
};
export default useStorage;
