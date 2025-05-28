import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './AuthProvider';
import { Alert as CustomAlert } from '../../components';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
}) => {
  const { isAuthenticated, isLoading, checkAuthentication } = useAuth();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuth = await checkAuthentication();
      if (!isAuth && !isLoading) {
        setShowAlert(true);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <CustomAlert
          isVisible={showAlert}
          title="Acesso Negado"
          message="Você precisa estar logado para acessar esta página."
          onConfirm={() => {
            setShowAlert(false);
            router.replace('/Auth/Login');
          }}
          confirmText="OK"
        />
      )}
    </>
  );
};

export default ProtectedRoute;