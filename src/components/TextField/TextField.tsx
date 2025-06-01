import React from 'react';
import { TextFieldProps } from './TextField.interface';
import { StyledTextInput } from './TextField.styles';
import { theme } from '@/theme';
import { HelperText } from 'react-native-paper';

const TextField = (Props: TextFieldProps) => {
  const {
    label,
    placeholder,
    error,
    disabled,
    required,
    fieldType,
    multiline,
    type,
    secureTextEntry,
    value,
    ...rest
  } = Props;

  return (
    <>
      {label && (
        <HelperText
          type={error.message ? 'error' : 'info'}
          visible={!!label}
          style={{ fontSize: 16, color: theme.colors.primary }}
        >
          {label}
          {required && <span style={{ color: theme.colors.error }}>*</span>}
        </HelperText>
      )}
      <StyledTextInput
        label={placeholder}
        placeholder={placeholder}
        value={value}
        onChangeText={rest.onChangeText}
        error={!!error}
        selectionColor={error ? theme.colors.error : theme.colors.primary}
        disabled={disabled}
        mode="outlined"
        type={type}
        fieldType={fieldType}
        secureTextEntry={secureTextEntry || fieldType === 'password'}
        keyboardType={
          type === 'number'
            ? 'numeric'
            : type === 'email'
              ? 'email-address'
              : type === 'phone'
                ? 'phone-pad'
                : 'default'
        }
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        helperText={error?.show ? error.message : undefined}
        required={required}
      />
    </>
  );
};

export default TextField;
