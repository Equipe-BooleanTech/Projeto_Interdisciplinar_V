import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
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

const VehicleFueling: React.FC<VehicleFuelingProps> = ({
    fuelingRecords,
    isLoading = false,
    stationNames,
}) => {
    const renderFuelingItem = ({ item }: { item: FuelRefillDTO }) => (
        <FuelingCard fuelType={item.fuelType}>
            <CardHeader>
                <View>
                    <CardTitle>{item.liters.toFixed(1)}L {item.fuelType.toLowerCase()}</CardTitle>
                    <CardSubtitle>{item.refillDate}</CardSubtitle>
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
                    <DetailValue>{item.kmAtRefill.toLocaleString()} km</DetailValue>
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
            ) : (
                <>
                    <SummaryContainer>
                        <SummaryItem>
                            <SummaryLabel>Capacidade em L</SummaryLabel>
                            <SummaryValue>{fuelingRecords.totalLiters.toFixed(1)}</SummaryValue>
                        </SummaryItem>
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