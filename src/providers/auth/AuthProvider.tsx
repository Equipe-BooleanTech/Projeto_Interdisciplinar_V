import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { api, getToken, remove, removeToken, setToken } from '../../services';
import { useNavigation, usePathname, useRouter } from 'expo-router';
import { useStorage } from '@/src/hooks';
import { Alert } from 'react-native';
import { Toast } from 'toastify-react-native';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthentication: () => Promise<boolean>;
  failedAuthAttempts: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [failedAuthAttempts, setFailedAuthAttempts] = useState<number>(0);
  const router = useRouter();
  const { getItem } = useStorage();

  const pathname = usePathname();
  console.log('Current pathname:', pathname);
  const authCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const excludedRoutes = [
    '/Auth/Login',
    '/Auth/Register',
    '/',
  ];

  const checkAuthentication = async (): Promise<boolean> => {
    if (excludedRoutes.includes(pathname)) return false;
    try {
      const token = await getToken();
      const userId = await getItem('userId');

      if (!token || !userId) {
        console.log('No token or userId found');
        setIsAuthenticated(false);
        return false;
      }

      try {
        const response = await api.get('/users/validate-token', {
          params: { token },
        });

        if (response.data) {
          console.log('Authentication successful');
          setFailedAuthAttempts(0);
          setIsAuthenticated(true);
          return true;
        } else {
          throw new Error('Invalid token response');
        }
      } catch (error: any) {
        console.log('Auth error:', error?.response?.status);

        if (error.response) {
          if (error.response.status === 403) {
            setIsAuthenticated(true);
            return true;
          }

          if (error.response.status === 401) {
            const newAttemptCount = failedAuthAttempts + 1;
            setFailedAuthAttempts(newAttemptCount);

            if (newAttemptCount >= 3) {
              await removeToken();
              await remove('userId');
              setIsAuthenticated(false);
              setFailedAuthAttempts(0);
              Alert.alert('Sua sessão expirou', 'Por favor, faça login novamente.');
              router.replace('/Auth/Login');
              return false;
            }

            console.warn(`Authentication failed (${newAttemptCount}/3 attempts)`);
            setIsAuthenticated(true);
            return true;
          }
        }

        console.error('Authentication error:', error);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Fatal authentication error:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const login = async (token: string): Promise<void> => {
    try {
      await setToken(token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setFailedAuthAttempts(0);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const isAuth = await checkAuthentication();

      if (!isAuth) {
        Toast.error('Token de autenticação inválido.');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Erro', 'Credenciais inválidas ou inexistentes. Tente novamente.');
      setIsAuthenticated(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await removeToken();
      await remove('userId');

      delete api.defaults.headers.common['Authorization'];

      setIsAuthenticated(false);
      setFailedAuthAttempts(0);
      Alert.alert('Logout', 'Você foi desconectado com sucesso.', [
        {
          text: 'OK',
          onPress: () => router.replace('/Auth/Login'),
        },
      ]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await checkAuthentication();
      setIsLoading(false);
    };

    initAuth();

    authCheckIntervalRef.current = setInterval(async () => {
      console.log('Running scheduled authentication check...');
      await checkAuthentication();
    }, 60000);

    return () => {
      if (authCheckIntervalRef.current) {
        clearInterval(authCheckIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !excludedRoutes.includes(pathname)) {
      Alert.alert('Atenção', 'Você não está autenticado. Por favor, faça login.', [
        {
          text: 'OK',
          onPress: () => router.replace('/Auth/Login'),
        },
      ]);
    }
  }, [isLoading, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuthentication,
        failedAuthAttempts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
