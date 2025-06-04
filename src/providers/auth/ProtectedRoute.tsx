import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './AuthProvider';
import { Alert as CustomAlert } from '../../components';
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuthentication } = useAuth();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuth = await checkAuthentication();
        
        if (!isAuth) {
          // If not authenticated, show the alert immediately
          setShowAlert(true);
        }
      } catch (error) {
        console.error('Authentication verification error:', error);
        setShowAlert(true);
      }
    };

    verifyAuth();
  }, [checkAuthentication]); // Add checkAuthentication to dependencies

  // Add another effect to handle auth state changes
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowAlert(true);
    }
  }, [isAuthenticated, isLoading]);

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