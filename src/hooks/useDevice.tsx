import { useCallback, useEffect, useState } from 'react';
import { Platform, AppState } from 'react-native';
import useStorage from './useStorage';

export const useDevice = () => {
  const deviceType = Platform.OS;
  const { getItem, setItem } = useStorage();
  const [isFirstLaunchState, setIsFirstLaunchState] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        if (deviceType === 'web') {
          const value = localStorage.getItem('isFirstLaunch');
          const isFirst = value === null;
          setIsFirstLaunchState(isFirst);
          if (isFirst) {
            localStorage.setItem('isFirstLaunch', 'false');
          }
        } else {
          const value = await getItem('isFirstLaunch');
          const isFirst = value === null;
          setIsFirstLaunchState(isFirst);
          if (isFirst) {
            await setItem('isFirstLaunch', 'false');
          }
        }
      } catch (error) {
        console.error('Error checking first launch status:', error);
      }
    };

    checkFirstLaunch();
  }, [deviceType, getItem, setItem]);

  const isFirstLaunchMobile = useCallback(async () => {
    if (isFirstLaunchState !== null) {
      return isFirstLaunchState;
    }

    // Fallback if state isn't set yet
    const firstLaunchValue = await getItem('isFirstLaunch');
    return firstLaunchValue === null;
  }, [getItem, isFirstLaunchState]);

  const isFirstLaunchWeb = useCallback(() => {
    if (isFirstLaunchState !== null) {
      return isFirstLaunchState;
    }

    // Fallback if state isn't set yet
    const firstLaunchValue = localStorage.getItem('isFirstLaunch');
    return firstLaunchValue === null;
  }, [isFirstLaunchState]);

  const setNotFirstLaunch = useCallback(async () => {
    setIsFirstLaunchState(false);
    if (deviceType === 'web') {
      localStorage.setItem('isFirstLaunch', 'false');
    } else {
      await setItem('isFirstLaunch', 'false');
    }
  }, [deviceType, setItem]);

  return {
    deviceType,
    isFirstLaunch:
      deviceType === 'web'
        ? () => isFirstLaunchState ?? false
        : async () => isFirstLaunchState ?? false,
    isFirstLaunchMobile,
    isFirstLaunchWeb,
    setNotFirstLaunch,
  };
};

export default useDevice;
