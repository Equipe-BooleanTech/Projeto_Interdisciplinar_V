import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { RootProps } from './interfaces/Root.interface';
import React from 'react';
import { RootStyles } from './styles/Root.styles';

const Root: React.FC<RootProps> = (Props) => {
  const { children } = Props;

  const formMethods = useForm<FieldValues>({
    defaultValues: {},
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  return (
    <FormProvider {...formMethods}>
      <RootStyles>{children}</RootStyles>
    </FormProvider>
  );
};

export default Root;
