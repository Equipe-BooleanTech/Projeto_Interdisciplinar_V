export interface HeaderProps {
    title: string;
    onBackPress?: () => void;
    onSearchPress?: (route: string) => void;
    onNotificationPress?: () => void;
    showBackButton?: boolean;
    showSearchButton?: boolean;
    showNotificationButton?: boolean;
    notificationCount?: number;
  }