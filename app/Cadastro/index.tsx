import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { styles } from './_layout';
import images from '../../assets';
import { Button, Image, TextField } from '@/src/components';

const RegisterScreen = () => {

  const [data, setData] = useState('');
  const [telefone, setTelefone] = useState('');
  const toRegister = () => {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <Image svg={images.car} imgWidth={100} imgHeight={100} viewBox="0 0 100 100" />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Cadastre-se</Text>

        <Text style={styles.subtitle}>
          Já possui uma conta?{' '}
          <Link style={styles.signupText} href="/Login">
            Faça login.
          </Link>
        </Text>

        <Text style={styles.titleInput}> Nome Completo </Text>
        <TextField label="" labelAlign="left" placeholder="Digite seu nome..." />
        <Text style={styles.titleInput}> Email </Text>
        <TextField label="" labelAlign="left" placeholder="Digite um e-mail válido..." />
        <Text style={styles.titleInput}> Data de Nascimento </Text>
        <TextField label="" labelAlign="left" placeholder="DD/MM/AAAA" type='date' value={data} onChangeText={setData}/>
        <Text style={styles.titleInput}> Número de Celular </Text>
        <TextField label="" labelAlign="left" placeholder="Digite seu telefone..." type='phone' value={telefone} onChangeText={setTelefone} />
        <Text style={styles.titleInput}> Crie uma senha </Text>
        <TextField label="" labelAlign="left" placeholder="Digite sua senha..." type='password' />

        <Text style={styles.titleInput}> </Text>

        <Button variant="primary" onPress={toRegister} full>
          Cadastrar
        </Button>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
