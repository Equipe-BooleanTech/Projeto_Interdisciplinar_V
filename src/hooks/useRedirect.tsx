import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../providers/auth/AuthProvider';

const useRedirect = () => {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  
  const { isAuthenticated, checkAuthentication } = useAuth();

  const backToLogin = useCallback(() => {
    router.replace('/Auth/Login');
  }, [router]);

  const goToHome = useCallback(async () => {
    const isAuth = await checkAuthentication();
    if (isAuth) {
      router.replace('/dashboard');
    } else {
      backToLogin();
    }
  }, [router, checkAuthentication, backToLogin]);

  const redirect = useCallback(async () => {
    if (redirecting) return;

    setRedirecting(true);
    const isAuth = await checkAuthentication();
    if (isAuth) return goToHome();
    // If not authenticated, redirect to login
    router.replace('/Auth/Login');
    setRedirecting(false);
  }, [router, redirecting, checkAuthentication]);

  return {
    backToLogin,
    goToHome,
    redirect,
    checkAuthentication,
    isAuthenticated,
  };
};

export default useRedirect;