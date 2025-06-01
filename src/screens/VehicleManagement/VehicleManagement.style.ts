import styled from 'styled-components/native';
import { theme } from '@/src/theme/theme';

export const Content = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.normalBackground};
  display: flex;
  flex-direction: column;
  padding: 16px;

`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FuelingCard = styled.View<{ fuelType: string }>`
  background-color: ${theme.colors.card};
  border-radius: ${theme.border.button.md};
  padding: 16px;
  margin: 8px 16px;
  border-left-width: 6px;
  border-left-color: ${({ fuelType }) => {
    switch (fuelType) {
      case 'GASOLINE': return theme.colors.green;
      case 'DIESEL': return theme.colors.brown;
      case 'ETHANOL': return theme.colors.warning;
      case 'FLEX': return theme.colors.success;
      default: return theme.colors.stroke;
    }
  }};
  elevation: 2;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const CardTitle = styled.Text`

  font-size: ${theme.font.size.h3};
  font-weight: ${theme.font.weight.h3};
  color: ${theme.colors.stroke};
`;

export const CardSubtitle = styled.Text`

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

  font-size: ${theme.font.size.pb};
  color: ${theme.colors.stroke};
  opacity: 0.7;
`;

export const DetailValue = styled.Text`

  font-size: ${theme.font.size.p};
  color: ${theme.colors.stroke};
`;

export const SummaryContainer = styled.View`
  background-color: ${theme.colors.card};
  border-radius: ${theme.border.button.md};
  padding: 16px;
  margin: 16px;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
  elevation: 2;
`;

export const SummaryItem = styled.View`
  align-items: center;
`;

export const SummaryLabel = styled.Text`

  font-size: ${theme.font.size.pb};
  color: ${theme.colors.stroke};
  opacity: 0.7;
  margin-bottom: 4px;
`;

export const SummaryValue = styled.Text`

  font-size: ${theme.font.size.h3};
  color: ${theme.colors.stroke};
  font-weight: ${theme.font.weight.h3};
`;