import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { View, Text, ScrollView, Alert, Modal, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { styles } from './_layout';
import images from '../../assets';
import { Button, Image, TextField } from '@/src/components';
import { register } from '@/src/services/auth'; // Importa a função de registro

const RegisterScreen = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    username: '',
    birthdate: '',
    phone: '',
    password: '',
  });
  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.birthdate || !form.phone || !form.password || !form.lastName || !form.username) {
      // Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      setModalVisible(true);
      setModalTitle('Erro');
      setModalMessage('Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      await register(form); // Chama a API de registro
      // Alert.alert('Sucesso', 'Conta criada com sucesso!');
      setModalVisible(true);
      setModalTitle('');
      setModalMessage('Cadastro realizado com sucesso!!!');

      router.push('/Login'); // Redireciona para login
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Alert.alert('Erro', 'Falha ao criar conta. Tente novamente.');
      setModalVisible(true);
      setModalTitle('Erro');
      setModalMessage('Falha ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

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

        <Text style={styles.titleInput}> Nome </Text>
        <TextField placeholder="Digite seu primeiro nome..." value={form.name} onChangeText={(value) => handleChange('name', value)} />

        <Text style={styles.titleInput}> Sobrenome </Text>
        <TextField placeholder="Digite seu sobrenome..." value={form.lastName} onChangeText={(value) => handleChange('lastName', value)} />

        <Text style={styles.titleInput}> Usuario </Text>
        <TextField placeholder="Digite seu nome de usuario..." value={form.username} onChangeText={(value) => handleChange('username', value)} />

        <Text style={styles.titleInput}> Email </Text>
        <TextField placeholder="Digite um e-mail válido..." value={form.email} onChangeText={(value) => handleChange('email', value)} />

        <Text style={styles.titleInput}> Data de Nascimento </Text>
        <TextField placeholder="DD/MM/AAAA" type='date' value={form.birthdate} onChangeText={(value) => handleChange('birthdate', value)} />

        <Text style={styles.titleInput}> Número de Celular </Text>
        <TextField placeholder="Digite seu telefone..." type='phone' value={form.phone} onChangeText={(value) => handleChange('phone', value)} />

        <Text style={styles.titleInput}> Crie uma senha </Text>
        <TextField placeholder="Digite sua senha..." type='password' value={form.password} onChangeText={(value) => handleChange('password', value)} />

        <Text style={styles.titleInput}> </Text>

        <Button variant="primary" onPress={handleRegister} full disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>

        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)} />
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

export default RegisterScreen;
