import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import { styles } from './_layout';
import { Link, router } from 'expo-router';
import { Alert as CustomAlert, Button, Form, Image } from '@/src/components';
import { FormHelpers } from '@/src/components/Form';
import { useForm } from 'react-hook-form';
import images from '../../../assets';
import { createVehicle } from '@/src/services/vehicleService';
import { useStorage } from '@/src/hooks';

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
      color: '',
      manufacturer: '',
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
      // Convert numeric string fields to numbers
      const vehicleData = {
        ...data,
        year: parseInt(data.year, 10),
        km: parseFloat(data.km),
        fuelCapacity: data.fuelCapacity ? parseFloat(data.fuelCapacity) : 0,
        fuelConsumption: data.fuelConsumption ? parseFloat(data.fuelConsumption) : 0,
      };

      const userId = getItem('userId');

      // Correct parameter order: vehicleData first, then userId
      await createVehicle(vehicleData, userId as string);

      setModal({
        visible: true,
        message: 'Veículo cadastrado com sucesso!',
        title: 'Sucesso',
      });

      setIsSubmitting(false);
      return vehicleData;
    } catch (error: any) {
      setModal({
        visible: true,
        message: error?.response?.data?.message || 'Erro ao cadastrar veículo',
        title: 'Erro',
      });
      setIsSubmitting(false);
      console.error('Error creating vehicle:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.iconContainer}>
          <Image svg={images.car} imgWidth={100} imgHeight={100} viewBox="0 0 100 100" />
        </View>

        <Form.Root controlled>
          <View style={styles.backContainer}>
            <Link href="/" style={styles.back}>
              Voltar
            </Link>
          </View>
          <Text style={styles.title}>Cadastro de Veículo</Text>

          {FormHelpers.createFormFields({
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
                name: 'model',
                type: 'textfield',
                rules: {
                  required: 'Modelo é obrigatório',
                },
                componentProps: {
                  placeholder: 'Digite o modelo...',
                  label: 'Modelo',
                  onChangeText: (text: string) => {
                    setValue('model', text);
                  },
                },
                errorMessage: errors.model?.message,
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
                name: 'manufacturer',
                type: 'textfield',
                rules: {
                  required: 'Fabricante é obrigatório',
                },
                componentProps: {
                  placeholder: 'Digite o fabricante...',
                  label: 'Fabricante',
                  onChangeText: (text: string) => {
                    setValue('manufacturer', text);
                  },
                },
                errorMessage: errors.manufacturer?.message,
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
                name: 'km',
                type: 'textfield',
                rules: {
                  required: 'Quilometragem é obrigatória',
                },
                componentProps: {
                  placeholder: 'Digite a quilometragem...',
                  label: 'KM Atual',
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
          })}

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
                router.push('/Home');
                reset();
              }
            }}
            confirmText="OK"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VehicleRegisterScreen;
