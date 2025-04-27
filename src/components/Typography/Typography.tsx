import React from 'react';
import { TypographyProps } from './Typography.interface';
import { TypographyStyles } from './Typography.styles';

const Typography = (props: TypographyProps) => {
  const { variant = 'body1', children, ...rest } = props;

  const StyledComponent = TypographyStyles[variant];

  return <StyledComponent {...rest}>{children}</StyledComponent>;
};

export default Typography;
