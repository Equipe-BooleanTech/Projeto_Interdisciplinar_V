import React, { useState } from 'react';
import { Button, Form, Typography } from '@/src/components';
import { useForm } from 'react-hook-form';
import { FormHelpers } from '@/src/components/Form';
import { masks, validatePassword, validations } from '@/src/utils';
import { register } from '@/src/services/auth';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { LoginTextContainer } from './Register.styles';

const RegisterScreen = () => {
  const [modal, setModal] = useState<{
    visible: boolean;
    message: string;
    title: string;
  }>({
    visible: false,
    message: '',
    title: '',
  });

  const {
    control,
    handleSubmit,
    setValue,
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
    try {
      const res = await register(data);
      console.log(res);
      if (res.status === 201) {
        setModal({
          visible: true,
          message: 'Cadastro realizado com sucesso!',
          title: 'Sucesso',
        });
        router.push('/Login');
      } else {
        setModal({
          visible: true,
          message: res.data.message || 'Erro desconhecido',
          title: 'Erro',
        });
      }

      return res; // This properly returns the response object
    } catch (error: any) {
      const errorMessage = error.message || 'Ocorreu um erro durante o cadastro';

      setModal({
        visible: true,
        message: errorMessage,
        title: 'Erro',
      });

      // Return a structured error object instead of the setModal result
      return {
        status: 'error',
        error: errorMessage,
        originalError: error,
      };
    }
  };

  return (
    <Form.Root controlled>
      <Typography variant="h1">Crie sua conta</Typography>
      <LoginTextContainer>
        <Typography variant="body1">
          Já possui uma conta?{' '}
          <TouchableOpacity onPress={() => router.push('/Login')}>
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
        onPress={() => handleSubmit(onSubmit)()}
        full
        children="Cadastrar"
      />
    </Form.Root>
  );
};
export default RegisterScreen;
