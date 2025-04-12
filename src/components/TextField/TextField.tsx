import React from 'react';
import { DDD_OPTIONS, masks } from '@/src/utils';
import { TextFieldProps } from './TextField.interface';
import {
  StyledErrorText,
  StyledHelperText,
  StyledLabel,
  StyledPhoneContainer,
  StyledPhoneInput,
  StyledPicker,
  StyledTextFieldContainer,
  StyledTextInput,
} from './TextField.styles';
import { Picker } from '@react-native-picker/picker';

const TextField = (Props: TextFieldProps) => {
  const {
    label,
    labelAlign = 'left',
    placeholder,
    error,
    helperText,
    disabled,
    required,
    multiline,
    type = 'text',
    value,
    selectedOption,
    onSelectionChange,
    onChangeText,
    ...rest
  } = Props;

  const formatter = type && type in masks ? masks[type as keyof typeof masks] : undefined;
  const formattedValue = formatter ? formatter(value || '') : value;

  const handleTextChange = (text: string) => {
    if (!onChangeText) return;

    if (formatter) {
      const formatted = formatter(text);
      onChangeText(formatted);
    }
    onChangeText(text);
  };

  return (
    <>
      {label && <StyledLabel error={error}>{label}</StyledLabel>}

      {type === 'phone' ? (
        <StyledPhoneContainer>
          <StyledPicker
            selectedValue={selectedOption}
            onValueChange={(itemValue: any) => onSelectionChange?.(itemValue)}
          >
            {DDD_OPTIONS.map((ddd) => (
              <Picker.Item key={ddd} label={ddd} value={ddd} />
            ))}
          </StyledPicker>
          <StyledPhoneInput
            placeholder="Digite o número"
            keyboardType="numeric"
            value={formattedValue}
            onChangeText={handleTextChange}
            {...rest}
          />
        </StyledPhoneContainer>
      ) : (
        <StyledTextFieldContainer
          error={error}
          disabled={disabled}
          labelAlign={labelAlign}
          required={required}
          multiline={multiline}
          type={type}
          value={value}
          {...rest}
        >
          <StyledTextInput
            placeholder={placeholder}
            error={error}
            disabled={disabled}
            multiline={multiline}
            value={formattedValue}
            keyboardType={type === 'date' ? 'numeric' : 'default'}
            onChangeText={handleTextChange}
            {...rest}
          />
        </StyledTextFieldContainer>
      )}
      {error?.show && <StyledErrorText>{error.message}</StyledErrorText>}
      {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
    </>
  );
};

export default TextField;
