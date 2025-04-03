import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './_layout';
import { router } from 'expo-router';

const HomeScreen = () => {
    const handleRegisterVehicle = () => {
        // @ts-ignore
        router.push('/CadastroVeiculo'); // Redireciona para a tela de cadastro de veículo
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Você está logado!</Text>
            <Text style={styles.subtitle}>Agora você pode cadastrar seu veículo.</Text>

            <TouchableOpacity style={styles.loginButton} onPress={handleRegisterVehicle}>
                <Text style={styles.loginButtonText}>Cadastrar Veículo</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;
