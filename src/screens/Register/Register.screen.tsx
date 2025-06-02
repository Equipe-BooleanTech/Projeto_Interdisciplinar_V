import React, { useState } from 'react';
import { Alert, Button, Form, Typography } from '@/src/components';
import { useForm } from 'react-hook-form';
import { FormHelpers } from '@/src/components/Form';
import { masks, validatePassword, validations } from '@/src/utils';
import { register } from '@/src/services/auth';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { LoginTextContainer } from './Register.styles';
import { MaterialIcons } from '@expo/vector-icons';

const RegisterScreen = () => {
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

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      username: '',
      birthdate: '',
      phone: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const res = await register(data);
      setModal({
        visible: true,
        message: 'Cadastro realizado com sucesso!',
        title: 'Sucesso',
      });
      setIsSubmitting(false);
      return res;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Ocorreu um erro durante o cadastro';

      setModal({
        visible: true,
        message: 'Ocorreu um erro ao cadastrar sua conta. Tente novamente mais tarde.',
        title: 'Erro',
      });

      return {
        status: 'error',
        error: errorMessage,
        originalError: error,
      };
    }
  };

  return (
    <>
      <Form.Root controlled>
        <Typography variant="h1">Crie sua conta</Typography>
        <LoginTextContainer>
          <Typography variant="body1">
            Já possui uma conta?{' '}
          </Typography>
          <TouchableOpacity onPress={() => router.push('/Auth/Login')}>
            <Typography variant="body1_underline" color="#454F2C" fontWeight="bold">
              Faça login
            </Typography>
          </TouchableOpacity>
        </LoginTextContainer>
        {FormHelpers.createFormFields({
          control,
          fields: [
            {
              name: 'name',
              type: 'textfield',
              rules: {
                required: 'Nome é obrigatório',
              },
              label: 'Nome',
              placeholder: 'Digite seu nome...',
              errorMessage: errors.name?.message,
              componentProps: {
                onChangeText: (text: string) => setValue('name', text),
                leftIcon: <MaterialIcons name="person" size={20} color="#666" />,
              },
            },
            {
              name: 'lastname',
              type: 'textfield',
              label: 'Sobrenome',
              placeholder: 'Digite seu sobrenome...',
              errorMessage: errors.lastname?.message,
              componentProps: {
                onChangeText: (text: string) => setValue('lastname', text),
                leftIcon: <MaterialIcons name="person-outline" size={20} color="#666" />,
              },
            },
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
              name: 'username',
              type: 'textfield',
              rules: {
                required: 'Nome de usuário é obrigatório',
                validate: validations.username,
              },
              label: 'Nome de Usuário',
              placeholder: 'Digite seu nome de usuário...',
              errorMessage: errors.username?.message,
              componentProps: {
                onChangeText: (text: string) => setValue('username', text),
                leftIcon: <MaterialIcons name="alternate-email" size={20} color="#666" />,
                autoCapitalize: 'none',
              },
            },
            {
              name: 'birthdate',
              type: 'textfield',
              rules: {
                required: 'Data de nascimento é obrigatória',
                validate: validations.date,
              },
              label: 'Data de Nascimento',
              placeholder: 'DD/MM/AAAA',
              mask: 'date',
              errorMessage: errors.birthdate?.message,
              componentProps: {
                onChangeText: (text: string) => setValue('birthdate', text),
                keyboardType: 'number-pad',
                leftIcon: <MaterialIcons name="cake" size={20} color="#666" />,
                maxLength: 10,
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
              placeholder: '(00) 00000-0000',
              mask: 'phone',
              errorMessage: errors.phone?.message,
              componentProps: {
                onChangeText: (text: string) => setValue('phone', text),
                keyboardType: 'phone-pad',
                leftIcon: <MaterialIcons name="phone" size={20} color="#666" />,
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
          children={isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        />
      </Form.Root>
      {modal.visible && (
        <Alert
          isVisible={modal.visible}
          title={modal.title}
          message={modal.message}
          onConfirm={() => {
            setModal({ ...modal, visible: false });
            if (modal.title === 'Sucesso') {
              router.push('/Auth/Login');
            }
            setModal({ ...modal, visible: false });
            setIsSubmitting(false);
            reset();
          }}
          confirmText="OK"
          cancelText="Cancelar"
        />
      )}
    </>
  );
};

export default RegisterScreen;