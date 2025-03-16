import { ReactNode } from 'react';
import { ScrollViewProps as NativeScrollViewProps } from 'react-native';

export interface ScrollViewProps extends NativeScrollViewProps {
  children: ReactNode;
}
