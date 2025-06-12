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
import { listUsers, requestPasswordResetCode } from '@/src/services';

const EmailConfirmationScreen = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    type ForgotPasswordFormData = { email: string };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        mode: 'onBlur',
    });

    const onSubmit = async (formData: { email: string }) => {
        setIsSubmitting(true);
        try {
            const usersResponse = await listUsers();
            const user = usersResponse.data.content.find(
                (u: any) => u.email.toLowerCase() === formData.email.toLowerCase()
            );

            if (!user) {
                Alert.alert('Erro', 'Nenhum usuário encontrado com este e-mail.');
                return;
            }

            await requestPasswordResetCode(formData.email);

            setEmailSent(true);
            Alert.alert(
                'Código enviado',
                `Enviamos um código de verificação para ${formData.email}. Por favor, verifique sua caixa de entrada.`,
                [
                    {
                        text: 'OK',
                        onPress: () =>
                            router.push({
                                pathname: '/Auth/PasswordReset/PasswordReset',
                                params: {
                                    email: formData.email,
                                    userId: user.id,
                                },
                            }),
                    },
                ]
            );
        } catch (error: any) {
            console.error('Error in password reset flow:', error);
            console.log(error);
            Alert.alert(
                'Erro',
                error?.response?.data?.message ||
                'Não foi possível enviar o e-mail de verificação. Por favor, tente novamente.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ProtectedRoute>
            <Header title="Confirmar E-mail" onBackPress={() => router.back()} />
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.normalBackground }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Form.Root controlled>
                        <Text style={styles.title}>Redefinir Senha</Text>
                        <Text style={{ marginBottom: 24, color: theme.colors.text }}>
                            {emailSent
                                ? 'Verifique seu e-mail para continuar'
                                : 'Digite seu e-mail para receber um código de verificação'}
                        </Text>

                        {!emailSent &&
                            FormHelpers.createFormFields({
                                control,
                                fields: [
                                    {
                                        name: 'email',
                                        type: 'textfield',
                                        rules: {
                                            required: 'E-mail é obrigatório',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'E-mail inválido',
                                            },
                                        },
                                        label: 'E-mail',
                                        placeholder: 'Digite seu e-mail...',
                                        errorMessage: errors.email?.message,
                                        componentProps: {
                                            keyboardType: 'email-address',
                                            autoCapitalize: 'none',
                                            leftIcon: <MaterialIcons name="email" size={20} color="#666" />,
                                        },
                                    },
                                ],
                            })}

                        {!emailSent ? (
                            <Button
                                variant="primary"
                                onPress={handleSubmit(onSubmit)}
                                full
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <ActivityIndicator color="#fff" /> : 'Enviar Código'}
                            </Button>
                        ) : (
                            <Button
                                variant="secondary"
                                onPress={() =>
                                    router.push({
                                        pathname: '/Auth/PasswordReset/PasswordReset',
                                        params: {
                                            email: control._formValues.email,
                                            userId: (router.params as any)?.userId,
                                        },
                                    })
                                }
                                full
                            >
                                Continuar para Redefinição
                            </Button>
                        )}

                        {emailSent && (
                            <Button variant="primary" onPress={() => setEmailSent(false)} style={{ marginTop: 16 }}>
                                Reenviar código
                            </Button>
                        )}
                    </Form.Root>
                </ScrollView>
            </SafeAreaView>
        </ProtectedRoute>
    );
};

export default EmailConfirmationScreen;
