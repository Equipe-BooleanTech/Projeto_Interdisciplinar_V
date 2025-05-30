import React from 'react';
import { HeaderProps } from './Header.interface';
import {
    HeaderContainer,
    LeftContainer,
    BackButton,
    Title,
    RightContainer,
    IconButton,
    NotificationBadge,
    NotificationText,
} from './Header.styles';
import { Feather, Ionicons } from '@expo/vector-icons';

const Header: React.FC<HeaderProps> = ({
    title,
    onBackPress,
    onSearchPress,
    onNotificationPress,
    showBackButton = true,
    showSearchButton = true,
    showNotificationButton = true,
    notificationCount = 0,
}) => {
    return (
        <HeaderContainer>
            <LeftContainer>
                {showBackButton && (
                    <BackButton onPress={onBackPress}>
                        <Feather name="arrow-left" size={24} color="#333333" />
                    </BackButton>
                )}
                <Title numberOfLines={1}>{title}</Title>
            </LeftContainer>

            <RightContainer>
                {showSearchButton && (
                    <IconButton onPress={onSearchPress}>
                        <Feather name="search" size={22} color="#333333" />
                    </IconButton>
                )}
                {showNotificationButton && (
                    <IconButton onPress={onNotificationPress}>
                        <Ionicons name="notifications-outline" size={22} color="#333333" />
                        {notificationCount > 0 && (
                            <NotificationBadge>
                                <NotificationText>
                                    {notificationCount > 9 ? '9+' : notificationCount}
                                </NotificationText>
                            </NotificationBadge>
                        )}
                    </IconButton>
                )}
            </RightContainer>
        </HeaderContainer>
    );
};

export default Header;