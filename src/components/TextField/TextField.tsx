import React from 'react';
import { TextFieldProps } from './TextField.interface';
import { StyledLabel, StyledTextFieldContainer, StyledTextInput } from './TextField.styles';

const TextField = (Props: TextFieldProps) => {
  const {
    label,
    labelAlign = 'left',
    placeholder,
    error,
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
          value={value}
          keyboardType={type === 'date' ? 'numeric' : 'default'}
          onChangeText={(text: string) => {
            rest.onChangeTextString?.(text);
          }}
          {...rest}
        />
      </StyledTextFieldContainer>
    </>
  );
};

export default TextField;
