import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { AddCard, Card, Container, Header, IconButton, PlateText, ProfileButton, Title, VehicleImage, VehicleName } from './styles';
import { router } from 'expo-router';

const vehicles = [
  { id: '1', name: 'Veículo 01', plate: 'ABC-1234' },
  { id: '2', name: 'Veículo 02', plate: 'ABC-1234' },
  { id: '2', name: 'Veículo 02', plate: 'ABC-1234' },
  { id: '2', name: 'Veículo 02', plate: 'ABC-1234' },
  { id: '2', name: 'Veículo 02', plate: 'ABC-1234' },
  { id: '2', name: 'Veículo 02', plate: 'ABC-1234' },
  { id: '2', name: 'Veículo 02', plate: 'ABC-1234' },
  { id: '2', name: 'Veículo 02', plate: 'ABC-1234' },
  { id: '2', name: 'Veículo 02', plate: 'ABC-1234' },
];

const VehicleScreen = () => {
  return (
    <Container>
      <Header>
        <IconButton>
          <Feather name="plus" size={18} color="#fff" />
        </IconButton>
        <IconButton>
          <Feather name="search" size={18} color="#fff" />
        </IconButton>
        <ProfileButton>
          <Feather name="user" size={20} color="#000" />
        </ProfileButton>
      </Header>

      <Title>Meus Veículos</Title>

      <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {vehicles.map(vehicle => (
          <Card key={vehicle.id}>
            <VehicleImage source={{ uri: 'https://www.shutterstock.com/image-vector/car-vectorcar-monochrome-iconcoupe-iconcar-600nw-2318254387.jpg' }} />
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
    </Container>
  );
};

export default VehicleScreen;
