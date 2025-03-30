import { ComponentType, ReactElement, ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

export interface ButtonProps extends TouchableOpacityProps {
  variant: 'primary' | 'secondary' | 'social' | 'danger';
  disabled?: boolean;
  color?: string;
  onPress?: () => void;
  hasIcon?: boolean;
  icon?: {
    size?: number;
    component?: ComponentType<SvgProps> | ReactElement;
  };
  children: ReactNode;
}
