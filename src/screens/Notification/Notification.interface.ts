
export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    type: string;
}

export interface NotificationScreenProps {
    notifications: NotificationItem[];
    onNotificationPress: (id: string) => void;
    onMarkAllAsRead: () => void;
  }