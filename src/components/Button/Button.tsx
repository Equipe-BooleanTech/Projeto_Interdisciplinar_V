import { ButtonProps } from './Button.interface';
import { ButtonText, StyledButton } from './Button.style';

const Button = ({ children, variant, color, disabled, onPress }: ButtonProps) => {
  return (
    <StyledButton variant={variant} color={color} disabled={disabled} onPress={onPress}>
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;
