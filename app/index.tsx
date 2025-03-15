import { router } from 'expo-router';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { stylesHome } from '@/app/_layout';
import * as LocalAuthentication from 'expo-local-authentication';
import GoogleButton from './Components/GoogleButton';
import React from 'react';

export default function Index() {
  return (
    <ScrollView contentContainerStyle={stylesHome.container}>
      <View style={stylesHome.iconContainer}></View>

      <View style={stylesHome.formContainer}>
        <Text style={stylesHome.title}>Seja Bem-Vindo!</Text>
        <TouchableOpacity style={stylesHome.biometricButton} onPress={handleBiometricAuth}>
          <Text style={stylesHome.biometricButtonText}>Login com Biometria</Text>
        </TouchableOpacity>

        <GoogleButton />
        <TouchableOpacity style={stylesHome.phoneButton}>
          {/* necesita imagen de smartphone */}
          <Text style={stylesHome.phoneButtonText}>Continuar com Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesHome.emailButton} onPress={() => router.push('/Login')}>
          <Text style={stylesHome.emailButtonText}>Continuar com Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const handleBiometricAuth = async () => {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  if (!compatible) {
    Alert.alert('Seu dispositivo não suporta biometria.');
    return;
  }

  const enrolled = await LocalAuthentication.isEnrolledAsync();
  if (!enrolled) {
    Alert.alert('Nenhuma biometria cadastrada. Configure nas configurações do dispositivo.');
    return;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Autentique-se para continuar',
    fallbackLabel: 'Usar senha',
  });

  if (result.success) {
    Alert.alert('Autenticado com sucesso!');
    router.push('/');
  } else {
    Alert.alert('Falha na autenticação');
  }
};
