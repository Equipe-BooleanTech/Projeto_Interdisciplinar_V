import React, { useState } from 'react';
import { Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { styles } from './_layout';
import { router } from 'expo-router';
import { Alert as CustomAlert, Button, Form, Header } from '@/src/components';
import { FormHelpers } from '@/src/components/Form';
import { useForm, Controller } from 'react-hook-form';
import { createGasStation, post } from '@/src/services';
import { useStorage } from '@/src/hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { Toast } from 'toastify-react-native';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';

export type SelectData = {
  label: string;
  value: string;
};

const GasStationCreateScreen = () => {
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
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      description: '',
      rating: '',
    },
    mode: 'onBlur',
  });

  // Brazilian states for dropdown
  const brazilianStates = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' },
  ];

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const userId = await getItem('userId');
      if (!userId) {
        Toast.error('Usuário não encontrado. Faça login novamente.');
        return;
      }

      const gasStationData = {
        ...formData,
        rating: formData.rating ? parseInt(formData.rating, 10) : 0,
      };

      const response = await createGasStation(gasStationData);

      setModal({
        visible: true,
        title: 'Sucesso',
        message: response.message || 'Posto cadastrado com sucesso!',
      });

      reset();
    } catch (error: any) {
      console.error('Error:', error);
      setModal({
        visible: true,
        title: 'Erro',
        message: error?.response?.data?.message || 'Erro ao cadastrar posto',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <Header
        title="Cadastrar Posto"
        onBackPress={() => router.back()}
        showBackButton
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Form.Root controlled>
            <Text style={styles.title}>Novo Posto de Gasolina</Text>
            <Text style={styles.subtitle}>Preencha os dados do posto</Text>

            {FormHelpers.createFormFields({
              control,
              fields: [
                {
                  name: 'name',
                  type: 'textfield',
                  rules: {
                    required: 'Nome é obrigatório',
                    minLength: {
                      value: 3,
                      message: 'Nome deve ter pelo menos 3 caracteres'
                    }
                  },
                  label: 'Nome do Posto',
                  placeholder: 'Ex: Posto Shell',
                  errorMessage: errors.name?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="local-gas-station" size={20} color="#666" />,
                  },
                },
                {
                  name: 'address',
                  type: 'textfield',
                  rules: {
                    required: 'Endereço é obrigatório',
                    minLength: {
                      value: 5,
                      message: 'Endereço deve ter pelo menos 5 caracteres'
                    }
                  },
                  label: 'Endereço Completo',
                  placeholder: 'Ex: Av. Paulista, 1000',
                  errorMessage: errors.address?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="place" size={20} color="#666" />,
                  },
                },
                {
                  name: 'city',
                  type: 'textfield',
                  rules: {
                    required: 'Cidade é obrigatória',
                    minLength: {
                      value: 3,
                      message: 'Cidade deve ter pelo menos 3 caracteres'
                    }
                  },
                  label: 'Cidade',
                  placeholder: 'Ex: São Paulo',
                  errorMessage: errors.city?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="location-city" size={20} color="#666" />,
                  },
                },
                {
                  name: 'state',
                  type: 'select',
                  rules: { required: 'Estado é obrigatório' },
                  label: 'Estado',
                  options: [
                    { label: 'Selecione um estado...', value: '' },
                    ...brazilianStates
                  ],
                  errorMessage: errors.state?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="map" size={20} color="#666" />,
                  },
                },
                {
                  name: 'rating',
                  type: 'textfield',
                  label: 'Avaliação (1-5)',
                  placeholder: 'Ex: 4',
                  rules: {
                    min: { value: 1, message: 'Mínimo 1' },
                    max: { value: 5, message: 'Máximo 5' },
                    pattern: {
                      value: /^[1-5]$/,
                      message: 'Avaliação deve ser entre 1 e 5'
                    }
                  },
                  errorMessage: errors.rating?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="star" size={20} color="#666" />,
                    keyboardType: 'numeric',
                    maxLength: 1,
                  },
                },
                {
                  name: 'description',
                  type: 'textfield',
                  label: 'Descrição',
                  placeholder: 'Ex: Posto com lava-rápido e conveniência',
                  errorMessage: errors.description?.message,
                  componentProps: {
                    leftIcon: <MaterialIcons name="description" size={20} color="#666" />,
                    multiline: true,
                    numberOfLines: 3,
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
                'Cadastrar Posto'
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
                  router.push('/(tabs)/gas-stations');
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

export default GasStationCreateScreen;