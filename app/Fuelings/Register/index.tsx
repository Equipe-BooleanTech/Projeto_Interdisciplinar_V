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
      refillDate: '',
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
      // Authentication checks
      const userId = await getItem('userId');
      const vehicleId = await getItem('vehicleId');
      
      if (!vehicleId) {
        Toast.error('Veículo não selecionado. Por favor, selecione um veículo.');
        setIsSubmitting(false);
        return;
      }
      
      if (!userId) {
        Toast.error('Usuário não autenticado');
        setIsSubmitting(false);
        return;
      }
  
      // Parse the date string from DD/MM/YYYY to ISO format
      let formattedDate;
      if (data.refillDate) {
        const [day, month, year] = data.refillDate.split('/');
        if (day && month && year) {
          const dateObj = new Date(`${year}-${month}-${day}T12:00:00`);
          
          if (isNaN(dateObj.getTime())) {
            throw new Error('Data de abastecimento inválida');
          }
          
          formattedDate = dateObj.toISOString();
        } else {
          throw new Error('Formato de data inválido (DD/MM/AAAA)');
        }
      } else {
        throw new Error('Data de abastecimento é obrigatória');
      }
  
      // Format and validate data
      const refillData = {
        liters: parseFloat(data.liters),
        pricePerLiter: parseFloat(data.pricePerLiter),
        totalCost: parseFloat(data.totalCost),
        kmAtRefill: parseFloat(data.kmAtRefill),
        isCompleteTank: Boolean(data.isCompleteTank),
        fuelType: data.fuelType as FuelType,
        refillDate: formattedDate,
        userId,
        vehicleId,
      };
  
      console.log('Submitting fuel refill:', {
        refillData,
        vehicleId,
        stationId: data.stationId
      });
  
      // Submit data
      const response = await createFuelRefill(refillData, vehicleId, data.stationId);
      
      if (!response) {
        throw new Error('Erro ao registrar abastecimento');
      }
  
      // Success
      setModal({
        visible: true,
        title: 'Sucesso',
        message: 'Abastecimento registrado com sucesso!',
      });
  
      // Reset form
      control._reset();
  
    } catch (error: any) {
      console.error('Error submitting fuel refill:', error);
      
      // Determine appropriate error message
      let errorMessage = 'Erro ao registrar abastecimento';
      
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setModal({
        visible: true,
        title: 'Erro',
        message: errorMessage,
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
                  rules: {
                    required: 'Data é obrigatória',
                    pattern: {
                      value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                      message: 'Formato inválido (DD/MM/AAAA)'
                    }
                  },
                  label: 'Data do Abastecimento',
                  placeholder: 'DD/MM/AAAA',
                  errorMessage: errors.refillDate?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="calendar-today" size={20} color="#666" />,
                    keyboardType: 'numeric',
                    mask: 'date',
                    maxLength: 10,
                  },
                },
              ],
            })}

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