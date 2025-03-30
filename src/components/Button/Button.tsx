import Image from '../Image/Image';
import { ButtonProps } from './Button.interface';
import { ButtonText, StyledButton } from './Button.style';

const Button = ({ children, variant, color, disabled, onPress, hasIcon, icon }: ButtonProps) => {
  return (
    <StyledButton variant={variant} color={color} disabled={disabled} onPress={onPress}>
      {hasIcon && icon && (
        <Image imgHeight={icon?.size || 24} imgWidth={icon?.size || 24} svg={icon.component!} />
      )}
      <ButtonText variant={variant}>{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;
