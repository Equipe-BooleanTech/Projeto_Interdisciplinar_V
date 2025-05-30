import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { theme } from '@/theme';

export const HeaderContainer = styled.View`
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

export const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const BackButton = styled.TouchableOpacity`
  margin-right: 16px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
`;

export const RightContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconButton = styled.TouchableOpacity`
  margin-left: 16px;
`;

export const NotificationBadge = styled.View`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${theme.colors.green};
  width: 16px;
  height: 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const NotificationText = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: bold;
`;