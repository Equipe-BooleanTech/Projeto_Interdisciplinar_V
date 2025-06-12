import React, { useState, useEffect } from 'react';
import { Text, ScrollView, SafeAreaView, ActivityIndicator, View } from 'react-native';
import { styles } from './_layout';
import { router } from 'expo-router';
import { Alert as CustomAlert, Button, Form, Header } from '@/src/components';
import { FormHelpers } from '@/src/components/Form';
import { useForm } from 'react-hook-form';
import { listGasStations, createFuelRefill, findVehicleByPlate } from '@/src/services';
import { useStorage } from '@/src/hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { Toast } from 'toastify-react-native';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { theme } from '@/theme';

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

  const { getItem } = useStorage();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const liters = watch('liters');
  const pricePerLiter = watch('pricePerLiter');

   useEffect(() => {
    if (liters && pricePerLiter) {
      try {
        const litersValue = parseFloat(String(liters).replace(',', '.'));
        const priceValue = parseFloat(String(pricePerLiter).replace(',', '.'));
        
        if (!isNaN(litersValue) && !isNaN(priceValue)) {
          const calculatedTotal = litersValue * priceValue;
          setValue('totalCost', calculatedTotal.toFixed(2));
        }
      } catch (e) {
        console.error('Error calculating total cost:', e);
      }
    }
  }, [liters, pricePerLiter, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {

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

    const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const userId = await getItem('userId');
      const vehiclePlate = await getItem('vehiclePlate');

      const vehicle = await findVehicleByPlate(vehiclePlate as string);
      const vehicleId = vehicle?.id;
      if (!vehicleId || !userId) {
        const errorMessage = !vehicleId ? 'Veículo não selecionado' : 'Usuário não autenticado';
        setModal({
          visible: true,
          message: errorMessage,
          title: 'Erro',
        });
        return;
      }
  

      let refillDate;
      if (formData.refillDate) {
        const [day, month, year] = formData.refillDate.split('/');
        refillDate = new Date(`${year}-${month}-${day}T12:00:00`);
        
        if (isNaN(refillDate.getTime())) {
          setModal({
            visible: true,
            message: 'Data de abastecimento inválida',
            title: 'Erro',
          });
          return;
        }
      }
  

      const refillData = {
        vehicleId,
        stationId: formData.stationId,
        liters: parseFloat(String(formData.liters).replace(',', '.')),
        pricePerLiter: parseFloat(String(formData.pricePerLiter).replace(',', '.')),
        totalCost: parseFloat(String(formData.totalCost).replace(',', '.')),
        kmAtRefill: parseFloat(String(formData.kmAtRefill).replace(',', '.')),
        isCompleteTank: formData.isCompleteTank,
        fuelType: formData.fuelType,
      };
  
      const response = await createFuelRefill(refillData, vehicleId, formData.stationId);
      
      setModal({
        visible: true,
        message: 'Abastecimento registrado com sucesso!',
        title: 'Sucesso',
      });
  
      reset();
    } catch (error: any) {
      console.error('Error creating fuel refill:', error);
      setModal({
        visible: true,
        message: error?.response?.data?.message || 'Erro ao registrar abastecimento',
        title: 'Erro',
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
                    required: 'Litros abastecidos são obrigatórios',
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
                  mask: 'currency',
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
                  mask: 'currency',
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
                  mask: 'number',
                  label: 'Quilometragem Atual',
                  placeholder: 'Ex: 12.500',
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
              ],
            })}

            <Button
              variant="primary"
              onPress={handleSubmit(onSubmit)}
              full
              disabled={isSubmitting || isLoading}
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