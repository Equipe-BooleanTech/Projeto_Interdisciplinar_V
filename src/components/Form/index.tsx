import { Picker } from '@react-native-picker/picker';
import TextField from '../TextField/TextField';
import Root from './Root';
import { Switch } from 'react-native';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { View } from 'react-native';
import React from 'react';
import MaskInput, { MaskArray } from 'react-native-mask-input';
import { StyledLabel } from '../TextField/TextField.styles';
import { StyledMaskedInput } from './styles/Field.styles';
import { StyledErrorText } from '../TextField/TextField.styles';

export const Form = {
  Field: {
    TextField: TextField,
    Select: Picker,
    Switch: Switch,
  },
  Root: Root,
};

// Field type definitions
type BaseFieldProps = {
  name: string;
  rules?: RegisterOptions;
  errorMessage?: string;
};

type TextFieldProps = BaseFieldProps & {
  type: 'textfield';
  componentProps?: React.ComponentProps<typeof TextField>;
};

type SelectFieldProps = BaseFieldProps & {
  type: 'select';
  componentProps?: React.ComponentProps<typeof Picker>;
  options: Array<{ label: string; value: any }>;
};

type SwitchFieldProps = BaseFieldProps & {
  type: 'switch';
  componentProps?: React.ComponentProps<typeof Switch>;
};

type MaskedTextFieldProps = BaseFieldProps & {
  type: 'maskedtextfield';
  componentProps?: React.ComponentProps<typeof MaskInput>;
  mask: (value?: string | undefined) => MaskArray | (string | RegExp)[];
  label: string;
  errorMessage?: string;
  rules?: RegisterOptions;
  placeholder?: string;
};

type FieldConfig = TextFieldProps | SelectFieldProps | SwitchFieldProps | MaskedTextFieldProps;

export const FormHelpers = {
  createFormFields: ({
    control,
    fields = [],
  }: {
    control: Control<any>;
    fields: FieldConfig[];
  }) => {
    return (
      <View style={{ width: '100%', gap: 8 }}>
        {fields.map((field, index) => (
          <View key={field.name || index}>
            <Controller
              control={control}
              rules={field.rules || {}}
              render={({ field: { onChange, value } }) => {
                switch (field.type) {
                  case 'textfield':
                    return (
                      <Form.Field.TextField
                        onChangeText={onChange}
                        value={value}
                        helperText={field.errorMessage}
                        label={field.name}
                        placeholder={field.componentProps?.placeholder}
                        secureTextEntry={field.componentProps?.secureTextEntry}
                        {...field.componentProps}
                      />
                    );
                  case 'select':
                    return (
                      <Form.Field.Select
                        selectedValue={value}
                        onValueChange={onChange}
                        {...field.componentProps}
                      >
                        {field.options.map((option) => (
                          <Picker.Item
                            key={option.value}
                            label={option.label}
                            value={option.value}
                          />
                        ))}
                      </Form.Field.Select>
                    );
                  case 'switch':
                    return (
                      <Form.Field.Switch
                        value={value}
                        onValueChange={onChange}
                        {...field.componentProps}
                      />
                    );
                  case 'maskedtextfield':
                    return (
                      <>
                        <StyledLabel>{field.label}</StyledLabel>
                        <StyledMaskedInput
                          onChangeText={(masked: any, unmasked: any) => {
                            onChange(unmasked);
                          }}
                          value={value}
                          mask={field?.mask}
                          placeholder={field.placeholder}
                          keyboardType={field.componentProps?.keyboardType}
                          {...field.componentProps}
                        />
                      </>
                    );
                  default:
                    return <></>;
                }
              }}
              name={field.name}
            />
            {control._formState.errors[field.name] && (
              <StyledErrorText>
                {field.errorMessage || 'Campo inválido. Verifique e tente novamente!'}
              </StyledErrorText>
            )}
          </View>
        ))}
      </View>
    );
  },
};

export default Form;
