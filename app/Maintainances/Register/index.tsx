import React, { useEffect, useState } from 'react';
import { Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { styles } from './_layout';
import { router } from 'expo-router';
import { Alert as CustomAlert, Button, Form, Header } from '@/src/components';
import { FormHelpers } from '@/src/components/Form';
import { useForm } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { useStorage } from '@/src/hooks';
import { createMaintainance } from '@/src/services/maintainances';

const MaintenanceCreateScreen = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState({
        visible: false,
        message: '',
        title: '',
    });

    const { getItem } = useStorage();

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    useEffect(() => {
        const fetchVehicleId = async () => {
            try {
                const vehicleId = await getItem('vehicleId');
                if (vehicleId) {
                    setValue('vehicleId', vehicleId);
                }
            } catch (error) {
                console.error('Error fetching vehicle ID:', error);
            }
        };
        fetchVehicleId();
    }, [getItem, setValue]);

       const onSubmit = async (formData: any) => {
        setIsSubmitting(true);
        try {
            // Parse dates from DD/MM/YYYY to ISO string
            let formattedDate = null;
            let formattedNextDueDate = null;
    
            // Required date field (main date)
            if (formData.date) {
                const [day, month, year] = formData.date.split('/');
                if (day && month && year) {
                    // Create date using YYYY-MM-DD format to avoid timezone issues
                    formattedDate = new Date(`${year}-${month}-${day}T12:00:00`);
                    
                    // Check if date is valid before converting to ISO
                    if (isNaN(formattedDate.getTime())) {
                        throw new Error('Data da manutenção inválida');
                    }
                    
                    formattedDate = formattedDate.toISOString();
                } else {
                    throw new Error('Formato de data inválido (DD/MM/AAAA)');
                }
            } else {
                throw new Error('Data da manutenção é obrigatória');
            }
    
            // Optional date field (next due date)
            if (formData.nextDueDate) {
                const [nextDay, nextMonth, nextYear] = formData.nextDueDate.split('/');
                if (nextDay && nextMonth && nextYear) {
                    // Create date using YYYY-MM-DD format
                    formattedNextDueDate = new Date(`${nextYear}-${nextMonth}-${nextDay}T12:00:00`);
                    
                    // Check if date is valid
                    if (isNaN(formattedNextDueDate.getTime())) {
                        throw new Error('Data da próxima manutenção inválida');
                    }
                    
                    formattedNextDueDate = formattedNextDueDate.toISOString();
                } else {
                    throw new Error('Formato de data da próxima manutenção inválido');
                }
            }
    
            const maintenanceData = {
                vehicleId: formData.vehicleId,
                date: formattedDate ? new Date(formattedDate).toISOString() : null,
                odometer: parseFloat(formData.odometer) * 1000 || 0,
                type: formData.type.trim(),
                description: formData.description?.trim() || null,
                cost: formData.cost ? parseFloat(formData.cost) : null,
                workshopName: formData.workshopName?.trim() || null,
                nextDueDate: formattedNextDueDate ? new Date(formattedNextDueDate).toISOString() : null,
                nextDueOdometer: formData.nextDueOdometer ? parseFloat(formData.nextDueOdometer) : null,
            };
            const storedVehicleId = await getItem('vehicleId');
    
            const response = await createMaintainance(storedVehicleId || '', maintenanceData);
    
            reset();
            setModal({
                visible: true,
                message: response?.message || 'Manutenção cadastrada com sucesso!',
                title: 'Sucesso',
            });
        } catch (error: any) {
            console.error('Error creating maintenance:', error);
            setModal({
                visible: true,
                message: error?.message || error?.response?.data?.message || 'Erro ao cadastrar manutenção',
                title: 'Erro',
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <ProtectedRoute>
            <Header
                title="Nova Manutenção"
                onBackPress={() => router.back()}
            />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Form.Root controlled>
                        <Text style={styles.title}>Cadastrar Nova Manutenção</Text>

                        {FormHelpers.createFormFields({
                            control,
                            fields: [
                                {
                                    name: 'date',
                                    type: 'textfield',
                                    rules: {
                                        required: 'Data da manutenção é obrigatória',
                                    },
                                    label: 'Data da Manutenção',
                                    placeholder: 'DD/MM/AAAA',
                                    errorMessage: errors.date?.message,
                                    componentProps: {
                                        onChangeText: (text: string) => setValue('date', text),
                                        leftIcon: <MaterialIcons name="date-range" size={20} color="#666" />,
                                        keyboardType: 'numeric',
                                        mask: 'date',
                                    },
                                },
                                {
                                    name: 'odometer',
                                    type: 'textfield',
                                    rules: {
                                        required: 'Quilometragem é obrigatória',
                                    },
                                    label: 'Quilometragem',
                                    placeholder: 'Digite a quilometragem...',
                                    errorMessage: errors.odometer?.message,
                                    componentProps: {
                                        onChangeText: (text: string) => setValue('odometer', text),
                                        keyboardType: 'numeric',
                                        leftIcon: <MaterialIcons name="speed" size={20} color="#666" />,
                                        mask: 'number',
                                    },
                                },
                                {
                                    name: 'type',
                                    type: 'textfield',
                                    rules: {
                                        required: 'Tipo de manutenção é obrigatório',
                                        minLength: {
                                            value: 3,
                                            message: 'Mínimo de 3 caracteres',
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: 'Máximo de 100 caracteres',
                                        },
                                    },
                                    label: 'Tipo de Manutenção',
                                    placeholder: 'Ex: Troca de óleo, revisão...',
                                    errorMessage: errors.type?.message,
                                    componentProps: {
                                        onChangeText: (text: string) => setValue('type', text),
                                        leftIcon: <MaterialIcons name="build" size={20} color="#666" />,
                                    },
                                },
                                {
                                    name: 'description',
                                    type: 'textfield',
                                    rules: {
                                        maxLength: {
                                            value: 1000,
                                            message: 'Máximo de 1000 caracteres',
                                        },
                                    },
                                    label: 'Descrição',
                                    placeholder: 'Detalhes da manutenção...',
                                    errorMessage: errors.description?.message,
                                    componentProps: {
                                        onChangeText: (text: string) => setValue('description', text),
                                        multiline: true,
                                        numberOfLines: 4,
                                        leftIcon: <MaterialIcons name="description" size={20} color="#666" />,
                                    },
                                },
                                {
                                    name: 'cost',
                                    type: 'textfield',
                                    rules: {
                                        pattern: {
                                            value: /^\d+(\.\d{1,2})?$/,
                                            message: 'Formato inválido (ex: 250.50)',
                                        },
                                    },
                                    label: 'Custo (R$)',
                                    placeholder: 'Digite o valor...',
                                    errorMessage: errors.cost?.message,
                                    componentProps: {
                                        onChangeText: (text: string) => setValue('cost', text),
                                        keyboardType: 'decimal-pad',
                                        leftIcon: <MaterialIcons name="attach-money" size={20} color="#666" />,
                                        mask: 'number',
                                    },
                                },
                                {
                                    name: 'workshopName',
                                    type: 'textfield',
                                    rules: {
                                        maxLength: {
                                            value: 100,
                                            message: 'Máximo de 100 caracteres',
                                        },
                                    },
                                    label: 'Oficina',
                                    placeholder: 'Nome da oficina...',
                                    errorMessage: errors.workshopName?.message,
                                    componentProps: {
                                        onChangeText: (text: string) => setValue('workshopName', text),
                                        leftIcon: <MaterialIcons name="home-repair-service" size={20} color="#666" />,
                                    },
                                },
                                {
                                    name: 'nextDueDate',
                                    type: 'textfield',
                                    label: 'Próxima Manutenção (Data)',
                                    placeholder: 'DD/MM/AAAA',
                                    errorMessage: errors.nextDueDate?.message,
                                    componentProps: {
                                        onChangeText: (text: string) => setValue('nextDueDate', text),
                                        leftIcon: <MaterialIcons name="event-available" size={20} color="#666" />,
                                        keyboardType: 'numeric',
                                        mask: 'date',
                                    },
                                },
                                {
                                    name: 'nextDueOdometer',
                                    type: 'textfield',
                                    rules: {
                                        pattern: {
                                            value: /^\d+$/,
                                            message: 'Apenas números são permitidos',
                                        },
                                    },
                                    label: 'Próxima Manutenção (Km)',
                                    placeholder: 'Quilometragem prevista...',
                                    errorMessage: errors.nextDueOdometer?.message,
                                    componentProps: {
                                        onChangeText: (text: string) => setValue('nextDueOdometer', text),
                                        keyboardType: 'numeric',
                                        leftIcon: <MaterialIcons name="speed" size={20} color="#666" />,
                                    },
                                },
                            ],
                        })}

                        <Button
                            variant="primary"
                            onPress={handleSubmit(onSubmit)}
                            full
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Manutenção'}
                        </Button>
                    </Form.Root>

                    {modal.visible && (
                        <CustomAlert
                            isVisible={modal.visible}
                            title={modal.title}
                            message={modal.message}
                            onConfirm={() => {
                                setModal({ ...modal, visible: false });
                                if (modal.title === 'Sucesso') {
                                    router.back();
                                }
                            }}
                            confirmText="OK"
                        />
                    )}
                </ScrollView>
            </SafeAreaView>
        </ProtectedRoute>
    );
};

export default MaintenanceCreateScreen;