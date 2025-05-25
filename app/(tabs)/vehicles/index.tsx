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
import ToastManager from 'toastify-react-native/components/ToastManager';

const VehicleScreen = () => {
  const [vehicles, setVehicles] = React.useState([]);

  const { checkAuthentication, redirect } = useRedirect();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkAuthentication();

      if (!isAuth) {
        redirect();
      }
    };
    checkAuth();
  }, [checkAuthentication, redirect]);

  // ------------------------------------------------------
  // Fetch user vehicles from the API
  // ------------------------------------------------------

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await get(`/vehicle/listall-vehicle/`);
        console.log('Response:', response);
        if (!response.ok) {
          Toast.error(`Ocorreu um erro ao buscar os veículos: ${response.statusText}`);
          return;
        }
        const data = await response.json() || {};
        setVehicles(data.content || []);
        console.log('Fetched vehicles:', data.content);
        Toast.success('Veículos carregados com sucesso!');
      } catch (error) {
        console.error('Failed to fetch vehicles:', error.message);
        Toast.error(`Ocorreu um erro ao buscar os veículos: ${error.message}`);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <Container>
      <Header>
        <IconButton onPress={() => router.push('/Vehicles/Register')}>
          <Feather name="plus" size={18} color="#fff" />
        </IconButton>
        <ProfileButton onPress={() => router.push('/Account')}>
          <Feather name="user" size={20} color="#000" />
        </ProfileButton>
      </Header>

      <Title>Meus Veículos</Title>

      <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <VehicleImage
              source={{
                uri: 'https://www.shutterstock.com/image-vector/car-vectorcar-monochrome-iconcoupe-iconcar-600nw-2318254387.jpg',
              }}
            />
            <VehicleName>{vehicle.name}</VehicleName>
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
      <ToastManager
        position="bottom"
        duration={3000}
        textStyle={{ fontSize: 12 }}
      />
    </Container>
  );
};

export default VehicleScreen;
