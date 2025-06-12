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
import { resetPassword } from '@/src/services';
import { useStorage } from '@/src/hooks';

const ChangePasswordScreen = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    const {getItem } = useStorage();

    const newPassword = watch('newPassword');

    const onSubmit = async (formData: any) => {
        const userId = await getItem('userId');
        setIsSubmitting(true);
        const passwordDto = {
            oldPassword: formData.currentPassword,
            newPassword: formData.newPassword,
        };
        try {
            const response = await resetPassword(userId as string, passwordDto);
            Alert.alert('Sucesso', 'Sua senha foi alterada com sucesso! Faça login novamente.', [
                {
                    text: 'OK',
                    onPress: () => {
                        router.push('/Auth/Login');
                    },
                },
            ]);
        } catch (error: any) {
            console.error('Error changing password:', error);
            Alert.alert(
                'Erro',
                error?.message || 'Ocorreu um erro ao alterar sua senha. Por favor, tente novamente.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ProtectedRoute>
            <Header title="Alterar Senha" onBackPress={() => router.back()} />
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.normalBackground, justifyContent: 'center' }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Form.Root controlled>
                        <Text style={styles.title}>Alterar senha</Text>
                        <Text style={{ marginBottom: 24, color: "#000" }}>
                            Por favor, insira sua senha atual e a nova senha.
                        </Text>
                        {FormHelpers.createFormFields({
                            control,
                            fields: [
                                {
                                    name: 'currentPassword',
                                    type: 'textfield',
                                    rules: {
                                        required: 'Senha atual é obrigatória',
                                    },
                                    label: 'Senha Atual',
                                    placeholder: 'Digite sua senha atual...',
                                    errorMessage: errors.currentPassword?.message,
                                    componentProps: {
                                        secureTextEntry: !showCurrentPassword,
                                        leftIcon: <MaterialIcons name="lock" size={20} color="#666" />,
                                        rightIcon: (
                                            <MaterialIcons
                                                name={showCurrentPassword ? 'visibility-off' : 'visibility'}
                                                size={20}
                                                color="#666"
                                                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                                            />
                                        ),
                                    },
                                },
                                {
                                    name: 'newPassword',
                                    type: 'textfield',
                                    rules: {
                                        required: 'Nova senha é obrigatória',
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
                                    errorMessage: errors.newPassword?.message,
                                    componentProps: {
                                        secureTextEntry: !showNewPassword,
                                        leftIcon: <MaterialIcons name="lock" size={20} color="#666" />,
                                        rightIcon: (
                                            <MaterialIcons
                                                name={showNewPassword ? 'visibility-off' : 'visibility'}
                                                size={20}
                                                color="#666"
                                                onPress={() => setShowNewPassword(!showNewPassword)}
                                            />
                                        ),
                                    },
                                },
                                {
                                    name: 'confirmNewPassword',
                                    type: 'textfield',
                                    rules: {
                                        required: 'Confirmação de senha é obrigatória',
                                        validate: (value) => value === newPassword || 'As senhas não coincidem',
                                    },
                                    label: 'Confirmar Nova Senha',
                                    placeholder: 'Confirme sua nova senha...',
                                    errorMessage: errors.confirmNewPassword?.message,
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
                            {isSubmitting ? <ActivityIndicator color="#fff" /> : 'Alterar Senha'}
                        </Button>
                    </Form.Root>
                </ScrollView>
            </SafeAreaView>
        </ProtectedRoute>
    );
};

export default ChangePasswordScreen;