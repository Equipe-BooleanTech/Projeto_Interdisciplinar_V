import { Alert, Header } from '@/src/components';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { getCurrentPositionAsync, LocationAccuracy, LocationObject, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import { Platform, SafeAreaView, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
const GasStationMap = () => {
    const [modal, setModal] = useState<{
        visible: boolean;
        message: string;
        title: string;
    }>({
        visible: false,
        message: '',
        title: '',
    });
    const [location, setLocation] = useState<LocationObject | null>(null);

    const mapRef = useRef<MapView | null>(null);

    const requestLocationPermission = async () => {
        const { granted } = await requestForegroundPermissionsAsync()

        if (!granted) {
            setModal({
                visible: true,
                message: 'Sua permissão para acessar a localização é necessária para encontrar os postos de gasolina mais próximos.',
                title: 'Permissão de Localização Necessária',
            });
            return;
        }
        const currentPosition = await getCurrentPositionAsync()
        setLocation(currentPosition);
    }

    useEffect(() => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
        }, (newLocation) => {
            setLocation(newLocation);
        })
    }, []);

    if (Platform.OS === 'web') {
        return <Text>Este recurso não está disponível na web.</Text>;
      }
    return (
        <ProtectedRoute>
            <Header
                title="Postos de Gasolina"
                onBackPress={() => router.back()}
            />
            <SafeAreaView style={{ flex: 1 }}>
                {location && (
                    <MapView
                        ref={mapRef}
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: location?.coords.latitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                            longitude: location?.coords.longitude,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location?.coords.latitude,
                                longitude: location?.coords.longitude,
                            }}
                            title="Você está aqui"
                            description="Sua localização atual"
                        />
                    </MapView>
                )}
                {modal.visible && (
                    <Alert
                        title={modal.title}
                        message={modal.message}
                        onConfirm={() => setModal({ ...modal, visible: false })}
                        isVisible={modal.visible}
                    />
                )}
            </SafeAreaView>
        </ProtectedRoute>
    )
}

export default GasStationMap;