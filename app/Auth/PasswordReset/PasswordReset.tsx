import React, { useState } from 'react';
import { Text, ScrollView, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { styles } from './_layout';
import { router } from 'expo-router';
import { Button, Form, Header } from '@/src/components';
import { FormHelpers } from '@/src/components/Form';
import { useForm } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { theme } from '@/theme';

const ResetPasswordScreen = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    const password = watch('password');

    const onSubmit = async (formData: any) => {
        setIsSubmitting(true);
        try {
            Alert.alert('Sucesso', 'Sua senha foi redefinida com sucesso!', [
                {
                    text: 'OK',
                    onPress: () => router.replace('/Auth/Login'),
                },
            ]);
        } catch (error: any) {
            console.error('Error resetting password:', error);
            Alert.alert(
                'Erro',
                error?.message || 'Ocorreu um erro ao redefinir sua senha. Por favor, tente novamente.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ProtectedRoute>
            <Header title="Redefinir Senha" onBackPress={() => router.back()} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Form.Root controlled>
                        <Text style={styles.title}>Redefina sua senha</Text>
                        <Text style={{ marginBottom: 24, color: theme.colors.text }}>
                            Por favor, insira sua nova senha abaixo.
                        </Text>

                        {FormHelpers.createFormFields({
                            control,
                            fields: [
                                {
                                    name: 'token',
                                    type: 'textfield',
                                    rules: {
                                        required: 'Código de verificação é obrigatório',
                                    },
                                    label: 'Código de Verificação',
                                    placeholder: 'Digite o código recebido...',
                                    errorMessage: errors.token?.message,
                                    componentProps: {
                                        leftIcon: <MaterialIcons name="vpn-key" size={20} color="#666" />,
                                    },
                                },
                                {
                                    name: 'password',
                                    type: 'textfield',
                                    rules: {
                                        required: 'Senha é obrigatória',
                                        minLength: {
                                            value: 8,
                                            message: 'A senha deve ter no mínimo 8 caracteres',
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message:
                                                'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais',
                                        },
                                    },
                                    label: 'Nova Senha',
                                    placeholder: 'Digite sua nova senha...',
                                    errorMessage: errors.password?.message,
                                    componentProps: {
                                        secureTextEntry: !showPassword,
                                        leftIcon: <MaterialIcons name="lock" size={20} color="#666" />,
                                        rightIcon: (
                                            <MaterialIcons
                                                name={showPassword ? 'visibility-off' : 'visibility'}
                                                size={20}
                                                color="#666"
                                                onPress={() => setShowPassword(!showPassword)}
                                            />
                                        ),
                                    },
                                },
                                {
                                    name: 'confirmPassword',
                                    type: 'textfield',
                                    rules: {
                                        required: 'Confirmação de senha é obrigatória',
                                        validate: (value) => value === password || 'As senhas não coincidem',
                                    },
                                    label: 'Confirmar Nova Senha',
                                    placeholder: 'Confirme sua nova senha...',
                                    errorMessage: errors.confirmPassword?.message,
                                    componentProps: {
                                        secureTextEntry: !showConfirmPassword,
                                        leftIcon: <MaterialIcons name="lock" size={20} color="#666" />,
                                        rightIcon: (
                                            <MaterialIcons
                                                name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                                                size={20}
                                                color="#666"
                                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                            />
                                        ),
                                    },
                                },
                            ],
                        })}

                        <Button variant="primary" onPress={handleSubmit(onSubmit)} full disabled={isSubmitting}>
                            {isSubmitting ? <ActivityIndicator color="#fff" /> : 'Redefinir Senha'}
                        </Button>
                    </Form.Root>
                </ScrollView>
            </SafeAreaView>
        </ProtectedRoute>
    );
};

export default ResetPasswordScreen;
