import { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import useStorage from './useStorage';

const useDevice = () => {
  const deviceType = Platform.OS;
  const { getItem, setItem } = useStorage();

  const isFirstLaunchMobile = useCallback(async () => {
    const firstLaunchValue = await getItem('isFirstLaunch');
    if (firstLaunchValue === null) {
      await setItem('isFirstLaunch', 'false');
      return true;
    }
    return false;
  }, [getItem, setItem]);

  const isFirstLaunchWeb = useCallback(async () => {
    const firstLaunchValue = localStorage.getItem('isFirstLaunch');
    if (firstLaunchValue === null) {
      localStorage.setItem('isFirstLaunch', 'false');
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    if (deviceType === 'web') {
      const handleBeforeUnload = () => {
        localStorage.setItem('isFirstLaunch', 'false');
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }

    const handleAppStateChange = async () => {
      await setItem('isFirstLaunch', 'false');
    };
  }, [deviceType, setItem]);

  // Add a method to explicitly mark as not first launch
  const setNotFirstLaunch = useCallback(async () => {
    if (deviceType === 'web') {
      localStorage.setItem('isFirstLaunch', 'false');
    } else {
      await setItem('isFirstLaunch', 'false');
    }
  }, [deviceType, setItem]);

  return {
    deviceType,
    isFirstLaunchMobile,
    isFirstLaunchWeb,
    setNotFirstLaunch,
  };
};

export default useDevice;
