export type NotificationType = "message" | "system" | "alert";

export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    type: NotificationType;
}

export interface NotificationScreenProps {
    notifications: NotificationItem[];
    onNotificationPress: (id: string) => void;
    onMarkAllAsRead: () => void;
  }