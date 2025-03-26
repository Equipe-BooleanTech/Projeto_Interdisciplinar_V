import { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  variant: 'primary' | 'secondary' | 'social' | 'danger';
  disabled?: boolean;
  color?: string;
  onPress?: () => void;
  children: ReactNode;
}
