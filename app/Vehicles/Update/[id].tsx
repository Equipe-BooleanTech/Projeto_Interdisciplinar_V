import React, { useCallback, useEffect, useState } from 'react';
import { Text, ScrollView, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { styles } from './_layout';
import { router } from 'expo-router';
import { Alert as CustomAlert, Button, Form, Header } from '@/src/components';
import { FormHelpers } from '@/src/components/Form';
import { useForm } from 'react-hook-form';
import { findVehicleByPlate, updateVehicle } from '@/src/services/vehicleService';
import { useStorage } from '@/src/hooks';
import {  MaterialIcons } from '@expo/vector-icons';
import { get } from '@/src/services';
import { VehicleManufacturer, VehicleModel } from '@/src/@types';
import { Toast } from 'toastify-react-native'
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { theme } from '@/theme';

export type SelectData = {
  label: string;
  value: string;
};

const VehicleUpdateScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState<{
    visible: boolean;
    message: string;
    title: string;
  }>({
    visible: false,
    message: '',
    title: '',
  });

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
    mode: 'onBlur',
  });

  const getPlateId = useCallback(async () => {
    try {
      const plateId = await getItem('vehiclePlate');
      return plateId || '';
    } catch (error) {
      console.error('Error fetching vehicle plate ID:', error);
      return '';
    }
  }, [getItem]);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setIsLoading(true);
        const plateId = await getPlateId();
        const vehicleData = await findVehicleByPlate(plateId);

        if (!vehicleData) {
          Toast.error('Veículo não encontrado');
          router.push('/(tabs)/vehicles');
          return;
        }

        Object.keys(vehicleData).forEach(key => {
          if (vehicleData[key] !== null && vehicleData[key] !== undefined) {
            const value = typeof vehicleData[key] === 'number'
              ? String(vehicleData[key])
              : vehicleData[key];
            setValue(key, value);
          }
        });

        if (vehicleManufacturers.length === 0) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        if (vehicleData.manufacturer) {
          const foundManufacturer = vehicleManufacturers.find(
            m => m.label.toLowerCase() === vehicleData.manufacturer.toLowerCase()
          );

          if (foundManufacturer) {
            setVehicleManufacturer({
              codigo: foundManufacturer.value,
              nome: foundManufacturer.label,
            });
            setValue('manufacturer', foundManufacturer.label);
          }
        }

        if (vehicleData.id) {
          setValue('uuid', vehicleData.id);
        }

      } catch (error) {
        console.error('Error fetching vehicle data:', error);
        Toast.error('Erro ao carregar dados do veículo');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicleData();
  }, [setValue, vehicleManufacturers]);

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const vehicleData = {
        id: formData.id,
        plate: formData.plate,
        manufacturer: vehicleManufacturer?.nome || formData.manufacturer,
        model: vehicleModel?.nome || formData.model,
        year: parseInt(formData.year, 10),
        color: formData.color,
        km: Number(formData.km),
        fuelType: formData.fuelType,
        fuelCapacity: formData.fuelCapacity ? parseFloat(formData.fuelCapacity) : 0,
        fuelConsumption: formData.fuelConsumption ? parseFloat(formData.fuelConsumption) : 0,
        odometer: formData.km ? Number(formData.km) : 0,
        description: formData.description
      };

      const result = await updateVehicle(vehicleData.id, vehicleData).then((response) => {
        Alert.alert('Sucesso', 'Veículo atualizado com sucesso!', [
          {
            text: 'OK',
            onPress: () => {
              reset();
              router.back();
            },
          },
        ]);
      }).catch((error) => {
        console.error('API error:', error);
        throw error;
      });
      setIsSubmitting(false);
      router.push('/(tabs)/vehicles');
    } catch (error: any) {
      console.error('Error updating vehicle:', error);
      setIsSubmitting(false);
      setModal({
        visible: true,
        message: error?.response?.data?.message || 'Erro ao atualizar veículo',
        title: 'Erro',
      });
    }
  };

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
        console.error('Error fetching vehicle models:', error);
        setModal({
          visible: true,
          message: 'Erro ao buscar marcas de veículos',
          title: 'Erro',
        });
      }
    }
    fetchManufacturers();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if (vehicleManufacturer) {
        try {
          const response = await get<null, VehicleModel[]>(`/fipe/marcas/${vehicleManufacturer.codigo}/modelos`);
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

          const currentModel = control._formValues.model;
          if (currentModel) {
            const foundModel = models.find(m =>
              m.label.toLowerCase() === currentModel.toLowerCase()
            );

            if (foundModel) {
              setVehicleModel({
                codigo: foundModel.value,
                nome: foundModel.label,
              });
            }
          }
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
      <Header
        title="Editar Veículo"
        onBackPress={() => { router.back() }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Form.Root controlled>
            <Text style={styles.title}>Atualizar Veículo</Text>

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
                      {
                        label: 'Selecione o fabricante...',
                        value: '',
                      },
                      ...vehicleManufacturers
                    ],
                    componentProps: {
                      value: vehicleManufacturer?.codigo || '',
                      selectedValue: vehicleManufacturer?.codigo || '',
                      onValueChange: (itemValue: string) => {
                        const selected = vehicleManufacturers.find(m => m.value === itemValue);
                        if (selected) {
                          setVehicleManufacturer({
                            codigo: selected.value,
                            nome: selected.label,
                          });
                          setValue('manufacturer', selected.label, { shouldValidate: true });
                          setVehicleModels([]); 
                          setValue('model', '', { shouldValidate: true });
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
                      {
                        label: vehicleModels.length === 0 ? 'Selecione o fabricante primeiro' : 'Selecione o modelo...',
                        value: '',
                      },
                      ...vehicleModels
                    ],
                    componentProps: {
                      value: vehicleModel?.codigo || '',
                      selectedValue: vehicleModel?.codigo || '',
                      onValueChange: (itemValue: string) => {
                        const selected = vehicleModels.find(m => m.value === itemValue);
                        if (selected) {
                          setVehicleModel({
                            codigo: selected.value,
                            nome: selected.label,
                          });
                          setValue('model', selected.label, { shouldValidate: true });
                        }
                      }
                    }
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
                      numberOfLines: 5,
                    },
                  },
                ],
              })
            )}

            <Button
              variant="primary"
              onPress={handleSubmit(onSubmit)}
              full
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? 'Atualizando...' : 'Atualizar Veículo'}
            </Button>
          </Form.Root>
        </ScrollView>
      </SafeAreaView>
    </ProtectedRoute>
  );
};

export default VehicleUpdateScreen;