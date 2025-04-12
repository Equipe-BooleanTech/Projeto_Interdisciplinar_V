import { theme } from '@/theme';
import styled from 'styled-components/native';
import { TextFieldProps, TextProps } from './TextField.interface';
import { Picker } from '@react-native-picker/picker';

export const StyledTextFieldContainer = styled.View<Partial<TextFieldProps>>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #999;
  background-color: ${(props: Partial<TextFieldProps>) =>
    props.disabled ? theme.colors.card : '#ffffff'};
  opacity: ${(props: Partial<TextFieldProps>) => (props.disabled ? 0.5 : 1)};

  ${(props: Partial<TextFieldProps>) =>
    props.type === 'phone' &&
    `
    flex-direction: row;
    align-items: center;
    padding: 0;
  `}
`;

export const StyledLabel = styled.Text<Partial<TextFieldProps>>`
  font-size: 14px;
  color: ${(props: Partial<TextFieldProps>) =>
    props.error?.type === 'error' ? theme.colors.danger : theme.colors.green};
  margin-top: 4px;
  margin-bottom: 4px;
  font-weight: 600;
  marginend: 'auto';
`;

export const StyledTextInput = styled.TextInput<Partial<TextFieldProps>>`
  font-size: 16px;
  color: ${theme.colors.stroke};
  padding: 12px;
  outline-color: ${(props: Partial<TextFieldProps>) =>
    props.error?.type === 'error' ? theme.colors.danger : theme.colors.green};
  border-radius: 8px;
  background-color: ${(props: Partial<TextFieldProps>) =>
    props.disabled ? theme.colors.card : '#ffffff'};
  opacity: ${(props: Partial<TextFieldProps>) => (props.disabled ? 0.5 : 1)};
  &::placeholder {
    color: #fff;
  }
`;

export const StyledPhoneInput = styled.TextInput<Partial<TextFieldProps>>`
  font-size: 16px;
  color: ${theme.colors.stroke};
  padding: 12px;
  outline-color: ${(props: Partial<TextFieldProps>) =>
    props.error?.type === 'error' ? theme.colors.danger : theme.colors.green};
  border-radius: 8px;
  background-color: ${(props: Partial<TextFieldProps>) =>
    props.disabled ? theme.colors.card : '#ffffff'};
  opacity: ${(props: Partial<TextFieldProps>) => (props.disabled ? 0.5 : 1)};
  border: 1px solid #999;
  width: 100%;
  &::placeholder {
    color: #fff;
  }
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

export const StyledPhoneContainer = styled.View`
  border-left-width: 1px;
  border-left-color: #999;
  flex-direction: row;
  border-radius: 8px;
  background-color: #fff;
  padding: 0;
  width: 100%;
`;

export const StyledPicker = styled(Picker)`
  width: 80px;
  border-radius: 8px;
  margin-right: 8px;
`;
