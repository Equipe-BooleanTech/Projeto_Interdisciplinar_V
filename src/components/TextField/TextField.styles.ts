import { theme } from '@/theme';
import styled from 'styled-components/native';
import { TextFieldProps, TextProps } from './TextField.interface';

export const StyledTextFieldContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  border-color: ${(props: Partial<TextFieldProps>) =>
    props.error?.show ? theme.colors.danger : theme.colors.green};
  border-radius: 8px;
  border-width: 1px;
  background-color: ${(props: Partial<TextFieldProps>) =>
    props.disabled ? theme.colors.card : '#ffffff'};
  opacity: ${(props: Partial<TextFieldProps>) => (props.disabled ? 0.5 : 1)};
`;

export const StyledLabel = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 600;
`;

export const StyledTextInput = styled.TextInput<Partial<TextFieldProps>>`
  font-size: 16px;
  color: ${theme.colors.stroke};
  padding: 12px;
  outline: none !important;
`;

export const StyledErrorText = styled.Text`
  font-size: 12px;
  color: ${theme.colors.danger};
`;
export const StyledHelperText = styled.Text<{ variant: 'error' | 'warning' | 'info' | 'success' }>`
  font-size: 12px;
  color: ${(props: TextProps) => {
    switch (props.variant) {
      case 'error':
        return theme.colors.danger;
      case 'warning':
        return theme.colors.warning;
      case 'success':
        return theme.colors.success;
      default:
        return theme.colors.text;
    }
  }};
  font-weight: 600;
  margin: 4px 0;
`;
