import TextField from '../TextField/TextField';
import Root from './Root';
import { Switch } from 'react-native';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import MaskInput, { MaskArray } from 'react-native-mask-input';
import { StyledMaskInput } from './styles/Field.styles';
import { HelperText } from 'react-native-paper';
import { theme } from '@/theme';
import { Dropdown } from 'react-native-element-dropdown';

const SelectField = ({
  options,
  placeholder = "Selecione uma opção...",
  ...rest
}) => {

  const styles = StyleSheet.create({
    dropdown: {
      fontSize: 16,
      padding: 12,
      height: 50,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#333',
      width: '100%',
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  }
  return (
    <>
      {rest.label && (
        <HelperText type='info' visible={!!rest.label}
          style={{ fontSize: 16, color: theme.colors.primary }}>
          {rest.label}
        </HelperText>
      )}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={options}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Selecione uma opção..."
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
          rest.onValueChange(item.value, item.index);
        }}
        renderItem={renderItem}
      />
    </>
  );
};

export const Form = {
  Field: {
    TextField: TextField,
    Select: SelectField,
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
  fieldType?: 'text' | 'password' | 'email' | 'number';
};

interface SelectProps {
  label?: string;
  placeholder?: string;
  selectedValue: string | number;
  onValueChange: (value: string | number, index: number) => void;
  options: any[];
  error?: string;
  [key: string]: any;
}

type SelectFieldProps = BaseFieldProps & {
  type: 'select';
  options: any[];
  label?: string;
  componentProps?: Partial<SelectProps>;
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

type SwitchFieldProps = BaseFieldProps & {
  type: 'switch';
  componentProps?: React.ComponentProps<typeof Switch>;
  label?: string;
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
              render={({ field: { onChange, onBlur, value } }) => {
                switch (field.type) {
                  case 'textfield':
                    return (
                      <Form.Field.TextField
                        onChange={onChange}
                        onChangeText={onChange}
                        onBlur={() => onBlur && onBlur()}
                        value={value}
                        helperText={field.errorMessage}
                        label={field.name}
                        error={!!control._formState.errors[field.name]}
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
                        options={field.options}
                        label={field.label}
                        error={field.errorMessage}
                        placeholder={field.componentProps?.placeholder || "Selecione uma opção..."}
                        {...field.componentProps}
                      />
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
                        {field.label && (
                          <HelperText type={field.errorMessage ? 'error' : 'info'} visible={!!field.label}
                            style={{ fontSize: 16, color: theme.colors.primary }}>
                            {field.label}
                          </HelperText>
                        )}
                        <StyledMaskInput
                          mask={field.mask}
                          value={value}
                          label={field.label}
                          onChangeText={onChange}
                          placeholder={field.placeholder}
                          secureTextEntry={field.componentProps?.secureTextEntry}
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
              <HelperText type='error'>
                {field.errorMessage || 'Campo inválido. Verifique e tente novamente!'}
              </HelperText>
            )}
          </View>
        ))}
      </View>
    );
  },
};

export default Form;
