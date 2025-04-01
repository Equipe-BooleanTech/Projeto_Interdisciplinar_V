import { TextFieldProps } from './TextField.interface';
import {
  StyledErrorText,
  StyledHelperText,
  StyledLabel,
  StyledTextFieldContainer,
  StyledTextInput,
} from './TextField.styles';

const TextField = (Props: TextFieldProps) => {
  const {
    label,
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

  return (
    <StyledTextFieldContainer
      error={error}
      disabled={disabled}
      required={required}
      multiline={multiline}
      type={type}
      value={value}
      {...rest}
    >
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledTextInput
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        multiline={multiline}
        {...rest}
      />
      {error?.show && <StyledErrorText>{error.message}</StyledErrorText>}
      {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
    </StyledTextFieldContainer>
  );
};

export default TextField;
