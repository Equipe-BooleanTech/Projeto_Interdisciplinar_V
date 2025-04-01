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
    <>
      {label && <StyledLabel error={error}>{label}</StyledLabel>}
      <StyledTextFieldContainer
        error={error}
        disabled={disabled}
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
          {...rest}
        />
      </StyledTextFieldContainer>
      {error?.show && <StyledErrorText>{error.message}</StyledErrorText>}
      {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
    </>
  );
};

export default TextField;
