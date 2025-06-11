import { useCallback, useEffect, useState } from "react";
import { MaintainanceManagement as MaintainanceManagementScreen } from "@/src/screens";
import React from "react";
import { Alert, Header } from "@/src/components";
import { router } from "expo-router";
import { useStorage } from "@/src/hooks";
import { MaintainanceDTO } from "./MaintainanceManagement.interface";
import { getMaintainances } from "@/src/services/maintainances";


const MaintainanceManagement = () => {
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
    const [maintainanceRecords, setMaintainanceRecords] = useState<MaintainanceDTO[]>([]);
    
    const handleAddMaintainance = useCallback(() => {
        // Navigate to the Add Maintainance screen with the vehicleId
        router.push(`/Maintainances/Register`);
    }, []);

       useEffect(() => {
        const fetchMaintainanceRecords = async () => {
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
                
                const response = await getMaintainances(vehicleId);
                console.log('Fetched Maintainance Records:', response);
                
                // Check if response has content array and set records
                if (response && response.content) {
                    setMaintainanceRecords(response.content);
                    
                    // Check content length directly
                    if (response.content.length === 0) {
                        setModal({
                            visible: true,
                            title: 'Nenhum Registro',
                            message: 'Nenhum registro de manutenção encontrado.',
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching maintainance records:', error);
                setModal({
                    visible: true,
                    title: 'Erro',
                    message: 'Não foi possível carregar os registros de manutenção.',
                });
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchMaintainanceRecords();
    }, []); 
    return (
        <>
            <Header
                title="Gestão de Manutenções"
                onBackPress={() => { router.back() }}
            />
            
            <MaintainanceManagementScreen
                maintainanceRecords={maintainanceRecords}
                isLoading={isLoading}
                onAddMaintainance={handleAddMaintainance}
            />
            {modal.visible && (
                <Alert
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

export default MaintainanceManagement;