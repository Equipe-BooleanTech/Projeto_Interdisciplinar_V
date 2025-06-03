// TextInputTypes.ts
import { ReactNode } from 'react';
import { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { IconObject } from 'react-native-elements';

export interface CustomTextInputProps extends TextInputProps {
  // Icon props
  leftIcon?: ReactNode | IconObject;
  rightIcon?: ReactNode | IconObject;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;

  // Mask props
  mask?: string; // e.g., 'phone', 'credit-card', 'date', 'custom pattern'
  customMaskPattern?: string; // for custom masks

  // Validation props
  validateOnChange?: boolean;
  validationRegex?: RegExp;
  validator?: (text: string) => boolean;
  errorMessage?: string;

  // Style props
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  leftIconContainerStyle?: ViewStyle;
  rightIconContainerStyle?: ViewStyle;
  errorStyle?: TextStyle;

  // Other props
  label?: string;
  labelStyle?: TextStyle;
  placeholderTextColor?: string;
  disabled?: boolean;
  disabledInputStyle?: TextStyle;
  showErrorMessage?: boolean;
  debounceTime?: number; // for debouncing onChangeText
}