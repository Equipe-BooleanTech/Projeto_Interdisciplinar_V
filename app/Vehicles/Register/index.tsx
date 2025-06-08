import React, { useEffect, useState } from 'react';
import { Text, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './_layout';
import { router } from 'expo-router';
import { Alert as CustomAlert, Button, Form, Header } from '@/src/components';
import { FormHelpers } from '@/src/components/Form';
import { useForm } from 'react-hook-form';
import { createVehicle } from '@/src/services/vehicleService';
import { useStorage } from '@/src/hooks';
import { get } from '@/src/services';
import { VehicleManufacturer, VehicleModel } from '@/src/@types';
import { Toast } from 'toastify-react-native'
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/theme';

export type SelectData = {
  label: string;
  value: string;
  code?: string;
  search?: string;
};

const VehicleRegisterScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState<{
    visible: boolean;
    message: string;
    title: string;
  }>({
    visible: false,
    message: '',
    title: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleManufacturers, setVehicleManufacturers] = useState<SelectData[]>([]);
  const [vehicleModels, setVehicleModels] = useState<SelectData[]>([]);


  const [vehicleManufacturer, setVehicleManufacturer] = useState<VehicleManufacturer | null>(null);
  const [vehicleModel, setVehicleModel] = useState<VehicleModel | null>(null);

  const { getItem } = useStorage();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      plate: '',
      model: '',
      modelName: '',
      color: '',
      manufacturer: '',
      manufacturerName: '',
      type: '',
      description: '',
      year: '',
      km: '',
      fuelType: '',
      fuelCapacity: '',
      fuelConsumption: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const vehicleData = {
        ...data,
        manufacturer: data.manufacturerName || '',
        model: data.modelName || '',
        year: parseInt(data.year, 10),
        km: parseFloat(data.km),
        fuelCapacity: data.fuelCapacity ? parseFloat(data.fuelCapacity) : 0,
        odometer: parseFloat(data.km),
        fuelConsumption: data.fuelConsumption ? parseFloat(data.fuelConsumption) : 0,
      };

      const userId = await getItem('userId');
      console.log('User ID:', userId);
      if (!userId) {
        setIsSubmitting(false);
        Toast.error('Usuário não encontrado. Por favor, faça login novamente.');
        setModal({
          visible: true,
          message: 'Usuário não encontrado. Por favor, faça login novamente.',
          title: 'Erro',
        });
        return;
      }
      console.log('Vehicle Data:', vehicleData);
      
      await createVehicle(vehicleData, userId).then(() => {
        reset();
      }).catch((error) => {
        console.error('Error creating vehicle:', error);
        Toast.error('Ocorreu um erro ao cadastrar veículo. Verifique os dados e tente novamente.');
        setModal({
          visible: true,
          message: error?.message || 'Ocorreu um erro ao cadastrar veículo. Tente novamente.',
          title: 'Erro',
        });
        setIsSubmitting(false);
        return;
      });
      Toast.success('Veículo cadastrado com sucesso!');
      setModal({
        visible: true,
        message: 'Veículo cadastrado com sucesso!',
        title: 'Sucesso',
      });
      setIsSubmitting(false);
      return vehicleData;
    } catch (error: any) {
      Toast.error('Ocorreu um erro ao cadastrar veículo. Verifique os dados e tente novamente.');
      setModal({
        visible: true,
        message: error?.message || 'Ocorreu um erro ao cadastrar veículo. Tente novamente.',
        title: 'Erro',
      });
      setIsSubmitting(false);
      console.error('Error creating vehicle:', error);
    }
  };

  // ------------------------------------------------------
  // Fetch vehicle brands based on FIPE API
  // ------------------------------------------------------

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await get<null, VehicleManufacturer[]>('/fipe/marcas');
        const brands = response.map((model) => ({
          label: model.nome,
          value: model.codigo,
        }))
        setVehicleManufacturers(brands);
      } catch (error) {
        setModal({
          visible: true,
          message: 'Erro ao buscar marcas de veículos',
          title: 'Erro',
        });
      }
    }
    fetchManufacturers();
  }, []);

  // ------------------------------------------------------
  // Fetch vehicle models based on FIPE API
  // ------------------------------------------------------

  useEffect(() => {
    const fetchModels = async () => {
      if (vehicleManufacturer) {
        try {
          const response = await get<null, VehicleModel[]>(`/fipe/marcas/${vehicleManufacturer.codigo}/modelos`);
          // Check the actual response structure and extract models properly
          let modelsList = [];

          if (Array.isArray(response)) {
            modelsList = response;
          } else if (response) {
            modelsList = response.modelos || [];
          } else {
            Toast.error('Formato de resposta da API inesperado');
            return;
          }

          const models = modelsList.map((model: any) => ({
            label: model.nome,
            value: model.codigo,
          }));
          setVehicleModels(models);
        } catch (error) {
          console.error('Error fetching models:', error);
          Toast.error(`Erro ao buscar modelos de veículos`);
        }
      }
    }
    fetchModels();
  }, [vehicleManufacturer]);

  return (
    <ProtectedRoute>
      <>
        <Header
          title="Cadastro de Veículo"
          onBackPress={() => router.back()}
          showBackButton
        />
        <ScrollView contentContainerStyle={styles.container}>
          <Form.Root controlled>
            <Text style={styles.title}>Cadastro de Veículo</Text>
            <Text style={styles.subtitle}>Preencha os dados do veículo para continuar.</Text>
             {isLoading ? (
                          <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginVertical: 20 }} />
                        ) : (
                          FormHelpers.createFormFields({
                            control,
                            fields: [
                              {
                                name: 'plate',
                                type: 'textfield',
                                rules: {
                                  required: 'Placa é obrigatória',
                                },
                                label: 'Placa',
                                mask: 'plate',
                                placeholder: 'Digite a placa...',
                                errorMessage: errors.plate?.message,
                                componentProps: {
                                  onChangeText: (text: string) => setValue('plate', text),
                                  leftIcon: <MaterialIcons name="directions-car" size={20} color="#666" />,
                                },
                              },
                              {
                                name: 'manufacturer',
                                type: 'select',
                                label: 'Fabricante',
                                rules: {
                                  required: 'Fabricante é obrigatório',
                                },
                                options: [
                                  ...vehicleManufacturers
                                ],
                                errorMessage: errors.model?.message,
                                componentProps: {
                                  onValueChange: (itemValue: unknown) => {
                                    const valueStr = String(itemValue) || '';
                                    const selected = vehicleManufacturers.find(m => m.value === valueStr);
                                    if (selected) {
                                      setVehicleManufacturer({
                                        codigo: selected.value,
                                        nome: selected.label,
                                      });
                                      setValue('manufacturer', selected.value);
                                      setValue('manufacturerName', selected.label);
                                    }
                                  }
                                }
                              },
                              {
                                name: 'model',
                                type: 'select',
                                label: 'Modelo',
                                rules: {
                                  required: 'Modelo é obrigatório',
                                },
                                options: [
                                  ...vehicleModels
                                ],
                                componentProps: {
                                  onValueChange: (itemValue: unknown) => {
                                    const valueStr = String(itemValue) || '';
                                    const selected = vehicleModels.find(m => m.value === valueStr);
                                    if (selected) {
                                      setVehicleModel({
                                        codigo: selected.value,
                                        nome: selected.label,
                                      });
                                      setValue('model', selected.value);
                                      setValue('modelName', selected.label);
                                    }
                                  }
                                },
                                errorMessage: errors.model?.message,
                              },
                              {
                                name: 'year',
                                type: 'textfield',
                                rules: {
                                  required: 'Ano é obrigatório',
                                  pattern: {
                                    value: /^\d{4}$/,
                                    message: 'Ano deve ter 4 dígitos',
                                  },
                                },
                                label: 'Ano',
                                placeholder: 'Digite o ano...',
                                errorMessage: errors.year?.message,
                                componentProps: {
                                  onChangeText: (text: string) => setValue('year', text),
                                  keyboardType: 'numeric',
                                  leftIcon: <MaterialIcons name="calendar-today" size={20} color="#666" />,
                                  maxLength: 4,
                                },
                              },
                              {
                                name: 'color',
                                type: 'textfield',
                                label: 'Cor',
                                placeholder: 'Digite a cor...',
                                errorMessage: errors.color?.message,
                                componentProps: {
                                  onChangeText: (text: string) => setValue('color', text),
                                  leftIcon: <MaterialIcons name="palette" size={20} color="#666" />,
                                },
                              },
                              {
                                name: 'km',
                                type: 'textfield',
                                rules: {
                                  required: 'Quilometragem é obrigatória',
                                },
                                mask: 'number',
                                label: 'Quilometragem Atual',
                                placeholder: 'Digite a quilometragem...',
                                errorMessage: errors.km?.message,
                                componentProps: {
                                  onChangeText: (text: string) => setValue('km', text),
                                  keyboardType: 'numeric',
                                  leftIcon: <MaterialIcons name="speed" size={20} color="#666" />,
                                },
                              },
                              {
                                name: 'fuelType',
                                type: 'select',
                                label: 'Tipo de Combustível',
                                rules: {
                                  required: 'Tipo de combustível é obrigatório',
                                },
                                options: [
                                  { label: 'Gasolina', value: 'GASOLINE' },
                                  { label: 'Gasolina Premium', value: 'GASOLINE_PREMIUM' },
                                  { label: 'Etanol', value: 'ETHANOL' },
                                  { label: 'Diesel', value: 'DIESEL' },
                                  { label: 'Elétrico', value: 'ELECTRIC' },
                                  { label: 'Gnv', value: 'GNV' },
                                ],
                                errorMessage: errors.fuelType?.message,
                                componentProps: {
                                  placeholder: 'Selecione o tipo de combustível...',
                                },
                              },
                              {
                                name: 'fuelCapacity',
                                type: 'textfield',
                                label: 'Capacidade do Tanque (L)',
                                placeholder: 'Digite a capacidade do tanque...',
                                errorMessage: errors.fuelCapacity?.message,
                                componentProps: {
                                  onChangeText: (text: string) => setValue('fuelCapacity', text),
                                  keyboardType: 'numeric',
                                  leftIcon: <MaterialIcons name="local-gas-station" size={20} color="#666" />,
                                },
                              },
                              {
                                name: 'fuelConsumption',
                                type: 'textfield',
                                label: 'Consumo Médio (km/L)',
                                placeholder: 'Digite o consumo médio...',
                                errorMessage: errors.fuelConsumption?.message,
                                componentProps: {
                                  onChangeText: (text: string) => setValue('fuelConsumption', text),
                                  keyboardType: 'numeric',
                                  leftIcon: <MaterialIcons name="local-gas-station" size={20} color="#666" />,
                                },
                              },
                              {
                                name: 'description',
                                type: 'textfield',
                                label: 'Descrição',
                                placeholder: 'Digite uma descrição...',
                                errorMessage: errors.description?.message,
                                componentProps: {
                                  onChangeText: (text: string) => setValue('description', text),
                                  multiline: true,
                                  leftIcon: <MaterialIcons name="description" size={20} color="#666" />,
                                  numberOfLines: 3,
                                },
                              },
                            ],
                          })
                        )}
            <Button variant="primary" onPress={handleSubmit(onSubmit)} full disabled={isSubmitting}>
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Veículo'}
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
                  router.push('/(tabs)/vehicles');
                  reset();
                }
              }}
              confirmText="OK"
            />
          )}

        </ScrollView>
      </>
    </ProtectedRoute>
  );
};

export default VehicleRegisterScreen;
