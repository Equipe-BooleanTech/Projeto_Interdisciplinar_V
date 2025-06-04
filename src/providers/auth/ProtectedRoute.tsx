import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './AuthProvider';
import { Alert } from 'react-native';
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuthentication, failedAuthAttempts } = useAuth();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuth = await checkAuthentication();
        
        if (!isAuth) {
          // If not authenticated after retries, show alert
          setShowAlert(true);
        }
      } catch (error) {
        console.error('Authentication verification error:', error);
        setShowAlert(true);
      }
    };

    verifyAuth();
    
    // Set up periodic checks to detect token expiration
    const authCheckInterval = setInterval(verifyAuth, 60000); // Check every minute
    
    return () => clearInterval(authCheckInterval);
  }, [checkAuthentication]);

  // Add effect to handle auth state changes
  useEffect(() => {
    if (!isLoading && !isAuthenticated && failedAuthAttempts >= 3) {
      setShowAlert(true);
    }
  }, [isAuthenticated, isLoading, failedAuthAttempts]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#454F2C" />
      </View>
    );
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;