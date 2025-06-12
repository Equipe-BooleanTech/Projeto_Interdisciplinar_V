import React, { useEffect, useState } from 'react';
import { Notification } from '@/src/screens';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { getAllReminders, listVehicles } from '@/src/services';
import { useStorage } from '@/src/hooks';

const Notifications = () => {
    const [loading, setLoading] = useState(true);
    const [vehicles, setVehicles] = useState<string[]>([]);

    const { getItem } = useStorage();

    const [notifications, setNotifications] = useState<NotificationType[]>([]);

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

    const formatDate = (date: number[]) => {
        // date: "dueDate":[2025,6,12]
        if (!date || date.length < 3) return 'Data inválida';
        const [year, month, day] = date;
        const formattedDate = new Date(year, month - 1, day);
        return formattedDate.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };
    

    useEffect(() => {
        const fetchVehiclesIds = async () => {
            try {
                setLoading(true);
                const userId = await getItem('userId');

                if (!userId) {
                    console.error("No user ID found");
                    setLoading(false);
                    return;
                }

                const response = await listVehicles(userId);

                if (!response || !response.content) {
                    console.error("Invalid vehicle response", response);
                    setLoading(false);
                    return;
                }

                const vehicleIds = response.content.map(vehicle => vehicle.id);
                setVehicles(vehicleIds);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehiclesIds();
    }, []);
    useEffect(() => {
        const fetchReminders = async () => {
            try {
                if (vehicles.length === 0) return;

                setLoading(true);
                const userId = await getItem('userId');

                if (!userId) {
                    console.error("No user ID found");
                    setLoading(false);
                    return;
                }

                let allNotifications = [];

                for (const vehicleId of vehicles) {
                    try {
                        const response = await getAllReminders(vehicleId, userId);


                        const reminders = response?.content || response?.data || response;

                        if (!reminders || !Array.isArray(reminders) || reminders.length === 0) {
                            continue;
                        }

                        const reminderNotifications = reminders.map(reminder => ({
                            id: reminder.id || `reminder-${Math.random().toString(36).substr(2, 9)}`,
                            title: reminder.title || 'Lembrete',
                            message: reminder.description || reminder.message || 'Detalhes não disponíveis',
                            time: reminder.dueDate ? formatDate(reminder.dueDate) : 'Data não especificada',
                            isRead: false,
                            type: 'reminder'
                        }));

                        allNotifications = [...allNotifications, ...reminderNotifications];
                    } catch (error) {
                        console.error(`Error fetching reminders for vehicle ${vehicleId}:`, error);
                    }
                }

                setNotifications(allNotifications);

            } catch (error) {
                console.error("Error in fetchReminders:", error);
            } finally {
                setLoading(false);
            }
        };

        if (vehicles.length > 0) {
            fetchReminders();
        }
    }, [vehicles]);
    
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