import React, { useState, useEffect } from 'react';
import { Text, ScrollView, SafeAreaView, ActivityIndicator, View } from 'react-native';
import { styles } from './_layout';
import { router } from 'expo-router';
import { Alert as CustomAlert, Button, Form, Header } from '@/src/components';
import { FormHelpers } from '@/src/components/Form';
import { useForm } from 'react-hook-form';
import { listGasStations, post } from '@/src/services';
import { useStorage } from '@/src/hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { Toast } from 'toastify-react-native';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { theme } from '@/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { listVehicles } from '@/src/services/vehicleService';
import { createFuelRefill } from '@/src/services/fuelRefil';

type Vehicle = {
  id: string;
  plate: string;
  model: string;
};

type GasStation = {
  id: string;
  name: string;
};

enum FuelType {
  GASOLINE = 'GASOLINE',
  ETHANOL = 'ETHANOL',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  GNV = 'GNV',
}

const FuelRefillFormScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState({
    visible: false,
    message: '',
    title: '',
  });
  const [gasStations, setGasStations] = useState<{ label: string; value: string }[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [refillDate, setRefillDate] = useState(new Date());

  const { getItem } = useStorage();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vehicleId: '',
      stationId: '',
      liters: '',
      pricePerLiter: '',
      totalCost: '',
      kmAtRefill: '',
      isCompleteTank: false,
      fuelType: '',
      refillDate: new Date(),
    },
    mode: 'onBlur',
  });

  // Calculate total cost when liters or pricePerLiter changes
  const liters = watch('liters');
  const pricePerLiter = watch('pricePerLiter');

  useEffect(() => {
    if (liters && pricePerLiter) {
      const calculatedTotal = parseFloat(liters) * parseFloat(pricePerLiter);
      setValue('totalCost', calculatedTotal.toFixed(2));
    }
  }, [liters, pricePerLiter, setValue]);

  // Fetch vehicles and gas stations
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch gas stations (mock API call)
        const stationsResponse = await listGasStations();
        console.log('Gas Stations:', stationsResponse);
        const stationsData = stationsResponse.content.map((s: GasStation) => ({
          label: s.name,
          value: s.id,
        }));
        setGasStations(stationsData);

      } catch (error) {
        Toast.error('Erro ao carregar dados');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const userId = await getItem('userId');
      const vehicleId = await getItem('vehicleId');
      if (!vehicleId) {
        Toast.error('Veículo não selecionado. Por favor, selecione um veículo.');
        return;
      }
      if (!userId) {
        Toast.error('Usuário não autenticado');
        return;
      }

      const refillData = {
        ...data,
        liters: parseFloat(data.liters),
        pricePerLiter: parseFloat(data.pricePerLiter),
        totalCost: parseFloat(data.totalCost),
        kmAtRefill: parseFloat(data.kmAtRefill),
        isCompleteTank: Boolean(data.isCompleteTank),
        refillDate: data.refillDate.toISOString(),
        userId,
        vehicleId,
        fuelType: data.fuelType as FuelType,
        stationId: data.stationId,
      };

      console.log('Refill Data:', refillData);
      console.log('Vehicle ID:', vehicleId);
      console.log('Station ID:', data.stationId);
      const response = await createFuelRefill(refillData, vehicleId, data.stationId);
      if (!response) {
        throw new Error('Erro ao registrar abastecimento');
      }


      setModal({
        visible: true,
        title: 'Sucesso',
        message: 'Abastecimento registrado com sucesso!',
      });

    } catch (error: any) {
      setModal({
        visible: true,
        title: 'Erro',
        message: error?.response?.data?.message || 'Erro ao registrar abastecimento',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fuelTypeOptions = [
    { label: 'Gasolina', value: FuelType.GASOLINE },
    { label: 'Etanol', value: FuelType.ETHANOL },
    { label: 'Diesel', value: FuelType.DIESEL },
    { label: 'Elétrico', value: FuelType.ELECTRIC },
    { label: 'GNV', value: FuelType.GNV },
  ];

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setRefillDate(selectedDate);
      setValue('refillDate', selectedDate);
    }
  };



  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ProtectedRoute>
      <Header
        title="Registrar Abastecimento"
        onBackPress={() => router.back()}
        showBackButton
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Form.Root controlled>
            <Text style={styles.title}>Novo Abastecimento</Text>
            <Text style={styles.subtitle}>Preencha os dados do abastecimento</Text>

            {FormHelpers.createFormFields({
              control,
              fields: [
                {
                  name: 'stationId',
                  type: 'select',
                  rules: { required: 'Posto é obrigatório' },
                  label: 'Posto de Gasolina',
                  options: [
                    { label: 'Selecione um posto...', value: '' },
                    ...gasStations
                  ],
                  errorMessage: errors.stationId?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="local-gas-station" size={20} color="#666" />,
                  },
                },
                {
                  name: 'fuelType',
                  type: 'select',
                  rules: { required: 'Tipo de combustível é obrigatório' },
                  label: 'Tipo de Combustível',
                  options: fuelTypeOptions,
                  errorMessage: errors.fuelType?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="local-gas-station" size={20} color="#666" />,
                  },
                },
                {
                  name: 'liters',
                  type: 'textfield',
                  rules: {
                    required: 'Litros são obrigatórios',
                    min: { value: 0.1, message: 'Mínimo 0.1 litro' }
                  },
                  label: 'Litros Abastecidos',
                  placeholder: 'Ex: 42.5',
                  errorMessage: errors.liters?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="water-drop" size={20} color="#666" />,
                    keyboardType: 'numeric',
                  },
                },
                {
                  name: 'pricePerLiter',
                  type: 'textfield',
                  rules: {
                    required: 'Preço por litro é obrigatório',
                    min: { value: 0.01, message: 'Preço inválido' }
                  },
                  label: 'Preço por Litro (R$)',
                  placeholder: 'Ex: 5.75',
                  errorMessage: errors.pricePerLiter?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="attach-money" size={20} color="#666" />,
                    keyboardType: 'numeric',
                  },
                },
                {
                  name: 'totalCost',
                  type: 'textfield',
                  label: 'Valor Total (R$)',
                  placeholder: 'Calculado automaticamente',
                  componentProps: {
                    disabled: true,
                    leftIcon: <MaterialIcons name="calculate" size={20} color="#666" />,
                    editable: false,
                  },
                },
                {
                  name: 'kmAtRefill',
                  type: 'textfield',
                  rules: {
                    required: 'Quilometragem é obrigatória',
                    min: { value: 0, message: 'Quilometragem inválida' }
                  },
                  label: 'Quilometragem Atual',
                  placeholder: 'Ex: 12500',
                  errorMessage: errors.kmAtRefill?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="speed" size={20} color="#666" />,
                    keyboardType: 'numeric',
                  },
                },
                {
                  name: 'isCompleteTank',
                  type: 'switch',
                  label: 'Tanque Completo?',
                  componentProps: {
                    trackColor: { false: '#767577', true: theme.colors.primary },
                    thumbColor: '#f4f3f4',
                  },
                },
                {
                  name: 'refillDate',
                  type: 'textfield',
                  rules: { required: 'Data é obrigatória' },
                  label: 'Data do Abastecimento',
                  value: refillDate.toLocaleDateString('pt-BR'),
                  errorMessage: errors.refillDate?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="calendar-today" size={20} color="#666" />,
                    onFocus: () => setShowDatePicker(true),
                    showSoftInputOnFocus: false,
                  },
                },
              ],
            })}

            {showDatePicker && (
              <DateTimePicker
                value={refillDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )}

            <Button
              variant="primary"
              onPress={handleSubmit(onSubmit)}
              full
              disabled={isSubmitting}
              style={{ marginTop: 20 }}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                'Registrar Abastecimento'
              )}
            </Button>
          </Form.Root>

          {modal.visible && (
            <CustomAlert
              isVisible={modal.visible}
              title={modal.title}
              message={modal.message}
              onConfirm={() => {
                setModal({ ...modal, visible: false });
                if (modal.title === 'Sucesso') {
                  router.push('/Vehicles/Management/VehicleManagement');
                }
              }}
              confirmText="OK"
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </ProtectedRoute>
  );
};

export default FuelRefillFormScreen;