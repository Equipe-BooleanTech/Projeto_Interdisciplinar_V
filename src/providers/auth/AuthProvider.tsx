import React, { createContext, useState, useEffect, useContext } from 'react';
import { api, getToken, remove, removeToken, setToken } from '../../services';
import { useRouter } from 'expo-router';
import { Toast } from 'toastify-react-native';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthentication: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const checkAuthentication = async (): Promise<boolean> => {
    try {
      const token = await getToken();
      
      if (!token) {
        setIsAuthenticated(false);
        return false;
      }
      
      try {
        // Check token validity with a protected endpoint
        await api.get('/users/listall-users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIsAuthenticated(true);
        return true;
      } catch (error: any) {
        if (error.response && (error.response.status >= 400 && error.response.status < 500)) {
          // Token is invalid
          await removeToken();
          setIsAuthenticated(false);
          Toast.error('Sessão expirada ou inválida. Por favor, faça login novamente.');
          router.push('/Auth/Login');
          return false;
        }
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      setIsAuthenticated(false);
      return false;
    }
  };

  const login = async (token: string): Promise<void> => {
    try {
      await setToken(token);
      await checkAuthentication();
    } catch (error) {
      Toast.error('Credenciais inválidas ou inexistentes. Tente novamente.');
      setIsAuthenticated(false);
      console.error('Login error:', error);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await removeToken();
      await remove('userId')
      setIsAuthenticated(false);
      Toast.success('Logout realizado com sucesso.');
      router.replace('/Auth/Login');
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
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuthentication
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