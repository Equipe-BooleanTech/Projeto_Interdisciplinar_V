import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { styles } from './_layout';
import images from '../../assets';
import { Button, Image, TextField } from '@/src/components';
import { router } from 'expo-router';

const LoginScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [passLogin, setPassLogin] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const [form, setForm] = useState({
      email: '',
      password: '',
    });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const toLogin = () => { 
    if (!form.email || !form.password) {
      setModalVisible(true);
      setModalTitle('Erro');
      setModalMessage('Todos os campos são obrigatórios!');
      return;
    }
    setModalVisible(true);
    setModalTitle('');
    setModalMessage('Login Realizado com Sucesso!');
    setPassLogin(true);
  };
  const toGoogleLogin = () => {
    setModalVisible(true);
    setModalTitle('');
    setModalMessage('Login Realizado com Sucesso!');
    setPassLogin(true);
  };
  const toPhoneLogin = () => {
    setModalVisible(true);
    setModalTitle('');
    setModalMessage('Login Realizado com Sucesso!');
    setPassLogin(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    if (passLogin) {
      router.navigate('/Home');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <Image svg={images.car} imgWidth={100} imgHeight={100} viewBox="0 0 100 100" />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.subtitle}>
          Não tem uma conta?{' '}
          <TouchableOpacity onPress={() => router.replace('/Cadastro')}>
            <Text style={styles.signupText}>Cadastre-se</Text>
          </TouchableOpacity>
        </Text>

        {/* <Text style={styles.subtitle}>
          Registro:{' '}
          <Link style={styles.signupText} href="/CadastroVeiculo">
            Registrar veículo.
          </Link>
        </Text> */}

        <Text style={styles.titleInput}> Email </Text>
        <TextField label="" labelAlign="left" placeholder="Digite um e-mail válido..." onChangeText={(value) => handleChange('email', value)} />
        <Text style={styles.titleInput}> Senha </Text>
        <TextField label="" labelAlign="left" placeholder="Digite sua senha..." type="password" onChangeText={(value) => handleChange('password', value)} />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checkboxChecked]}
            onPress={toggleCheckbox}
          >
            {isChecked && <Text style={styles.checkmark}>✔</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Lembrar credenciais?</Text>
        </View>

        <Button variant="primary" onPress={toLogin} full>
          Entrar
        </Button>

        <Text style={styles.orText}>OU</Text>

        <Button variant="social" onPress={toGoogleLogin} border={{ width: 1, color: '#000' }} full hasIcon icon={{
          size: 24,
          component: "https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg",
        }}>
          Continuar com o Google
        </Button>

        <Button variant="social" onPress={toPhoneLogin} border={{ width: 1, color: '#000' }} full hasIcon icon={{
          size: 24,
          component: "https://cdn-icons-png.flaticon.com/512/565/565512.png",
        }}>
          Continuar com Biometria
        </Button>

        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => closeModal()}
        >
          <View style={styles.modalOverlay}>
            <Pressable style={styles.modalBackground} onPress={() => closeModal()} />
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
