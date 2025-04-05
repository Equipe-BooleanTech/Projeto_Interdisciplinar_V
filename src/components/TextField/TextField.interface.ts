import { TextInputProps } from 'react-native';

export interface TextFieldProps extends TextInputProps {
  label?: string;
  labelAlign?: 'left' | 'center' | 'right';
  placeholder?: string;
  error?: {
    message: string;
    type: 'error' | 'warning' | 'info';
    show: boolean;
  };
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'select' | 'date' | 'phone';
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  focused?: boolean;
  onFocus?: () => void;
  onSelect?: () => void;
  selectedOption?: string;
  icon?: {
    component: any;
    size: number;
  };
}

export interface TextProps {
  variant: 'error' | 'warning' | 'info' | 'success';
}