import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { styles } from './_layout';
import images from '../../assets';

import { Button, Image, TextField } from '@/src/components';

const LoginScreen = () => {
  const [isChecked, setIsChecked] = useState(false); // checkbox (necesita mejores ajustes)

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const toLogin = () => {};
  const toGoogleLogin = () => {};
  const toPhoneLogin = () => {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <Image svg={images.car} imgWidth={100} imgHeight={100} viewBox="0 0 100 100" />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.subtitle}>
          Não tem uma conta?{' '}
          <Link style={styles.signupText} href="/Cadastro">
            Cadastre-se.
          </Link>
        </Text>

        {/* <Text style={styles.titleInput}> Email </Text> */}
        <TextField label="Email" labelAlign="center" placeholder="Digite um e-mail válido..." />
        {/* <Text style={styles.titleInput}> Senha </Text> */}
        <TextField
          label="Senha"
          labelAlign="left"
          placeholder="Digite sua senha..."
          type="password"
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checkboxChecked]}
            onPress={toggleCheckbox}
          >
            {isChecked && <Text style={styles.checkmark}>✔</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Lembrar credenciais?</Text>
        </View>

        <Button variant="primary" onPress={toLogin}>
          Entrar
        </Button>

        <Text style={styles.orText}>OU</Text>

        <Button variant="primary" onPress={toGoogleLogin}>
          Continuar com o Google
        </Button>

        <Button variant="primary" onPress={toPhoneLogin}>
          Continuar com telefone
        </Button>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
