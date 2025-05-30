import { Alert } from '@/src/components';
import { getCurrentPositionAsync, LocationObject, requestForegroundPermissionsAsync } from 'expo-location';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

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
        console.log("localização atual", currentPosition);
    }

    useEffect(() => {
        requestLocationPermission();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {modal.visible && (
                <Alert
                    title={modal.title}
                    message={modal.message}
                    onConfirm={() => setModal({ ...modal, visible: false })}
                    isVisible={modal.visible}
                />
            )}
        </SafeAreaView>
    )
}

export default GasStationMap;