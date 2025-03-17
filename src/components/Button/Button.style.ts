import styled from 'styled-components/native';
import { theme } from '@/theme';

export const StyledButton = styled.TouchableOpacity<{
  variant: 'primary' | 'secondary' | 'social' | 'danger';
  disabled?: boolean;
  color?: string;
}>`
  background-color: ${(variant: string, color: string) => {
    switch (variant) {
      case 'primary':
        return theme.colors.green;
      case 'secondary':
        return theme.colors.brown;
      case 'social':
        return theme.colors.card;
      case 'danger':
        return theme.colors.danger;
      default:
        return color || theme.colors.green;
    }
  }};
  border-radius: 10px;
  padding: 20px 40px;
  margin: 10px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text<{
  variant?: 'primary' | 'secondary' | 'social' | 'danger';
}>`
  color: ${(variant: string) => (variant === 'primary' ? theme.colors.text : theme.colors.text)};
  font-size: ${theme.font.size.h3};
  font-weight: ${theme.font.weight.h3};
`;
