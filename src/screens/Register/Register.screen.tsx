import React, { useState } from 'react';
import { Alert, Button, Form, Typography } from '@/src/components';
import { useForm } from 'react-hook-form';
import { FormHelpers } from '@/src/components/Form';
import { masks, validatePassword, validations } from '@/src/utils';
import { register } from '@/src/services/auth';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { LoginTextContainer } from './Register.styles';

const RegisterScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
            <TouchableOpacity onPress={() => router.push('/Auth/Login')}>
              <Typography variant="body1" color="#454F2C">
                Faça login
              </Typography>
            </TouchableOpacity>
          </Typography>
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
              componentProps: {
                placeholder: 'Digite seu nome...',
                label: 'Nome',
                onChangeText: (text: string) => {
                  setValue('name', text);
                },
              },
              errorMessage: errors.name?.message,
            },
            {
              name: 'lastname',
              type: 'textfield',
              componentProps: {
                placeholder: 'Digite seu sobrenome...',
                label: 'Sobrenome',
                onChangeText: (text: string) => {
                  setValue('lastname', text);
                },
              },
              errorMessage: errors.lastname?.message,
            },
            {
              name: 'email',
              type: 'textfield',
              rules: {
                required: 'Email é obrigatório',
                validate: validations.email,
              },
              componentProps: {
                placeholder: 'Digite seu email...',
                label: 'Email',
                keyboardType: 'email-address',
                onChangeText: (text) => {
                  setValue('email', text);
                },
              },
              errorMessage: errors.email?.message,
            },
            {
              name: 'username',
              type: 'textfield',
              rules: {
                required: 'Nome de usuário é obrigatório',
                validate: validations.username,
              },
              componentProps: {
                placeholder: 'Digite seu nome de usuário...',
                label: 'Nome de Usuário',
                onChangeText: (text) => {
                  setValue('username', text);
                },
              },
              errorMessage: errors.username?.message,
            },
            {
              name: 'birthdate',
              type: 'maskedtextfield',
              label: 'Data de Nascimento',
              mask: masks.date,
              rules: {
                required: 'Data de nascimento é obrigatória',
                validate: validations.date,
              },
              componentProps: {
                placeholder: 'DD/MM/AAAA',
                onChangeText: (text) => {
                  setValue('birthdate', text);
                },
                onBlur: (text) => {
                  const isValid = validations.date(text.nativeEvent.text);
                  return isValid || 'Data de nascimento inválida';
                },
                keyboardType: 'number-pad',
              },
              errorMessage: errors.birthdate?.message,
            },
            {
              name: 'phone',
              label: 'Telefone',
              type: 'maskedtextfield',
              mask: masks.phone,
              rules: {
                required: 'Telefone é obrigatório',
                validate: validations.phone,
              },
              componentProps: {
                placeholder: '(XX) XXXXX-XXXX',
                keyboardType: 'phone-pad',
                onChangeText: (text) => {
                  setValue('phone', text);
                },
                onBlur: (text) => {
                  const isValid = validations.phone(text.nativeEvent.text);
                  return isValid || 'Número de telefone inválido';
                },
              },
              errorMessage: errors.phone?.message,
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
              componentProps: {
                placeholder: '********',
                label: 'Senha',
                secureTextEntry: true,
                onChangeText: (text) => {
                  setValue('password', text);
                },
              },
              errorMessage: errors.password?.message,
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
