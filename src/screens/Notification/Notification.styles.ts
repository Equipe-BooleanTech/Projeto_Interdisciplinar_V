import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { theme } from '@/src/theme/theme';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f8f8f8;
`;

export const Header = styled.View`
  height: ${Platform.OS === 'ios' ? 90 : 60}px;
  padding-top: ${Platform.OS === 'ios' ? 30 : 0}px;
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #333333;
`;

export const MarkAllButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const MarkAllText = styled.Text`
  color: ${theme.colors.green};
  font-size: 14px;
`;

export const NotificationList = styled.FlatList`
  flex: 1;
  padding-top: 8px;
`;

export const NotificationItemContainer = styled.TouchableOpacity`
  background-color: #ffffff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  flex-direction: row;
  border-left-width: 4px;
  border-left-color: ${props => {
        switch (props.type) {
            case 'message': return theme.colors.green;
            case 'system': return theme.colors.brown;
            case 'alert': return theme.colors.danger;
            default: return theme.colors.green;
        }
    }};
  opacity: ${props => props.isRead ? 0.7 : 1};
`;

export const NotificationContent = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const NotificationTitle = styled.Text`
  font-size: 16px;
  font-weight: ${props => props.isRead ? 'normal' : '600'};
  color: #333333;
  margin-bottom: 4px;
`;

export const NotificationMessage = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 8px;
`;

export const NotificationTime = styled.Text`
  font-size: 12px;
  color: #999999;
`;

export const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: #999999;
  text-align: center;
  margin-top: 16px;
`;