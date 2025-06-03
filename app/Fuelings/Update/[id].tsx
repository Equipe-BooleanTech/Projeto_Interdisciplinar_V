import React, { useCallback, useEffect, useState } from 'react';
import { Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { styles } from './_layout';
import { router } from 'expo-router';
import { Alert as CustomAlert, Button, Form, Header } from '@/src/components';
import { FormHelpers } from '@/src/components/Form';
import { useForm } from 'react-hook-form';
import { useStorage } from '@/src/hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { get, put } from '@/src/services';
import { Toast } from 'toastify-react-native';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { theme } from '@/theme';

export type SelectData = {
  label: string;
  value: string;
};

const GasStationUpdateScreen = () => {
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

  const { getItem } = useStorage();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  // Brazilian states for the select dropdown
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

  const getGasStationId = useCallback(async () => {
    try {
      const gasStationId = await getItem('gasStationId');
      return gasStationId || '';
    } catch (error) {
      console.error('Error fetching gas station ID:', error);
      return '';
    }
  }, [getItem]);

  useEffect(() => {
    const fetchGasStationData = async () => {
      try {
        setIsLoading(true);
        const gasStationId = await getGasStationId();
        const gasStationData = await get<{ id: string }, any>(`/gas-stations/${gasStationId}`);

        if (!gasStationData) {
          Toast.error('Posto não encontrado');
          router.push('/(tabs)/gasStations');
          return;
        }

        // Set all form values
        Object.keys(gasStationData).forEach(key => {
          if (gasStationData[key] !== null && gasStationData[key] !== undefined) {
            const value = typeof gasStationData[key] === 'number'
              ? String(gasStationData[key])
              : gasStationData[key];
            setValue(key, value);
          }
        });

        // Store the UUID for submission
        if (gasStationData.id) {
          setValue('id', gasStationData.id);
        }

      } catch (error) {
        console.error('Error fetching gas station data:', error);
        Toast.error('Erro ao carregar dados do posto');
      } finally {
        setIsLoading(false);
      }
    };
    fetchGasStationData();
  }, [setValue]);

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const gasStationData = {
        id: formData.id,
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        description: formData.description,
        rating: formData.rating ? parseInt(formData.rating, 10) : 0,
      };

      if (!gasStationData.id || !gasStationData.name || !gasStationData.address ||
        !gasStationData.city || !gasStationData.state) {
        setIsSubmitting(false);
        setModal({
          visible: true,
          message: 'Por favor, preencha todos os campos obrigatórios.',
          title: 'Erro',
        });
        return;
      }

      const result = await put(`/gas-stations/update/${gasStationData.id}`, gasStationData)
        .then((response) => {
          setModal({
            visible: true,
            message: response.message || 'Posto atualizado com sucesso!',
            title: 'Sucesso',
          });
          return response;
        })
        .catch((error) => {
          console.error('API error:', error);
          setModal({
            visible: true,
            message: error?.response?.data?.message || 'Erro ao atualizar posto',
            title: 'Erro',
          });
          throw error;
        });

      setIsSubmitting(false);
      router.push('/(tabs)/gasStations');
    } catch (error: any) {
      console.error('Error updating gas station:', error);
      setIsSubmitting(false);
      setModal({
        visible: true,
        message: error?.response?.data?.message || 'Erro ao atualizar posto',
        title: 'Erro',
      });
    }
  };

  return (
    <ProtectedRoute>
      <Header
        title="Editar Posto"
        onBackPress={() => { router.back() }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Form.Root controlled>
            <Text style={styles.title}>Atualizar Posto</Text>

            {isLoading ? (
              <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginVertical: 20 }} />
            ) : (
              FormHelpers.createFormFields({
                control,
                fields: [
                  {
                    name: 'name',
                    type: 'textfield',
                    rules: {
                      required: 'Nome é obrigatório',
                    },
                    label: 'Nome',
                    placeholder: 'Digite o nome do posto...',
                    errorMessage: errors.name?.message,
                    componentProps: {
                      onChangeText: (text: string) => setValue('name', text),
                      value: getValues('name') || '',
                      leftIcon: <MaterialIcons name="local-gas-station" size={20} color="#666" />,
                    },
                  },
                  {
                    name: 'address',
                    type: 'textfield',
                    rules: {
                      required: 'Endereço é obrigatório',
                    },
                    label: 'Endereço',
                    placeholder: 'Digite o endereço...',
                    errorMessage: errors.address?.message,
                    componentProps: {
                      onChangeText: (text: string) => setValue('address', text),
                      value: getValues('address') || '',
                      leftIcon: <MaterialIcons name="place" size={20} color="#666" />,
                    },
                  },
                  {
                    name: 'city',
                    type: 'textfield',
                    rules: {
                      required: 'Cidade é obrigatória',
                    },
                    label: 'Cidade',
                    placeholder: 'Digite a cidade...',
                    errorMessage: errors.city?.message,
                    componentProps: {
                      onChangeText: (text: string) => setValue('city', text),
                      value: getValues('city') || '',
                      leftIcon: <MaterialIcons name="location-city" size={20} color="#666" />,
                    },
                  },
                  {
                    name: 'state',
                    type: 'select',
                    label: 'Estado',
                    rules: {
                      required: 'Estado é obrigatório',
                    },
                    options: [
                      {
                        label: 'Selecione o estado...',
                        value: '',
                      },
                      ...brazilianStates
                    ],
                    componentProps: {
                      value: getValues('state') || '',
                      onValueChange: (itemValue: string) => {
                        setValue('state', itemValue, { shouldValidate: true });
                      }
                    },
                    errorMessage: errors.state?.message,
                  },
                  {
                    name: 'description',
                    type: 'textfield',
                    label: 'Descrição',
                    placeholder: 'Digite uma descrição...',
                    errorMessage: errors.description?.message,
                    componentProps: {
                      onChangeText: (text: string) => setValue('description', text),
                      value: getValues('description') || '',
                      multiline: true,
                      leftIcon: <MaterialIcons name="description" size={20} color="#666" />,
                      numberOfLines: 3,
                    },
                  },
                  {
                    name: 'rating',
                    type: 'textfield',
                    label: 'Avaliação (1-5)',
                    placeholder: 'Digite a avaliação...',
                    rules: {
                      min: {
                        value: 1,
                        message: 'A avaliação mínima é 1'
                      },
                      max: {
                        value: 5,
                        message: 'A avaliação máxima é 5'
                      }
                    },
                    errorMessage: errors.rating?.message,
                    componentProps: {
                      onChangeText: (text: string) => setValue('rating', text),
                      value: getValues('rating') || '',
                      keyboardType: 'numeric',
                      leftIcon: <MaterialIcons name="star" size={20} color="#666" />,
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
              {isSubmitting ? 'Atualizando...' : 'Atualizar Posto'}
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
                  router.push('/(tabs)/gasStations');
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

export default GasStationUpdateScreen;