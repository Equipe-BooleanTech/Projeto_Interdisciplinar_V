import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { styles } from './_layout';

// Sin componentes separados! No olvidar separar los componentes!
const App = () => {
  const [isChecked, setIsChecked] = useState(false); // checkbox (necesita mejores ajustes)

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={require('../../assets/images/car-icon.png')} style={styles.icon} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.subtitle}>Não tem uma conta? <Text style={styles.signupText}>Cadastre-se.</Text></Text>

        <TextInput
          style={styles.input}
          placeholder="Digite um e-mail válido..."
          placeholderTextColor="#a1a1a1"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha..."
          placeholderTextColor="#a1a1a1"
          secureTextEntry
        />
        
        <View style={styles.checkboxContainer}>
          <TouchableOpacity style={[styles.checkbox, isChecked && styles.checkboxChecked]} onPress={toggleCheckbox}>
            {isChecked && <Text style={styles.checkmark}>✔</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Lembrar credenciais?</Text>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OU</Text>

        <TouchableOpacity style={styles.googleButton}>
          {/* necesita imagen de google icon */}
          <Text style={styles.googleButtonText}>Continuar com o Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.phoneButton}>
          {/* necesita imagen de smartphone */}
          <Text style={styles.phoneButtonText}>Continuar com telefone</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default App;