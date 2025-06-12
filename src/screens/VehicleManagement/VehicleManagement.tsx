import React from 'react';
import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import { VehicleFuelingProps, FuelRefillDTO } from './VehicleManagement.interface';
import {
    Content,
    FuelingCard,
    CardHeader,
    CardTitle,
    CardSubtitle,
    CardDetailRow,
    CardDetail,
    DetailLabel,
    DetailValue,
    SummaryContainer,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
    LoadingContainer,
} from './VehicleManagement.style';
import { Ionicons } from '@expo/vector-icons';
import { EmptyState } from '../Notification/Notification.styles';
import { Button } from '@/src/components';
import { router } from 'expo-router';

const VehicleFueling: React.FC<VehicleFuelingProps> = ({
    fuelingRecords,
    isLoading = false,
    stationNames,
}) => {

    const translateFuelType = (fuelType: string): string => {
        switch (fuelType) {
            case 'GASOLINE':
            case 'gasoline':
                return 'Gasolina';
            case 'DIESEL':
            case 'diesel':
                return 'Diesel';
            case 'ETHANOL':
            case 'ethanol':
                return 'Etanol';
            case 'FLEX':
            case 'flex':
                return 'Flex';
            default:
                return fuelType;
        }
    };

    const translateDateArray = (dateArray: number[]): string => {
        try {
            // Destructure the array (months are 0-11 in JavaScript, so no need to subtract 1)
            const [year, month, day, hours, minutes, seconds, nanoseconds] = dateArray;

            // Convert nanoseconds to milliseconds (1ms = 1,000,000ns)
            const milliseconds = nanoseconds / 1000000;

            // Create Date object
            const dateObj = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);

            // Validate the date
            if (isNaN(dateObj.getTime())) {
                console.warn('Invalid date array:', dateArray);
                return 'Data inválida';
            }

            // Format for Brazilian Portuguese
            return dateObj.toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        } catch (error) {
            console.error('Error translating date array:', error);
            return 'Erro ao formatar data';
        }
      };   

    const renderFuelingItem = ({ item }: { item: FuelRefillDTO }) => (
        <FuelingCard fuelType={item.fuelType}>
            <CardHeader>
                <View>
                    <CardTitle>{item.liters.toFixed(1)}L de {translateFuelType(item.fuelType.toLowerCase())}</CardTitle>
                    <CardSubtitle>{translateDateArray(item.refillDate)}</CardSubtitle>
                </View>
                <DetailValue>R$ {item.totalCost.toFixed(2)}</DetailValue>
            </CardHeader>

            <CardDetailRow>
                <CardDetail>
                    <DetailLabel>Preço por Litro</DetailLabel>
                    <DetailValue>R$ {item.pricePerLiter.toFixed(2)}</DetailValue>
                </CardDetail>
                <CardDetail>
                    <DetailLabel>Quilometragem</DetailLabel>
                    <DetailValue>{(item.kmAtRefill * 1000).toLocaleString()} km</DetailValue>
                </CardDetail>
            </CardDetailRow>

            {stationNames[item.stationId] && (
                <CardDetailRow>
                    <CardDetail>
                        <DetailLabel>Posto abastecido</DetailLabel>
                        <DetailValue>{stationNames[item.stationId]}</DetailValue>
                    </CardDetail>
                </CardDetailRow>
            )}
        </FuelingCard>
    );

    return (
        <Content>
            {isLoading ? (
                <LoadingContainer>
                    <ActivityIndicator size="large" color="#454F2C" />
                </LoadingContainer>
            ) : fuelingRecords.refills.length === 0 ?
                    (
                         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <CardTitle>Nenhum dado registrado</CardTitle>
                                                <CardSubtitle>Você ainda não possui manutenções, lembretes ou abastecimentos registrados.</CardSubtitle>
                                                <Button
                                                    onPress={() => router.push('/Fuelings/Register')}
                                                    style={{ marginTop: 20 }}
                                                >
                                                    Adicionar Abastecimento
                                                </Button>
                                            </View>
                    ) : (
                <>
                    <SummaryContainer>
                        <SummaryItem>
                            <SummaryLabel>Custos Totais</SummaryLabel>
                            <SummaryValue>R$ {fuelingRecords.totalCost.toFixed(2)}</SummaryValue>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryLabel>Preço Médio / L</SummaryLabel>
                            <SummaryValue>
                                R$ {(fuelingRecords.totalCost / fuelingRecords.totalLiters).toFixed(2)}
                            </SummaryValue>
                        </SummaryItem>
                    </SummaryContainer>
                    <FlatList
                        data={fuelingRecords.refills}
                        renderItem={renderFuelingItem}
                        keyExtractor={item => item.id}
                    />
                </>
            )}
        </Content>
    );
};

export default VehicleFueling;