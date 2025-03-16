import { Text } from 'react-native';
import { ButtonProps } from './Button.interface';
import { StyledButton } from './Button.style';

const Button = ({ children, variant, color, disabled, onPress }: ButtonProps) => {
  return (
    <StyledButton variant={variant} color={color} disabled={disabled} onPress={onPress}>
      <Text>{children}</Text>
    </StyledButton>
  );
};

export default Button;
