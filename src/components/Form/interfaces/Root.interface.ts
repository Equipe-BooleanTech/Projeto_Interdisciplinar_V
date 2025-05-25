import React from 'react';

export interface RootProps {
  children?: React.ReactNode;
  controlled: boolean;
  method?: 'post' | 'put' | 'delete';
  action?: string;
  target?: string;
  data?: any;
}
