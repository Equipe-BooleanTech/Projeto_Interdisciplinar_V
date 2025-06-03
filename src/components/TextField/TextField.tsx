import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
} from 'react-native';
import { CustomTextInputProps } from './TextField.interface';
import {
  InputContainer,
  Label,
  InputWrapper,
  StyledTextInput,
  IconContainer,
  ErrorText,
  DisabledOverlay,
} from './TextField.styles';
import { maskHandler } from '@/utils/masks';

const AdvancedTextInput: React.FC<CustomTextInputProps> = ({
  // Icon props
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,

  // Mask props
  mask,
  customMaskPattern,

  // Validation props
  validateOnChange = true,
  validationRegex,
  validator,
  errorMessage = 'Invalid input',

  // Style props
  containerStyle,
  inputContainerStyle,
  inputStyle,
  leftIconContainerStyle,
  rightIconContainerStyle,
  errorStyle,

  // Other props
  label,
  labelStyle,
  placeholderTextColor = '#999',
  disabled = false,
  disabledInputStyle = { opacity: 0.7 },
  showErrorMessage = true,
  debounceTime = 300,

  // TextInput props
  onChangeText,
  value,
  ...rest
}) => {
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input masking
  const handleMasking = (text: string): string => {
    if (!mask && !customMaskPattern) return text;
    return maskHandler(text, mask || customMaskPattern || '');
  };

  // Validation function
  const validateInput = useCallback((text: string): boolean => {
    if (validator) return validator(text);
    if (validationRegex) return validationRegex.test(text);
    return true;
  }, [validationRegex, validator]);

  // Debounced onChangeText handler
  useEffect(() => {
    if (!validateOnChange || !isTouched) return;

    const timer = setTimeout(() => {
      setIsValid(validateInput(value || ''));
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [value, validateOnChange, isTouched, validateInput, debounceTime]);

  // Handle text change
  const handleChangeText = (text: string) => {
    const maskedText = handleMasking(text);

    if (onChangeText) {
      onChangeText(maskedText);
    }

    if (!isTouched) {
      setIsTouched(true);
    }
  };

  // Render icon
  const renderIcon = (
    icon: React.ReactNode | IconObject,
    onPress?: () => void,
    style?: ViewStyle,
    isRight?: boolean
  ) => {
    if (!icon) return null;

    if (React.isValidElement(icon)) {
      return (
        <IconContainer
          onPress={onPress}
          style={[isRight ? { marginLeft: 10 } : { marginRight: 10 }, style]}
          disabled={!onPress}
        >
          {icon}
        </IconContainer>
      );
    }

    // If using react-native-elements IconObject
    const iconObj = icon as IconObject;
    return (
      <IconContainer
        onPress={onPress}
        style={[isRight ? { marginLeft: 10 } : { marginRight: 10 }, style]}
        disabled={!onPress}
      >
        {/* You would use your icon component here, e.g., <Icon {...iconObj} /> */}
      </IconContainer>
    );
  };

  return (
    <InputContainer style={containerStyle}>
      {label && <Label style={labelStyle}>{label}</Label>}

      <InputWrapper style={inputContainerStyle}>
        {renderIcon(leftIcon, onLeftIconPress, leftIconContainerStyle)}

        <StyledTextInput
          {...rest}
          value={value || ''}
          onChangeText={handleChangeText}
          placeholderTextColor={placeholderTextColor}
          style={[
            inputStyle,
            disabled && disabledInputStyle,
            !isValid && { borderColor: '#ff3333' },
          ]}
          editable={!disabled && !isLoading}
        />

        {isLoading ? (
          <ActivityIndicator style={{ marginLeft: 10 }} />
        ) : (
          renderIcon(rightIcon, onRightIconPress, rightIconContainerStyle, true)
        )}

        {disabled && <DisabledOverlay />}
      </InputWrapper>

      {showErrorMessage && !isValid && isTouched && (
        <ErrorText style={errorStyle}>{errorMessage}</ErrorText>
      )}
    </InputContainer>
  );
};

export default AdvancedTextInput;