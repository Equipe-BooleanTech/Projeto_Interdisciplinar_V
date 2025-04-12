import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { styles } from './_layout';
import { router } from 'expo-router';
import images from '../../assets';
import { register } from '@/src/services/auth';

const RegisterScreen = () => {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    username: '',
    birthdate: '',
    phone: '',
    password: '',
  });

  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleCheckbox = () => setIsChecked(!isChecked);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.birthdate ||
      !form.phone ||
      !form.password ||
      !form.lastName ||
      !form.username
    ) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    try {
      setLoading(true);
      await register(form); // Chama a API de registro
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.push('/Login'); // Redireciona para login
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={images.car} style={styles.icon} />
      </View>

      <View style={styles.formContainer}>
        <TouchableOpacity onPress={() => router.replace('/Home')}>
          <Text style={{ color: '#4D86FF', marginBottom: 10 }}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cadastre-se</Text>

        <Text style={styles.subtitle}>
          Já possui uma conta?{' '}
          <TouchableOpacity onPress={() => router.replace('/Login')}>
            <Text style={styles.signupText}>Faça o Login</Text>
          </TouchableOpacity>
        </Text>

        <View style={styles.field}>
          <Text>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu primeiro nome..."
            placeholderTextColor="#a1a1a1"
            value={form.name}
            onChangeText={(value) => handleChange('name', value)}
          />
        </View>

        <View style={styles.field}>
          <Text>Sobrenome </Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu sobrenome..."
            placeholderTextColor="#a1a1a1"
            value={form.lastName}
            onChangeText={(value) => handleChange('lastName', value)}
          />
        </View>

        <View style={styles.field}>
          <Text>Usuario </Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome de usuario..."
            placeholderTextColor="#a1a1a1"
            value={form.username}
            onChangeText={(value) => handleChange('username', value)}
          />
        </View>

        <View style={styles.field}>
          <Text>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail..."
            keyboardType="email-address"
            placeholderTextColor="#a1a1a1"
            value={form.email}
            onChangeText={(value) => handleChange('email', value)}
          />
        </View>

        <View style={styles.field}>
          <Text>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
            placeholderTextColor="#a1a1a1"
            value={form.birthdate}
            onChangeText={(value) => handleChange('birthdate', value)}
          />
        </View>

        <View style={styles.field}>
          <Text>Número de Celular</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Digite seu número..."
            placeholderTextColor="#a1a1a1"
            value={form.phone}
            onChangeText={(value) => handleChange('phone', value)}
          />
        </View>

        <View style={styles.field}>
          <Text>Crie uma senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite uma senha..."
            secureTextEntry
            placeholderTextColor="#a1a1a1"
            value={form.password}
            onChangeText={(value) => handleChange('password', value)}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checkboxChecked]}
            onPress={toggleCheckbox}
          >
            {isChecked && <Text style={styles.checkmark}>✔</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Lembrar credenciais?</Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister} disabled={loading}>
          <Text style={styles.loginButtonText}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
