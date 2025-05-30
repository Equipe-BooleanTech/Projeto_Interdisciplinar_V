import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import {
  AddCard,
  Card,
  Container,
  Header,
  IconButton,
  PlateText,
  ProfileButton,
  Title,
  VehicleImage,
  VehicleName,
} from './styles';
import { router } from 'expo-router';
import { useRedirect } from '@/src/hooks';
import { get } from '@/src/services';
import { Toast } from 'toastify-react-native';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';

const VehicleScreen = () => {
  const [vehicles, setVehicles] = React.useState([]);

  const { checkAuthentication, redirect } = useRedirect();

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

  // ------------------------------------------------------
  // Fetch user vehicles from the API
  // ------------------------------------------------------

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await get('/vehicle/listall-vehicle');
        setVehicles(response.content);
      } catch (error) {
        Toast.error('Erro ao carregar veículos');
      }
    }
    fetchVehicles();
  }, []);

  return (
    <ProtectedRoute>
      <Container>
        <Header>
          <IconButton onPress={() => router.push('/Vehicles/Register')}>
            <Feather name="plus" size={18} color="#fff" />
          </IconButton>
          <ProfileButton onPress={() => router.push('/(tabs)/account')}>
            <Feather name="user" size={20} color="#000" />
          </ProfileButton>
        </Header>

        <Title>Meus Veículos</Title>
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
          {vehicles.map((vehicle) => (
            <Card key={vehicle.plate} onPress={() => router.push(`/Vehicles/Management/VehicleManagement`)}>
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
