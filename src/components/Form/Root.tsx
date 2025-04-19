import { Form } from 'react-hook-form';
import { RootProps } from './interfaces/Root.interface';
import React from 'react';

const Root = (Props: RootProps) => {
  const { children, method, action, target } = Props;

  // TODO: Implementar as funções abaixo
  return (
    <Form
      onSubmit={() => {}}
      onChange={() => {}}
      onReset={() => {}}
      onInvalid={() => {}}
      method={method}
      action={action}
      target={target}
    >
      {children}
    </Form>
  );
};

export default Root;
