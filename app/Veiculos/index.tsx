import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import {
    Container,
    Header,
    IconButton,
    ProfileButton,
    Title,
    VehicleGrid,
    VehicleCard,
    VehicleImage,
    VehicleLabel,
    VehiclePlate,
    AddCard,
    Footer,
    FooterButton,
    AddButton,
    CenteredView,
} from './styles';
import { api } from '@/src/services';
import { useStorage } from '@/src/hooks';

const MyVehiclesScreen = () => {
    
    // const [vehicles, setVehicles] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // const { getItem } = useStorage();
    //     const getVehicles = async () => {
    //     try {
    //         const userId = getItem('userId');
    //         // Add userId as a query parameter instead of in the request body
    //         const response = await api.get(`/vehicles/listall-vehicle?page=0&size=10&userId=${userId}`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             withCredentials: true,
    //             // Remove the data property
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error fetching vehicles:', error);
    //         throw error;
    //     }
    // };
    // useEffect(() => {
    //     getVehicles()
    //         .then(data => {
    //             setVehicles(data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching vehicles:', error);
    //             setError(error);
    //             setLoading(false);
    //             setVehicles([]);
    //         });
    // }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error loading vehicles</div>;
  
    const exampleVehicles = [
        { id: 1, label: 'Carro 1', plate: 'ABC-1234' },
        { id: 2, label: 'Carro 2', plate: 'DEF-5678' },
        { id: 3, label: 'Carro 3', plate: 'GHI-9012' },
        { id: 4, label: 'Carro 4', plate: 'JKL-3456' },
    ];
    return (
        <Container>
            {/* Header */}
            <Header>
                <IconButton onPress={() => console.log('Add')}>
                    <Feather name="plus" size={20} color="#fff" />
                </IconButton>
                <IconButton onPress={() => console.log('Search')}>
                    <Feather name="search" size={20} color="#fff" />
                </IconButton>
                <ProfileButton onPress={() => console.log('Profile')}>
                    <Feather name="user" size={20} color="#000" />
                </ProfileButton>
            </Header>

            {/* Title */}
            <Title>Meus Veículos</Title>

            {/* Vehicles */}
            <VehicleGrid>
                {exampleVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} onPress={() => console.log('Vehicle details', vehicle)}>
                        <VehicleImage source={{ uri: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg' }} />
                        <VehicleLabel>{vehicle.label}</VehicleLabel>
                        <VehiclePlate>Placa: {vehicle.plate}</VehiclePlate>
                    </VehicleCard>
                ))}

                {/* Add New */}
                <AddCard onPress={() => console.log('Add new vehicle')}>
                    <Feather name="plus" size={24} color="#3f442b" />
                </AddCard>
            </VehicleGrid>

            {/* Footer */}
            <Footer>
                <FooterButton onPress={() => console.log('Custos')}>
                    <MaterialIcons name="attach-money" size={24} color="#fff" />
                </FooterButton>
                <FooterButton onPress={() => console.log('Postos')}>
                    <MaterialIcons name="local-gas-station" size={24} color="#fff" />
                </FooterButton>

                <AddButton onPress={() => console.log('Add')}>
                    <Feather name="plus" size={24} color="#3f442b" />
                </AddButton>

                <FooterButton onPress={() => console.log('Revisões')}>
                    <Feather name="check-circle" size={24} color="#fff" />
                </FooterButton>
                <FooterButton onPress={() => console.log('Conta')}>
                    <Feather name="user" size={24} color="#fff" />
                </FooterButton>
            </Footer>
        </Container>
    );
};

export default MyVehiclesScreen;
