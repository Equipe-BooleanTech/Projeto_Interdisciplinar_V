import { useCallback, useEffect, useState } from "react";
import {  } from "@/src/screens";
import React from "react";
import { Alert } from "react-native";
import { Header } from "@/src/components";
import { router } from "expo-router";
import { useStorage } from "@/src/hooks";
import { Alert as CustomAlert } from "@/src/components";
import { ReminderDTO, ReminderStatus, ReminderType } from "./RemindersManagement.interface";
import { getAllReminders, getRemindersByDateRange } from "@/src/services/reminders";
import {ReminderManagement as ReminderManagementScreen} from "@/src/screens";

const ReminderManagement = () => {
    const [modal, setModal] = useState<{
        visible: boolean;
        message: string;
        title: string;
    }>({
        visible: false,
        message: '',
        title: '',
    });

    const { getItem } = useStorage();
    const [isLoading, setIsLoading] = useState(false);
    const [reminderRecords, setReminderRecords] = useState<ReminderDTO[]>([]);

    const handleAddReminder = useCallback(() => {
        // Navigate to the Add Reminder screen with the vehicleId
        router.push(`/Reminders/Register`);
    }, []);


    useEffect(() => {
        const fetchReminderRecords = async () => {
            setIsLoading(true);
            try {
                const vehicleId = await getItem('vehicleId');
                if (!vehicleId) {
                    setModal({
                        visible: true,
                        title: 'Erro',
                        message: 'ID do veículo não encontrado.',
                    });
                    return;
                }
    
                const response = await getAllReminders(vehicleId);

                if (!response || !response.content.length) {
                    setModal({
                        visible: true,
                        title: 'Nenhum lembrete encontrado',
                        message: 'Não há lembretes registrados para o veículo selecionado.',
                    });
                    return;
                }
                
                console.log('Fetched Reminder Records:', response);
    
                // Rest of the code remains the same
                if (response && response.content) {
                    setReminderRecords(response.content);
    
                    if (response.content.length === 0) {
                        setModal({
                            visible: true,
                            title: 'Nenhum lembrete encontrado',
                            message: 'Não há lembretes registrados para o período selecionado.',
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching reminder records:', error);
                Alert.alert(
                    'Erro',
                    'Ocorreu um erro ao buscar os lembretes. Por favor, tente novamente mais tarde.',
                    [{ text: 'OK', onPress: () => setModal({ visible: false, title: '', message: '' }) }]
                )
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchReminderRecords();
    }, []);
    return (
        <>
            <Header
                title="Gestão de Lembretes"
                onBackPress={() => { router.back() }}
            />

            <ReminderManagementScreen
                reminderRecords={reminderRecords}
                isLoading={isLoading}
                onAddReminder={handleAddReminder}
            />
            {modal.visible && (
                <CustomAlert
                    isVisible={modal.visible}
                    title={modal.title}
                    message={modal.message}
                    onConfirm={() => setModal({ ...modal, visible: false })}
                    onCancel={() => setModal({ ...modal, visible: false })}
                />
            )}
        </>
    );
};

export default ReminderManagement;