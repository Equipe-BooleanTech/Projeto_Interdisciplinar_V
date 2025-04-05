import React from 'react';
import { DDD_OPTIONS, formatDate, formatPhone } from '@/src/utils';
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
    type,
    value,
    selectedOption, 
    onSelectionChange,
    ...rest
  } = Props;

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