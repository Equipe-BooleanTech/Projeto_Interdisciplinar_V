import React from 'react';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NotificationItem, NotificationScreenProps } from './Notification.interface';
import {
    Container,
    Header,
    HeaderTitle,
    MarkAllButton,
    MarkAllText,
    NotificationList,
    NotificationItemContainer,
    NotificationContent,
    NotificationTitle,
    NotificationMessage,
    NotificationTime,
    EmptyState,
    EmptyStateText,
} from './Notification.styles';
import { theme } from '@/theme';
import { Header as MobileHeader } from '@/src/components';
import { router } from 'expo-router';

const NotificationScreen: React.FC<NotificationScreenProps> = ({
    notifications,
    onNotificationPress,
    onMarkAllAsRead,
}) => {
    const renderItem = ({ item }: { item: NotificationItem }) => (
        <NotificationItemContainer
            onPress={() => onNotificationPress(item.id)}
            isRead={item.isRead}
            type={item.type}
        >
            {item.type === 'message' && <Ionicons name="chatbubble-outline" size={24} color={theme.colors.green} />}
            {item.type === 'system' && <MaterialIcons name="info-outline" size={24} color={theme.colors.brown} />}
            {item.type === 'alert' && <Ionicons name="alert-circle-outline" size={24} color={theme.colors.danger} />}

            <NotificationContent>
                <NotificationTitle isRead={item.isRead}>{item.title}</NotificationTitle>
                <NotificationMessage>{item.message}</NotificationMessage>
                <NotificationTime>{item.time}</NotificationTime>
            </NotificationContent>

            {!item.isRead && <Feather name="circle" size={8} color="#454F2C" />}
        </NotificationItemContainer>
    );

    return (
        <Container>
            <MobileHeader
                title="Minha Conta"
                onBackPress={() => router.back()}
                onNotificationPress={() => router.push('/notifications')}
                notificationCount={5}
            />
            <Header>
                <HeaderTitle>Notificações</HeaderTitle>
                {notifications.length > 0 && (
                    <MarkAllButton onPress={onMarkAllAsRead}>
                        <MarkAllText>Mark all as read</MarkAllText>
                    </MarkAllButton>
                )}
            </Header>

            {notifications.length === 0 ? (
                <EmptyState>
                    <Ionicons name="notifications-off-outline" size={48} color="#cccccc" />
                    <EmptyStateText>No notifications yet</EmptyStateText>
                </EmptyState>
            ) : (
                <NotificationList
                    data={notifications}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </Container>
    );
};

export default NotificationScreen;