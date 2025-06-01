import { theme } from '@/src/theme/theme';
import styled from 'styled-components/native';
import { TextFieldProps } from './TextField.interface';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

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

export const StyledTextInput = styled(TextInput)`
  font-size: 16px;
  height: 50px;
  `
export const StyledDropdown = styled(Dropdown)`
  font-size: 16px;
  padding: 12px;
  height: 50px;
  border-radius: 4px;
  opacity: ${(props: Partial<TextFieldProps>) => (props.disabled ? 0.5 : 1)};
  border: 1px solid #333;
  width: 100%;
  
`;

export const StyledErrorText = styled.Text`
  font-size: 12px;
  color: ${theme.colors.danger};
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
