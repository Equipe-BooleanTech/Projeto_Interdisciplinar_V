import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { User } from '@/src/@types';
import { router, useLocalSearchParams } from 'expo-router';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { useForm } from 'react-hook-form';
import { Button, Form, Header, Typography } from '@/src/components';
import { FormHelpers } from '@/src/components/Form';
import { Toast } from 'toastify-react-native';
import { theme } from '@/theme';
import { useStorage } from '@/src/hooks';
import { get, remove } from '@/src/services';
import { deleteUser, updateUser } from '@/src/services/users';
import { validations } from '@/src/utils';

const EditProfileScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const { getItem } = useStorage();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<User>({
    defaultValues: {
      name: '',
      lastname: '',
      username: '',
      email: '',
      phone: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = params.id || (await getItem('userId'));
        if (!userId) throw new Error('User ID not found');

        const user = await get(`/users/list-by-id/${userId}`);
        console.log('User data fetched:', user);
        setUserData(user as User);
        reset(user as User);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Toast.error('Erro ao carregar dados do usuário');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const onSubmit = async (data: User) => {
    if (!userData?.id) return;

    setIsSubmitting(true);
    try {
      const updatedUser = {
        ...userData,
        ...data,
      };
      await updateUser(userData.id, updatedUser);
      Alert.alert('Perfil atualizado com sucesso! Faça login novamente para ver as alterações.', '', [
        {
          text: 'OK',
          onPress: () => {
            remove('userId');
            router.replace('/Auth/Login');
          },
        },
      ]);
    } catch (error: any) {
      console.error('Error updating user:', error);
      Toast.error(error?.response?.data?.message || 'Erro ao atualizar perfil');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Container>
    );
  }

  return (
    <ProtectedRoute>
      <Container>
        <Header
          title="Editar Perfil"
          onBackPress={() => router.back()}
        />
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>

            <AvatarSection>
              <AvatarContainer>
                {userData?.avatar ? (
                  <Avatar source={{ uri: userData.avatar }} />
                ) : (
                  <DefaultAvatar>
                    <AvatarText>{userData?.name?.charAt(0) || 'U'}</AvatarText>
                  </DefaultAvatar>
                )}
              </AvatarContainer>
            </AvatarSection>

            <FormContainer>
              <Typography variant="h1" style={{ textAlign: 'center', marginBottom: 16 }}>
                Editar Perfil
              </Typography>
              <Typography variant="body1" style={{ textAlign: 'center', marginBottom: 24 }}>
                Atualize suas informações pessoais abaixo.
              </Typography>
              <Form.Root controlled>
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
                      label: 'Nome Completo',
                      placeholder: 'Digite seu nome completo...',
                      errorMessage: errors.name?.message,
                      componentProps: {
                        leftIcon: <MaterialIcons name="person" size={20} color="#666" />,
                      },
                    },
                    {
                      name: 'lastname',
                      type: 'textfield',
                      rules: {
                        required: 'Sobrenome é obrigatório',
                        minLength: {
                          value: 3,
                          message: 'Sobrenome deve ter pelo menos 3 caracteres'
                        }
                      },
                      label: 'Sobrenome',
                      placeholder: 'Digite seu sobrenome...',
                      errorMessage: errors.lastname?.message,
                      componentProps: {
                        leftIcon: <MaterialIcons name="person-outline" size={20} color="#666" />,
                      },
                    },
                    {
                      name: 'username',
                      type: 'textfield',
                      rules: {
                        required: 'Usuário é obrigatório',
                        minLength: {
                          value: 3,
                          message: 'Usuário deve ter pelo menos 3 caracteres'
                        }
                      },
                      label: 'Usuário',
                      placeholder: 'Digite seu usuário...',
                      errorMessage: errors.username?.message,
                      componentProps: {
                        leftIcon: <MaterialIcons name="person" size={20} color="#666" />,
                        autoCapitalize: 'none',
                      },
                    },
                    {
                      name: 'email',
                      type: 'textfield',
                      rules: {
                        required: 'Email é obrigatório',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email inválido'
                        }
                      },
                      label: 'Email',
                      placeholder: 'Digite seu email...',
                      errorMessage: errors.email?.message,
                      componentProps: {
                        leftIcon: <MaterialIcons name="email" size={20} color="#666" />,
                        keyboardType: 'email-address',
                        autoCapitalize: 'none',
                      },
                    },
                    {
                      name: 'phone',
                      type: 'textfield',
                      rules: {
                        required: 'Telefone é obrigatório',
                        validate: validations.phone,

                      },
                      label: 'Telefone',
                      placeholder: 'Digite seu telefone...',
                      errorMessage: errors.phone?.message,
                      mask: 'phone',
                      componentProps: {
                        leftIcon: <Feather name="phone" size={20} color="#666" />,
                        keyboardType: 'phone-pad',

                      },
                    },
                  ],
                })}
              </Form.Root>
              <Button
                onPress={handleSubmit(onSubmit)}
                variant="primary"
                disabled={!isDirty || isSubmitting}
              >
                {isSubmitting ? <ActivityIndicator size="small" color="#fff" /> : 'Salvar Alterações'}
              </Button>
              <DeleteAccountButton onPress={() => {
                Alert.alert(
                  'Excluir Conta',
                  'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
                  [
                    {
                      text: 'Cancelar',
                      style: 'cancel',
                    },
                    {
                      text: 'Excluir',
                      style: 'destructive',
                      onPress: async () => {
                        await deleteUser(userData?.id || '');
                        Alert.alert('Conta excluída com sucesso!');
                        router.replace('/Auth/Login');
                      },
                    },
                  ],
                  { cancelable: true }
                );
              }
              }>
                <DeleteAccountText>Excluir Conta</DeleteAccountText>
              </DeleteAccountButton>
            </FormContainer>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </ProtectedRoute>
  );
};

// Styled components remain the same as in your original code
const Container = styled(SafeAreaView)`
  height: 100%;
  flex: 1;
  background-color: #f8f9fa;
`;

const AvatarSection = styled.View`
  align-items: center;
  margin: 24px 0;
`;

const AvatarContainer = styled.View`
  position: relative;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #e1e1e1;
`;

const DefaultAvatar = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #454F2C;
  justify-content: center;
  align-items: center;
`;

const AvatarText = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: white;
`;

const EditAvatarButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #454F2C;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.View`
  margin: 0 16px;
`;

const DeleteAccountButton = styled.TouchableOpacity`
  margin-top: 32px;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: #fff0f0;
  border: 1px solid #ff4444;
  margin-bottom: 16px;
`;

const DeleteAccountText = styled.Text`
  color: #ff4444;
  font-size: 16px;
  font-weight: 500;
`;

export default EditProfileScreen;