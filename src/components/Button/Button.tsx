import { View, Image as RNImage } from 'react-native';
import { ButtonProps } from './Button.interface';
import { ButtonText, StyledButton } from './Button.style';
import React from 'react';

const Button = ({ children, variant, color, disabled, onPress, hasIcon, icon, border, full }: ButtonProps) => {
  return (
    <StyledButton variant={variant} color={color} disabled={disabled} border={border} full={full} onPress={onPress}>
      {hasIcon && icon?.component && (
        <>
          {/* Handle both component and string/data URL cases */}
          {typeof icon.component === 'string' ? (
            <RNImage
              source={{ uri: icon.component }}
              style={{ width: icon.size || 24, height: icon.size || 24 }}
            />
          ) : (
            <View style={{ marginRight: 8 }}>
              {React.createElement(icon.component, {
                width: icon.size || 24,
                height: icon.size || 24,
              })}
            </View>
          )}
        </>
      )}
      <ButtonText variant={variant} spaceImage={hasIcon}>{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;