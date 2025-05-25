import { ReactNode } from 'react';

export interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  lineHeight?: number;
  letterSpacing?: number;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
  children: string | ReactNode;
}
