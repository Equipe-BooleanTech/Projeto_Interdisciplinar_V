import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import {
  AddCard,
  Card,
  Container,
  IconButton,
  PlateText,
  Title,
  VehicleImage,
  VehicleName,
} from './styles';
import { router } from 'expo-router';
import { useRedirect, useStorage } from '@/src/hooks';
import { listVehicles } from '@/src/services';
import { Toast } from 'toastify-react-native';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { Header } from '@/src/components';
import { EmptyState } from '@/app/Maintainances/Management/MaintainanceManagement.style';
import { theme } from '@/theme';

const VehicleScreen = () => {
  const [vehicles, setVehicles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { checkAuthentication, redirect } = useRedirect();
  const { getItem, setItem } = useStorage();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkAuthentication();

      if (!isAuth) {
        redirect();
      }
      return;
    };
    checkAuth();
  }, [checkAuthentication, redirect]);

  const getUserId = useCallback(async () => {
    try {
      const userId = await getItem('userId');
      return userId;
    } catch (error) {
      console.error('Error fetching user ID:', error);
      return null;
    }
  }, []);

  // ------------------------------------------------------
  // Fetch user vehicles from the API
  // ------------------------------------------------------
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const userId = await getUserId();
        const response = await listVehicles(userId as string);
        console.log('Fetched vehicles:', response);
        setVehicles(response.content);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        Toast.error('Erro ao buscar veículos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [getUserId]);

  const handleVehiclePress = useCallback((vehiclePlate, vehicleId) => {
    setItem('vehiclePlate', vehiclePlate);
    setItem('vehicleId', vehicleId);
    router.push('/Vehicles/Management/VehicleManagement');
  }
, []);

  return (
    <ProtectedRoute>
      <Header
        title="Veículos"
        notificationCount={0}
        onBackPress={() => router.back()}
        onNotificationPress={() => router.push('/notifications')}
      />
      <Container>
        <Title>Meus Veículos</Title>

        {loading ? (
          <Container style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </Container>
        ) : vehicles.length === 0 ? (
          <EmptyState
            icon="car"
            title="Nenhum veículo encontrado"
            message="Adicione seu primeiro veículo para começar a monitorar seu consumo"
            buttonText="Adicionar veículo"
            onPress={() => router.push('/Vehicles/Register')}
          />
        ) : (
          <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
            {vehicles.map((vehicle) => (
              <Card key={vehicle.plate} onPress={() => handleVehiclePress(vehicle.plate, vehicle.id)}>
                <VehicleImage
                  source={{
                    uri: "https://as2.ftcdn.net/jpg/05/63/90/79/1000_F_563907946_qngWK4eZMqYUEd8g5MGiw1R5Ch1k0h5P.jpg",
                  }}
                />
                <VehicleName>{vehicle.model}</VehicleName>
                <PlateText>{vehicle.plate}</PlateText>
              </Card>
            ))}
            <AddCard>
              <TouchableOpacity>
                <IconButton onPress={() => router.push('/Vehicles/Register')}>
                  <Feather name="plus" size={22} color="#fff" />
                </IconButton>
              </TouchableOpacity>
            </AddCard>
          </ScrollView>
        )}
      </Container>
    </ProtectedRoute>
  );
}

export default VehicleScreen;
