import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from './_layout';
import { Link } from 'expo-router';
import images from '../../assets';
// Sin componentes separados! No olvidar separar los componentes!
const App = () => {
  const [isChecked, setIsChecked] = useState(false); // checkbox (necesita mejores ajustes)

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const logo = images.car;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={logo} style={styles.icon} />
      </View>

      <View style={styles.formContainer}>
        <Link href="/">Voltar</Link>
        <Text style={styles.title}>Cadastre-se</Text>

        <Text style={styles.subtitle}>
          Já possui uma conta?{' '}
          <Link style={styles.signupText} href="/Login">
            Faça o login.
          </Link>
        </Text>

        <View style={styles.field}>
          <Text>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome completo..."
            placeholderTextColor="#a1a1a1"
          />
        </View>

        <View style={styles.field}>
          <Text>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu endereço de e-mail..."
            keyboardType="email-address"
            placeholderTextColor="#a1a1a1"
          />
        </View>

        <View style={styles.field}>
          <Text>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua data de nascimento..."
            autoComplete="birthdate-full"
            keyboardType="numeric"
            placeholderTextColor="#a1a1a1"
          />
        </View>

        <View style={styles.field}>
          <Text>Número de Celular</Text>
          <TextInput
            style={styles.input}
            autoComplete="tel"
            placeholder="Digite seu número de celular..."
            placeholderTextColor="#a1a1a1"
          />
        </View>

        <View style={styles.field}>
          <Text>Crie uma senha</Text>
          <TextInput
            style={styles.input}
            autoComplete="password-new"
            placeholderTextColor="#a1a1a1"
            secureTextEntry
            placeholder="Digite uma senha..."
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

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default App;
