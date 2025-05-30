import React, { useState } from 'react';
import { Notification } from '@/src/screens';
import type { NotificationType } from '@/src/screens/Notification/Notification.interface';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            title: 'Nova Manutenção Programada',
            message: 'O seu veículo de placa ABC-1234 está agendado para manutenção amanhã às 10:00.',
            time: '2 minutos atrás',
            isRead: false,
            type: 'message' as NotificationType
        },
        {
            id: '2',
            title: 'Atualização de Software Disponível',
            message: 'Uma nova atualização de software está disponível para o seu veículo. Por favor, conecte-se ao Wi-Fi para baixar.',
            time: '1 hora atrás',
            isRead: false,
            type: 'update' as NotificationType
        },
        {
            id: '3',
            title: 'Lembrete de Revisão',
            message: 'Seu veículo precisa de uma revisão completa em breve. Agende uma visita ao nosso centro de serviços.',
            time: '3 horas atrás',
            isRead: true,
            type: 'reminder' as NotificationType
        },
        {
            id: '4',
            title: 'Promoção Especial',
            message: 'Aproveite nossa promoção especial de combustível com 20% de desconto até o final do mês.',
            time: '1 dia atrás',
            isRead: false,
            type: 'promotion' as NotificationType
        }
    ]);

    const handleNotificationPress = (id: string) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, isRead: true } : notification
        ));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(notification => ({
            ...notification,
            isRead: true
        })));
    };

    return (
        <ProtectedRoute>
            <Notification
                notifications={notifications}
                onNotificationPress={handleNotificationPress}
                onMarkAllAsRead={handleMarkAllAsRead}
            />
        </ProtectedRoute>
    );
}

export default Notifications;