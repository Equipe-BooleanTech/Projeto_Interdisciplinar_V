import React, { useEffect, useState } from 'react';
import { Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { styles } from './_layout';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert as CustomAlert, Button, Form } from '@/src/components';
import { FormHelpers } from '@/src/components/Form';
import { useForm } from 'react-hook-form';
import { updateVehicle } from '@/src/services/vehicleService';
import { useRedirect, useStorage } from '@/src/hooks';
import { IconButton } from '@/app/(tabs)/vehicles/styles';
import { Feather } from '@expo/vector-icons';
import { IconContainer } from '@/app/Auth/Login/styles';
import { get } from '@/src/services';
import { VehicleManufacturer, VehicleModel } from '@/src/@types';
import { Toast } from 'toastify-react-native'
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';

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
  const { checkAuthentication, redirect } = useRedirect();
  const { id } = useLocalSearchParams();

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
      color: '',
      manufacturer: '',
      type: '',
      description: '',
      year: '',
      km: '',
      fuelType: '',
      fuelCapacity: '',
      fuelConsumption: '',
      userId: getItem('userId')
    },
    mode: 'onBlur',
  });

  // Authentication and fetch vehicle data
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setIsLoading(true);
        // Fetch the vehicle data based on the ID
        const vehicleData = await getVehicleById(id as string);

        // Pre-populate form with existing data
        if (vehicleData) {
          Object.keys(vehicleData).forEach(key => {
            if (vehicleData[key] !== null && vehicleData[key] !== undefined) {
              // Convert numbers to strings for form fields
              const value = typeof vehicleData[key] === 'number'
                ? vehicleData[key].toString()
                : vehicleData[key];
              setValue(key, value);
            }
          });

          // Set manufacturer if available
          if (vehicleData.manufacturer) {
            const manufacturerObj = {
              codigo: '',
              nome: vehicleData.manufacturer,
            };
            setVehicleManufacturer(manufacturerObj);

            // Try to find the manufacturer code in manufacturers list
            const foundManufacturer = vehicleManufacturers.find(
              m => m.label.toLowerCase() === vehicleData.manufacturer.toLowerCase()
            );

            if (foundManufacturer) {
              manufacturerObj.codigo = foundManufacturer.value;
            }
          }
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
        Toast.error('Erro ao carregar dados do veículo');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicleData();
  }, [id, setValue, vehicleManufacturers]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const vehicleData = {
        ...data,
        year: parseInt(data.year, 10),
        km: parseFloat(data.km),
        fuelCapacity: data.fuelCapacity ? parseFloat(data.fuelCapacity) : 0,
        fuelConsumption: data.fuelConsumption ? parseFloat(data.fuelConsumption) : 0,
      };

      // Update vehicle instead of creating
      await updateVehicle(id as string, vehicleData);
      Toast.success('Veículo atualizado com sucesso!');

      setIsSubmitting(false);
      router.push('/(tabs)/vehicles');
      return vehicleData;
    } catch (error: any) {
      Toast.error('Ocorreu um erro ao atualizar veículo. Verifique os dados e tente novamente.');
      setIsSubmitting(false);
      console.error('Error updating vehicle:', error);
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

          // If we already have a model value, try to find and select it
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={styles.container}>
          <IconContainer>
            <IconButton onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="#fff" />
            </IconButton>
          </IconContainer>
          <Form.Root controlled>
            <Text style={styles.title}>Atualizar Veículo</Text>

            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />
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
                    componentProps: {
                      placeholder: 'Digite a placa...',
                      label: 'Placa',
                      onChangeText: (text: string) => {
                        setValue('plate', text);
                      },
                    },
                    errorMessage: errors.plate?.message,
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
                    errorMessage: errors.model?.message,
                    componentProps: {
                      onValueChange: (itemValue: unknown) => {
                        const valueStr = String(itemValue);
                        const selected = vehicleManufacturers.find(m => m.value === valueStr);
                        if (selected) {
                          setVehicleManufacturer({
                            codigo: selected.value,
                            nome: selected.label,
                          });
                          setValue('manufacturer', selected.label);
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
                        label: 'Selecione o modelo...',
                        value: '',
                      },
                      ...vehicleModels
                    ],
                    componentProps: {
                      onValueChange: (itemValue: unknown) => {
                        const valueStr = String(itemValue);
                        const selected = vehicleModels.find(m => m.value === valueStr);
                        if (selected) {
                          setVehicleModel({
                            codigo: selected.value,
                            nome: selected.label,
                          });
                          setValue('model', selected.label);
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
                    componentProps: {
                      placeholder: 'Digite o ano...',
                      label: 'Ano',
                      keyboardType: 'numeric',
                      onChangeText: (text: string) => {
                        setValue('year', text);
                      },
                    },
                    errorMessage: errors.year?.message,
                  },
                  {
                    name: 'color',
                    type: 'textfield',
                    componentProps: {
                      placeholder: 'Digite a cor...',
                      label: 'Cor',
                      onChangeText: (text: string) => {
                        setValue('color', text);
                      },
                    },
                    errorMessage: errors.color?.message,
                  },
                  {
                    name: 'km',
                    type: 'textfield',
                    rules: {
                      required: 'Quilometragem é obrigatória',
                    },
                    componentProps: {
                      placeholder: 'Digite a quilometragem...',
                      label: 'Quilometragem Atual',
                      keyboardType: 'numeric',
                      onChangeText: (text: string) => {
                        setValue('km', text);
                      },
                    },
                    errorMessage: errors.km?.message,
                  },
                  {
                    name: 'fuelType',
                    label: 'Tipo de Combustível',
                    type: 'select',
                    options: [
                      { label: 'Gasolina', value: 'GASOLINE' },
                      { label: 'Gasolina Premium', value: 'GASOLINE_PREMIUM' },
                      { label: 'Etanol', value: 'ETHANOL' },
                      { label: 'Diesel', value: 'DIESEL' },
                      { label: 'Elétrico', value: 'ELECTRIC' },
                      { label: 'Gnv', value: 'GNV' },
                    ],
                    rules: {
                      required: 'Tipo de combustível é obrigatório',
                    },
                    componentProps: {
                      placeholder: 'Selecione o tipo de combustível...',
                    },
                    errorMessage: errors.fuelType?.message,
                  },
                  {
                    name: 'fuelCapacity',
                    type: 'textfield',
                    componentProps: {
                      placeholder: 'Digite a capacidade do tanque...',
                      label: 'Capacidade do Tanque (L)',
                      keyboardType: 'numeric',
                      onChangeText: (text: string) => {
                        setValue('fuelCapacity', text);
                      },
                    },
                    errorMessage: errors.fuelCapacity?.message,
                  },
                  {
                    name: 'fuelConsumption',
                    type: 'textfield',
                    componentProps: {
                      placeholder: 'Digite o consumo médio...',
                      label: 'Consumo Médio (km/L)',
                      keyboardType: 'numeric',
                      onChangeText: (text: string) => {
                        setValue('fuelConsumption', text);
                      },
                    },
                    errorMessage: errors.fuelConsumption?.message,
                  },
                  {
                    name: 'description',
                    type: 'textfield',
                    componentProps: {
                      placeholder: 'Digite uma descrição...',
                      label: 'Descrição',
                      multiline: true,
                      onChangeText: (text: string) => {
                        setValue('description', text);
                      },
                    },
                    errorMessage: errors.description?.message,
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
      </SafeAreaView>
    </ProtectedRoute>
  );
};

export default VehicleUpdateScreen;