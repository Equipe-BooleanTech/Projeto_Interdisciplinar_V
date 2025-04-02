import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { styles } from './_layout';
import { Link, router } from 'expo-router';
import images from '../../assets';
import { createVehicle } from '@/src/services/vehicleService'; // Importa a função para registrar veículo

const VehicleRegisterScreen = ({ userId }: { userId: string }) => {
  const [form, setForm] = useState({
    plate: '',
    model: '',
    color: '',
    manufacturer: '',
    type: '',
    description: '',
    year: '',
    km: '',
    fuelType: '',
    fuelCapacity: '',
    fuelConsumption: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    if (!form.plate || !form.model || !form.manufacturer || !form.year || !form.km || !form.fuelType) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    try {
      setLoading(true);

      // Convertendo valores numéricos antes de enviar
      const vehicleData = {
        ...form,
        year: parseInt(form.year, 10),
        km: parseFloat(form.km),
        fuelCapacity: parseFloat(form.fuelCapacity),
        fuelConsumption: parseFloat(form.fuelConsumption),
      };

      await createVehicle(userId, vehicleData); // Chama a API para registrar veículo
      Alert.alert('Sucesso', 'Veículo cadastrado com sucesso!');
      router.push('/Home'); // Redireciona para a tela principal
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao cadastrar veículo. Tente novamente.');
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
          <Link href="/">Voltar</Link>
          <Text style={styles.title}>Cadastro de Veículo</Text>

          <View style={styles.field}>
            <Text>Placa</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite a placa..."
                value={form.plate}
                onChangeText={(value) => handleChange('plate', value)}
            />
          </View>

          <View style={styles.field}>
            <Text>Modelo</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o modelo..."
                value={form.model}
                onChangeText={(value) => handleChange('model', value)}
            />
          </View>

          <View style={styles.field}>
            <Text>Cor</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite a cor..."
                value={form.color}
                onChangeText={(value) => handleChange('color', value)}
            />
          </View>

          <View style={styles.field}>
            <Text>Fabricante</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o fabricante..."
                value={form.manufacturer}
                onChangeText={(value) => handleChange('manufacturer', value)}
            />
          </View>

          <View style={styles.field}>
            <Text>Ano</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Digite o ano..."
                value={form.year}
                onChangeText={(value) => handleChange('year', value)}
            />
          </View>

          <View style={styles.field}>
            <Text>KM Atual</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Digite a quilometragem..."
                value={form.km}
                onChangeText={(value) => handleChange('km', value)}
            />
          </View>

          <View style={styles.field}>
            <Text>Tipo de Combustível</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o tipo de combustível..."
                value={form.fuelType}
                onChangeText={(value) => handleChange('fuelType', value)}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleRegister} disabled={loading}>
            <Text style={styles.loginButtonText}>{loading ? 'Cadastrando...' : 'Cadastrar Veículo'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
};

export default VehicleRegisterScreen;
