import styled from 'styled-components/native';
import { theme } from '@/theme';

//Exemplo de uso do Styled Components
export const StyledButton = styled.TouchableOpacity<{
  variant: 'primary' | 'secondary' | 'social' | 'danger';
  disabled?: boolean;
  color?: string;
}>`
  background-color: ${({ variant }: { variant: 'primary' | 'secondary' | 'social' | 'danger' }) => {
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
        return ({ color }: { color?: string }) => color || theme.colors.green;
    }
  }};
  border: 1px solid transparent;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 10px;
`;
