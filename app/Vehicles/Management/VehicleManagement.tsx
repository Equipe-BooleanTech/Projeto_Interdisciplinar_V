import { useCallback, useEffect, useState } from "react";
import { VehicleManagement as VehicleManagementScreen } from "@/src/screens";
import React from "react";
import { FuelRefillDTO, FuelRefillSummaryDTO } from "./VehicleManagement.interface";
import { Alert, Header } from "@/src/components";
import { router } from "expo-router";
import { ButtonContainer } from "./VehicleManagement.style";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { useStorage } from "@/src/hooks";
import { listFuelRefills } from "@/src/services";


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
    const { getItem, setItem } = useStorage();
    const [isLoading, setIsLoading] = useState(false);

    const [fuelingRecords, setFuelingRecords] = useState<FuelRefillSummaryDTO>({
        refills: [],
        totalLiters: 0,
        totalCost: 0,
    });

    const getVehicleId = useCallback(async () => {
        const vehicleId = await getItem('vehicleId');
        if (!vehicleId) {
            console.error('Vehicle ID not found in storage');
            return '';
        }
        return vehicleId;
    }, []);

    const getVehiclePlate = useCallback(() => {
        const vehiclePlate = getItem('vehiclePlate');
        if (!vehiclePlate) {
            console.error('Vehicle plate not found in storage');
            return '';
        }
        return vehiclePlate;
    }, []);

    // --------------------------------------------------
    // Fetch vehicle fueling records from API
    // --------------------------------------------------
    useEffect(() => {
        const fetchFuelingRecords = async () => {
            setIsLoading(true);
            try {
                const vehicleId = await getVehicleId();
                if (!vehicleId) {
                    console.error('Vehicle ID is not set');
                    setIsLoading(false);
                    return;
                }
                const response = await listFuelRefills(vehicleId || '');
                const records: FuelRefillDTO[] = response.content;
                const totalLiters = records.reduce((sum, record) => sum + record.liters, 0);
                const totalCost = records.reduce((sum, record) => sum + record.totalCost, 0);

                setFuelingRecords({
                    refills: records,
                    totalLiters,
                    totalCost,
                });
            } catch (error) {
                console.error('Error fetching fueling records:', error);
                setModal({
                    visible: true,
                    message: 'Erro ao buscar registros de abastecimento.',
                    title: 'Erro',
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchFuelingRecords();
    }, [])

    // Define missing functions and variables
    const [stationNames, setStationNames] = useState<Record<string, string>>({});

    const onAddFueling = () => {
        router.push('/Fuelings/Register/');
    };

    const onEditVehicle = () => {
        const vehiclePlate = getVehiclePlate();
        router.push('/Vehicles/Update', {
            params: {
                id: vehiclePlate,
            },
        });
    };

    const onSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <>
            <Header
                title="Gestão de Veículo"
                onBackPress={() => { router.back() }}
            />
            <ButtonContainer>
                <Dropdown
                    style={{ width: '90%' }}
                    data={[
                        { label: 'Editar Dados do Veículo', value: 'edit', onPress: onEditVehicle, leftIcon: 'edit' },
                        { label: 'Novo Abastecimento', value: 'new', onPress: onAddFueling, leftIcon: 'plus' },
                        { label: 'Consultar Lembretes', value: 'reminders', onPress: () => router.push('/Reminders/Management/RemindersManagement'), leftIcon: 'bell' },
                        { label: 'Consultar Manutenções', value: 'maintenance', onPress: () => router.push('/Maintainances/Management/MaintainanceManagement'), leftIcon: 'wrench' },
                    ]}
                    labelField="label"
                    valueField="value"
                    placeholder=" "
                    search={false}
                    onChange={(item) => {
                        if (item.onPress) {
                            item.onPress();
                        }
                    }
                    }
                    renderRightIcon={() => <></>}
                    renderLeftIcon={() => <Ionicons name="menu" size={24} color="black" />}
                />
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