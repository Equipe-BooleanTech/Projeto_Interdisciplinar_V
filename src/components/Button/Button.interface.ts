import { ComponentClass, FunctionComponent, ReactNode } from 'react';
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
    component?: string | FunctionComponent<SvgProps> | ComponentClass<SvgProps, any>;
  };
  children: ReactNode;
  border?: {
    width: number;
    color: string;
  };
  full?: boolean;
  spaceImage?: boolean;
}