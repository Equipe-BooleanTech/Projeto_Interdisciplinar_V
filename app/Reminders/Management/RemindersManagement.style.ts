import styled from 'styled-components/native';
import { theme } from '@/src/theme/theme';

export const Content = styled.View`
  flex: 1;
  background-color: ${theme.colors.normalBackground};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const EmptyStateText = styled.Text`
  font-family: ${theme.font.family.rubik};
  font-size: ${theme.font.size.h4};
  color: ${theme.colors.stroke};
  margin-top: 16px;
  text-align: center;
  opacity: 0.7;
`;

export const FuelingCard = styled.View<{ fuelType: string }>`
  background-color: ${theme.colors.card};
  border-radius: ${theme.border.button.md};
  padding: 16px;
  margin: 8px 16px;
  border-left-width: 6px;
  border-left-color: ${({ theme }) => theme.colors.primary};
  elevation: 2;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const CardTitle = styled.Text`
  font-family: ${theme.font.family.rubik};
  font-size: ${theme.font.size.h3};
  font-weight: ${theme.font.weight.h3};
  color: ${theme.colors.stroke};
`;

export const CardSubtitle = styled.Text`
  font-family: ${theme.font.family.rubik};
  font-size: ${theme.font.size.p};
  color: ${theme.colors.stroke};
  margin-bottom: 4px;
`;

export const CardDetailRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export const CardDetail = styled.View`
  flex: 1;
`;

export const DetailLabel = styled.Text`
  font-family: ${theme.font.family.rubik};
  font-size: ${theme.font.size.pb};
  color: ${theme.colors.stroke};
  opacity: 0.7;
`;

export const DetailValue = styled.Text`
  font-family: ${theme.font.family.rubik};
  font-size: ${theme.font.size.p};
  color: ${theme.colors.stroke};
`;