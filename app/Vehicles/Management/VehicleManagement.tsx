import { useEffect, useState } from "react";
import { VehicleManagement as VehicleManagementScreen } from "@/src/screens";
import React from "react";
import { FuelRefillDTO, FuelRefillSummaryDTO, FuelType } from "./VehicleManagement.interface";
import { Alert, Button, Header } from "@/src/components";
import { router } from "expo-router";
import { ButtonContainer } from "./VehicleManagement.style";


const VehicleManagement = () => {
    const [modal, setModal] = useState<{
        visible: boolean;
        message: string;
        title: string;
    }>({
        visible: false,
        message: '',
        title: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // Use the correct interface FuelRefillSummaryDTO
    const [fuelingRecords, setFuelingRecords] = useState<FuelRefillSummaryDTO>({
        refills: [],
        totalLiters: 0,
        totalCost: 0,
    });

    // Use the FuelType enum instead of string literals
    const mockFuelingRecords: FuelRefillDTO[] = [
        {
            id: '1',
            vehicleId: 'v1',
            stationId: 's1',
            liters: 50,
            pricePerLiter: 5.50,
            totalCost: 275.00,
            kmAtRefill: 15000,
            fuelType: FuelType.GASOLINE, // Use enum value
            refillDate: '10 de Janeiro de 2025',
        },
        {
            id: '2',
            vehicleId: 'v2',
            stationId: 's2',
            liters: 40,
            pricePerLiter: 6.00,
            totalCost: 240.00,
            kmAtRefill: 20000,
            fuelType: FuelType.DIESEL, // Use enum value
            refillDate: '12 de Maio de 2025',
        },
        {
            id: '3',
            vehicleId: 'v1',
            stationId: 's1',
            liters: 30,
            pricePerLiter: 5.80,
            totalCost: 174.00,
            kmAtRefill: 18000,
            fuelType: FuelType.ETHANOL, // Use enum value
            refillDate: '15 de Março de 2025',
        },
        {
            id: '4',
            vehicleId: 'v2',
            stationId: 's2',
            liters: 60,
            pricePerLiter: 5.90,
            totalCost: 354.00,
            kmAtRefill: 22000,
            fuelType: FuelType.FLEX, // Use enum value
            refillDate: '20 de Abril de 2025',
        },
        {
            id: '5',
            vehicleId: 'v1',
            stationId: 's1',
            liters: 45,
            pricePerLiter: 5.70,
            totalCost: 256.50,
            kmAtRefill: 16000,
            fuelType: FuelType.GASOLINE, // Use enum value
            refillDate: '25 de Fevereiro de 2025',
        }
    ];

    // Define missing functions and variables
    const [stationNames, setStationNames] = useState<Record<string, string>>({});

    const onAddFueling = () => {

    };

    const onEditVehicle = () => {
        router.push('/Vehicles/Update');
    };

    const onSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Use mockFuelingRecords on component mount
    useEffect(() => {
        // Calculate totals
        const totalLiters = mockFuelingRecords.reduce((sum, record) => sum + record.liters, 0);
        const totalCost = mockFuelingRecords.reduce((sum, record) => sum + record.totalCost, 0);

        // Update state
        setFuelingRecords({
            refills: mockFuelingRecords,
            totalLiters,
            totalCost,
        });

        // Set station names
        setStationNames({
            s1: 'Shell',
            s2: 'Shell',
        });
    }, []);

    return (
        <>
            <Header 
                title="Gestão de Veículo" 
                onBackPress={() => { router.back() }}
            />
            <ButtonContainer>
                <Button onPress={onAddFueling} variant="primary">
                    Novo Abastecimento
                </Button>
                <Button variant="secondary" onPress={onEditVehicle}>
                    Editar Veículo
                </Button>
            </ButtonContainer>
            <VehicleManagementScreen
                fuelingRecords={fuelingRecords}
                onAddFueling={onAddFueling}
                searchQuery={searchQuery}
                onSearch={onSearch}
                isLoading={isLoading}
                stationNames={stationNames}
            />
            {modal.visible && (
                <Alert
                    isVisible={modal.visible}
                    title={modal.title}
                    message={modal.message}
                    onConfirm={() => setModal({ ...modal, visible: false })}
                    onCancel={() => setModal({ ...modal, visible: false })}
                />
            )}
        </>
    );
};

export default VehicleManagement;