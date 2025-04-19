import React from 'react';
import { TextFieldProps } from './TextField.interface';
import {
  StyledErrorText,
  StyledHelperText,
  StyledLabel,
  StyledPhoneContainer,
  StyledPhoneInput,
  StyledTextFieldContainer,
  StyledTextInput,
} from './TextField.styles';
import { formatDate, formatPhone } from '@/src/utils';

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
    ...rest
  } = Props;

  return (
    <>
      {label && <StyledLabel error={error}>{label}</StyledLabel>}

      {type === 'phone' ? (
        <StyledPhoneContainer>
          <StyledPhoneInput
            placeholder="Digite o número"
            keyboardType="numeric"
            value={formatPhone(value || '')}
            onChangeText={(text: string) => rest.onChangeTextString?.(formatPhone(text))}
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
                rest.onChangeTextString?.(formatDate(text));
              } else {
                rest.onChangeTextString?.(text);
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
