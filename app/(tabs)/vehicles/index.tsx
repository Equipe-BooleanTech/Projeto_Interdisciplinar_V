import React, { use, useCallback, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
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
import { get } from '@/src/services';
import { Toast } from 'toastify-react-native';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { Header } from '@/src/components';

const VehicleScreen = () => {
  const [vehicles, setVehicles] = React.useState([]);

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
      try {
        const userId = await getUserId();
        const response = await get(`/users/find-by-id/${userId}`);
        setVehicles(response.vehicles);
      } catch (error) {
        Toast.error('Erro ao carregar veículos');
      }
    }
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
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
          {vehicles.map((vehicle) => (
            <Card key={vehicle.plate} onPress={() => handleVehiclePress(vehicle.plate, vehicle.uuid)}>
              <VehicleImage
                source={{
                  uri: 'https://www.shutterstock.com/image-vector/car-vectorcar-monochrome-iconcoupe-iconcar-600nw-2318254387.jpg',
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
      </Container>
    </ProtectedRoute>
  );
};

export default VehicleScreen;
