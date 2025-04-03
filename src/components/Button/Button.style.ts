import styled from 'styled-components/native';
import { theme } from '@/theme';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'social' | 'danger';
  disabled?: boolean;
  color?: string;
  border?: {
    width: number;
    color: string;
  };
  full?: boolean;
}

export const StyledButton = styled.TouchableOpacity<{
  variant: 'primary' | 'secondary' | 'social' | 'danger';
  disabled?: boolean;
  color?: string;
  border?: {
    width: number;
    color: string;
  };
  full?: boolean;
}>`
  background-color: ${(props: ButtonProps) => {
    if (props.color) return props.color;

    switch (props.variant) {
      case 'primary':
        return theme.colors.green;
      case 'secondary':
        return theme.colors.brown;
      case 'social':
        return theme.colors.card;
      case 'danger':
        return theme.colors.danger;
      default:
        return theme.colors.green;
    }
  }};
  border-radius: 10px;
  padding: 20px 40px;
  margin: 10px;
  align-items: center;
  justify-content: center;
  opacity: ${(props: ButtonProps) => (props.disabled ? 0.5 : 1)};
  flex-direction: row;
  width: ${(props: ButtonProps) => (props.full ? '100%' : 'auto')};

  border-width: ${(props: ButtonProps) => (props.border ? props.border.width : 0)}px;
  border-color: ${(props: ButtonProps) => (props.border ? props.border.color : 'transparent')};
`;

interface ButtonTextProps {
  variant?: 'primary' | 'secondary' | 'social' | 'danger';
  spaceImage?: boolean;
}

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${(props: ButtonProps) => {
    switch (props.variant) {
      case 'social':
        return '#1f1f1f';
      default:
        return theme.colors.text;
    }
  }};
  font-size: ${theme.font.size.p};
  font-weight: ${theme.font.weight.p};

  margin-left: ${(props: ButtonTextProps) => (props.spaceImage ? 10 : 0)}px;
`;
