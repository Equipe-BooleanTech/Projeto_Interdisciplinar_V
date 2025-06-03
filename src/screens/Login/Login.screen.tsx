import React, { useState } from 'react';
import { Alert, Button, Form, Typography } from '@/src/components';
import { useForm } from 'react-hook-form';
import { FormHelpers } from '@/src/components/Form';
import { validatePassword, validations } from '@/src/utils';
import { login } from '@/src/services/auth';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { LoginTextContainer, OrText } from './Login.styles';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState<{
    visible: boolean;
    message: string;
    title: string;
    actions?: any;
  }>({
    visible: false,
    message: '',
    title: '',
  });

  const [isOAuth, setIsOAuth] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      isOAuth: false,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      });

      setModal({
        visible: true,
        message: 'Usuário autenticado com sucesso!',
        title: 'Sucesso',
      });

      setIsSubmitting(false);
      return res;
    } catch (error: any) {
      console.error('Erro ao autenticar:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Ocorreu um erro durante a autenticação. Tente novamente mais tarde.';

      setModal({
        visible: true,
        message: 'Ocorreu um erro ao autenticar. Verifique suas credenciais e tente novamente.',
        title: 'Erro',
      });

      setIsSubmitting(false);
      return {
        status: 'error',
        error: errorMessage,
        originalError: error,
      };
    }
  };

  return (
    <Form.Root controlled>
      <Typography variant="h1">Faça o Login</Typography>
      <LoginTextContainer>
        <Typography variant="body1">
          Ainda não tem uma conta?
        </Typography>
        <TouchableOpacity onPress={() => router.push('/Auth/Register')}>
          <Typography variant="body1_underline" color="#454F2C" fontWeight="bold">
            Crie uma!
          </Typography>
        </TouchableOpacity>
      </LoginTextContainer>

      {FormHelpers.createFormFields({
        control,
        fields: [
          {
            name: 'email',
            type: 'textfield',
            rules: {
              required: 'Email é obrigatório',
              validate: validations.email,
            },
            label: 'Email',
            placeholder: 'Digite seu email...',
            errorMessage: errors.email?.message,
            componentProps: {
              onChangeText: (text: string) => setValue('email', text),
              keyboardType: 'email-address',
              leftIcon: <MaterialIcons name="email" size={20} color="#666" />,
              autoCapitalize: 'none',
            },
          },
          {
            name: 'password',
            type: 'textfield',
            rules: {
              required: 'Senha é obrigatória',
              minLength: {
                value: 8,
                message: 'Senha deve ter pelo menos 8 caracteres',
              },
              validate: {
                validatePassword: (value) => {
                  const isValid = validatePassword(value);
                  return isValid || 'Senha deve conter letras, números e caracteres especiais';
                },
              },
            },
            label: 'Senha',
            placeholder: 'Digite sua senha...',
            errorMessage: errors.password?.message,
            componentProps: {
              onChangeText: (text: string) => setValue('password', text),
              secureTextEntry: !showPassword,
              leftIcon: <MaterialIcons name="lock" size={20} color="#666" />,
              rightIcon: (
                <MaterialIcons
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={20}
                  color="#666"
                />
              ),
              onRightIconPress: () => setShowPassword(!showPassword),
              autoCapitalize: 'none',
            },
          },
        ],
      })}

      <Button
        variant="primary"
        onPress={handleSubmit(onSubmit)}
        full
        disabled={isSubmitting}
        children={isSubmitting ? 'Realizando Login...' : 'Login'}
      />

      {modal.visible && (
        <Alert
          isVisible={modal.visible}
          title={modal.title}
          message={modal.message}
          onConfirm={async () => {
            setModal({ ...modal, visible: false });
            if (modal.title === 'Sucesso') {
              router.push('/(tabs)/dashboard');
            }
            setIsSubmitting(false);
            reset();
          }}
          confirmText="OK"
          cancelText="Cancelar"
        />
      )}

      <OrText>OU</OrText>

      <Button
        variant="social"
        onPress={() => {
          setIsOAuth(true);
          setModal({
            visible: true,
            message: 'Login com Google em desenvolvimento',
            title: 'Aguarde',
            actions: [
              {
                text: 'OK',
                onPress: () => {
                  setModal({ ...modal, visible: false });
                  setIsOAuth(false);
                },
              },
            ],
          });
        }}
        border={{ width: 1, color: '#000' }}
        full
        hasIcon
        icon={{
          size: 24,
          component: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
        }}
      >
        Continuar com o Google
      </Button>

      <Button
        variant="social"
        onPress={() => {
          setIsOAuth(true);
          setModal({
            visible: true,
            message: 'Login com Biometria em desenvolvimento',
            title: 'Aguarde',
            actions: [
              {
                text: 'OK',
                onPress: () => {
                  setModal({ ...modal, visible: false });
                  setIsOAuth(false);
                },
              },
            ],
          });
        }}
        border={{ width: 1, color: '#000' }}
        full
        hasIcon
        icon={{
          size: 24,
          component: 'https://cdn-icons-png.flaticon.com/512/565/565512.png',
        }}
      >
        Continuar com Biometria
      </Button>
    </Form.Root>
  );
};

export default LoginScreen;