import React, { useState } from 'react';
import { Notification } from '@/src/screens';
import type { NotificationType } from '@/src/screens/Notification/Notification.interface';

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
            title: 'System update',
            message: 'A new version of the app is available',
            time: '1 hour ago',
            isRead: true,
            type: 'system' as NotificationType
        },
        {
            id: '3',
            title: 'Alert',
            message: 'Your storage is almost full',
            time: '3 hours ago',
            isRead: false,
            type: 'alert' as NotificationType
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
        <Notification
            notifications={notifications}
            onNotificationPress={handleNotificationPress}
            onMarkAllAsRead={handleMarkAllAsRead}
        />
    );
}

export default Notifications;