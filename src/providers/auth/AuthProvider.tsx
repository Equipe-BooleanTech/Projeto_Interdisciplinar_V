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
  failedAuthAttempts: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [failedAuthAttempts, setFailedAuthAttempts] = useState<number>(0);
  const router = useRouter();

  // Function to verify authentication with retry logic
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
        // Reset counter on successful auth
        setFailedAuthAttempts(0);
        setIsAuthenticated(true);
        return true;
      } catch (error: any) {
        // Handle different error status codes
        if (error.response) {
          // If 403 Forbidden, user is authenticated but lacks permissions
          if (error.response.status === 403) {
            setIsAuthenticated(true);
            return true;
          }
          
          // If 401 Unauthorized, track authentication failures
          if (error.response.status === 401) {
            const newAttemptCount = failedAuthAttempts + 1;
            setFailedAuthAttempts(newAttemptCount);
            
            // Only logout after 3 consecutive failures
            if (newAttemptCount >= 3) {
              await removeToken();
              setIsAuthenticated(false);
              setFailedAuthAttempts(0);
              Toast.error('Sessão expirada ou inválida. Por favor, faça login novamente.');
              router.push('/Auth/Login');
              return false;
            }
            
            // Still considered authenticated until we reach the limit
            console.warn(`Authentication failed (${newAttemptCount}/3 attempts)`);
            setIsAuthenticated(true);
            return true;
          }
        }
        
        // For all other errors, assume the user is still authenticated
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
      // Reset failed attempts on login
      setFailedAuthAttempts(0);
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
      setFailedAuthAttempts(0);
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
        checkAuthentication,
        failedAuthAttempts
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