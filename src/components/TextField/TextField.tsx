import React, { useState } from 'react';
import { TextFieldProps } from './TextField.interface';
import {
  StyledErrorText,
  StyledHelperText,
  StyledLabel,
  StyledTextFieldContainer,
  StyledTextInput,
  StyledPhoneContainer,
  StyledPicker,
  StyledPhoneInput
} from './TextField.styles';
import { Picker } from '@react-native-picker/picker';

const formatDate = (text: string) => {
  let cleaned = text.replace(/\D/g, '');
  if (cleaned.length > 2) cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
  if (cleaned.length > 5) cleaned = cleaned.slice(0, 5) + '/' + cleaned.slice(5, 9);
  return cleaned;
};

const DDD_OPTIONS = ['+55', '+1', '+44', '+33', '+49'];

const formatPhone = (text: string) => {
  let cleaned = text.replace(/\D/g, '');
  if (cleaned.length > 2) cleaned = '(' + cleaned.slice(0, 2) + ') ' + cleaned.slice(2);
  if (cleaned.length > 10) cleaned = cleaned.slice(0, 10) + '-' + cleaned.slice(10, 14);
  return cleaned;
};

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
    type,
    value,
    ...rest
  } = Props;

  const [selectedDDD, setSelectedDDD] = useState(DDD_OPTIONS[0]);

  return (
    <>
      {label && <StyledLabel error={error}>{label}</StyledLabel>}

      {type === 'phone' ? (
        <StyledPhoneContainer>
          <StyledPicker
            selectedValue={selectedDDD}
            onValueChange={(itemValue: any) => setSelectedDDD(itemValue)}
          >
            {DDD_OPTIONS.map((ddd) => (
              <Picker.Item key={ddd} label={ddd} value={ddd} />
            ))}
          </StyledPicker>
          <StyledPhoneInput
            placeholder="Digite o número"
            keyboardType="numeric"
            value={formatPhone(value || '')}
            onChangeText={(text: string) => rest.onChangeText?.(formatPhone(text))}
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
            value={type === 'date' ? formatDate(value || '') : value}
            keyboardType={type === 'date' ? 'numeric' : 'default'}
            onChangeText={(text: string) => {
              if (type === 'date') {
                rest.onChangeText?.(formatDate(text));
              } else {
                rest.onChangeText?.(text);
              }
            }}
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
