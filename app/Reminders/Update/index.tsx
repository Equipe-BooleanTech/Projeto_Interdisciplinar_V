import React, { useState } from 'react';
import { Text, ScrollView, SafeAreaView } from 'react-native';
import { styles } from './_layout';
import { router } from 'expo-router';
import { Alert as CustomAlert, Button, Form, Header } from '@/src/components';
import { FormHelpers } from '@/src/components/Form';
import { useForm } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { useStorage } from '@/src/hooks';
import { createReminder } from '@/src/services/reminders';

const ReminderCreateScreen = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState({
        visible: false,
        message: '',
        title: '',
    });

    const { getItem } = useStorage();
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    const onSubmit = async (formData: any) => {
        setIsSubmitting(true);
        try {
            // Date parsing
            const [day, month, year] = formData.dueDate.split('/');
            const formattedDueDate = new Date(`${year}-${month}-${day}T12:00:00`).toISOString();

            const reminderData = {
                title: formData.title.trim(),
                description: formData.description?.trim() || null,
                type: formData.type,
                dueDate: formattedDueDate,
                antecedenceDays: parseInt(formData.antecedenceDays) || 0,
                isRecurring: formData.isRecurring || false,
            };

            const vehicleId = await getItem('vehicleId');
            const userId = await getItem('userId');
            await createReminder(vehicleId || '', userId || '', reminderData);

            reset();
            setModal({
                visible: true,
                message: 'Lembrete criado com sucesso!',
                title: 'Sucesso',
            });
        } catch (error: any) {
            setModal({
                visible: true,
                message: error?.message || 'Erro ao criar lembrete',
                title: 'Erro',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const reminderTypeOptions = [
        { label: 'Manutenção', value: 'MAINTENANCE' },
        { label: 'Documento', value: 'DOCUMENT' },
        { label: 'Seguro', value: 'INSURANCE' },
        { label: 'Licenciamento', value: 'LICENSING' },
        { label: 'Outro', value: 'OTHER' },
    ];

    return (
        <ProtectedRoute>
            <Header title="Novo Lembrete" onBackPress={() => router.back()} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Form.Root controlled>
                        <Text style={styles.title}>Criar Novo Lembrete</Text>

                        {FormHelpers.createFormFields({
                            control,
                            fields: [
                                {
                                    name: 'title',
                                    type: 'textfield',
                                    rules: {
                                        required: 'Título é obrigatório',
                                        minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                                        maxLength: { value: 100, message: 'Máximo 100 caracteres' }
                                    },
                                    label: 'Título',
                                    placeholder: 'Ex: Troca de óleo',
                                    errorMessage: errors.title?.message,
                                    componentProps: {
                                        leftIcon: <MaterialIcons name="title" size={20} color="#666" />
                                    }
                                },
                                {
                                    name: 'description',
                                    type: 'textfield',
                                    rules: { maxLength: { value: 500, message: 'Máximo 500 caracteres' } },
                                    label: 'Descrição (Opcional)',
                                    placeholder: 'Detalhes...',
                                    errorMessage: errors.description?.message,
                                    componentProps: {
                                        multiline: true,
                                        leftIcon: <MaterialIcons name="description" size={20} color="#666" />
                                    }
                                },
                                {
                                    name: 'type',
                                    type: 'select',
                                    rules: { required: 'Tipo é obrigatório' },
                                    label: 'Tipo',
                                    options: reminderTypeOptions,
                                    errorMessage: errors.type?.message
                                },
                                {
                                    name: 'dueDate',
                                    type: 'textfield',
                                    rules: {
                                        required: 'Data é obrigatória',
                                        pattern: { value: /^\d{2}\/\d{2}\/\d{4}$/, message: 'DD/MM/AAAA' }
                                    },
                                    label: 'Data de Vencimento',
                                    placeholder: 'DD/MM/AAAA',
                                    errorMessage: errors.dueDate?.message,
                                    componentProps: {
                                        mask: 'date',
                                        leftIcon: <MaterialIcons name="event" size={20} color="#666" />
                                    }
                                },
                                {
                                    name: 'antecedenceDays',
                                    type: 'textfield',
                                    label: 'Dias de Antecedência',
                                    placeholder: '0',
                                    componentProps: {
                                        keyboardType: 'numeric',
                                        leftIcon: <MaterialIcons name="notifications" size={20} color="#666" />
                                    }
                                },
                                {
                                    name: 'isRecurring',
                                    type: 'switch',
                                    label: 'Recorrente?'
                                }
                            ]
                        })}

                        <Button
                            variant="primary"
                            onPress={handleSubmit(onSubmit)}
                            full
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Criando...' : 'Criar Lembrete'}
                        </Button>
                    </Form.Root>

                    {modal.visible && (
                        <CustomAlert
                            isVisible={modal.visible}
                            title={modal.title}
                            message={modal.message}
                            onConfirm={() => {
                                setModal({ ...modal, visible: false });
                                if (modal.title === 'Sucesso') router.back();
                            }}
                        />
                    )}
                </ScrollView>
            </SafeAreaView>
        </ProtectedRoute>
    );
};

export default ReminderCreateScreen;