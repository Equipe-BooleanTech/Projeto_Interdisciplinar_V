import { useCallback, useEffect, useState } from 'react';
import { useDevice } from '.';
import { getToken } from '../services';
import { useRouter } from 'expo-router';

const useRedirect = () => {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const { isFirstLaunchWeb, isFirstLaunchMobile } = useDevice();
  const isFirstLaunch = isFirstLaunchWeb || isFirstLaunchMobile;
  const { deviceType } = useDevice();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = useCallback(async () => {
    const token = await getToken();
    setIsAuthenticated(!!token);
    return !!token;
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const backToLogin = useCallback(() => {
    router.replace('/Auth/Login');
  }, [router]);

  const goToHome = useCallback(async () => {
    const isAuth = await checkAuthentication();
    if (isAuth) {
      router.replace('/dashboard');
    }
  }, [checkAuthentication, router]);

  const redirect = useCallback(async () => {
    if (redirecting) return; // Prevent recursive redirects

    setRedirecting(true);
    const isAuth = await checkAuthentication();
    if (isAuth) {
      router.replace('/dashboard');
    } else {
      router.replace('/Auth/Login');
    }
    setRedirecting(false);
  }, [checkAuthentication, router, redirecting]);

  return {
    backToLogin,
    goToHome,
    redirect,
    checkAuthentication,
    isAuthenticated,
  };
};

export default useRedirect;
