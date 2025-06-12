import AdvancedTextInput from '@/components/TextField/TextField';
import Root from './Root';
import { Switch } from 'react-native';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { HelperText } from 'react-native-paper';
import { theme } from '@/theme';
import { Dropdown } from 'react-native-element-dropdown';
import { Label } from '../TextField/TextField.styles';

const SelectField = ({
  options,
  placeholder = "Selecione uma opção...",
  defaultValue,
  ...rest
}) => {
  const styles = StyleSheet.create({
    dropdown: {
      width: '100%',
      marginVertical: 8,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 8, // Matches input border radius
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: '#ccc', // Matches input border color
      fontSize: 16, // Matches input font size
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0', // Added for better item separation
    },
    textItem: {
      flex: 1,
      fontSize: 16,
      color: '#333', // Matches input text color
    },
    placeholderStyle: {
      fontSize: 16,
      color: '#999', // Matches input placeholder color
    },
    selectedTextStyle: {
      fontSize: 16,
      color: '#333', // Matches input text color
    },
    iconStyle: {
      width: 20,
      height: 20,
      tintColor: '#666', // Matches icon colors
    },
    // Added these to match error states
    error: {
      borderColor: '#ff3333', // Error border color
    },
    focused: {
      borderColor: '#454F2C', // Focus/highlight color (from your theme)
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
        iconStyle={styles.iconStyle}
        data={options}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Selecione uma opção..."
        searchPlaceholder="Search..."
        value={value || rest.selectedValue}
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
    TextField: AdvancedTextInput,
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
  defaultValue?: any;
};

type TextFieldProps = BaseFieldProps & {
  type: 'textfield';
  componentProps?: React.ComponentProps<typeof AdvancedTextInput>;
  fieldType?: 'text' | 'password' | 'email' | 'number';
  label?: string;
  placeholder?: string;
  mask?: 'phone' | 'credit-card' | 'date' | string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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

type SwitchFieldProps = BaseFieldProps & {
  type: 'switch';
  componentProps?: React.ComponentProps<typeof Switch>;
  label?: string;
  enabled?: boolean;
  errorMessage?: string;
  rules?: RegisterOptions;
  placeholder?: string;
};

type FieldConfig = TextFieldProps | SelectFieldProps | SwitchFieldProps;

export const FormHelpers = {
  createFormFields: ({
    control,
    fields = [],
  }: {
    control: Control<any>;
    fields: FieldConfig[];
    defaultValues?: Record<string, any>;
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
                        onChangeText={(text) => {
                          onChange(text);
                          if (field.componentProps?.onChangeText) {
                            field.componentProps.onChangeText(text);
                          }
                        }}
                        onBlur={() => {
                          onBlur();
                          if (field.componentProps?.onBlur) {
                            field.componentProps.onBlur();
                          }
                        }}
                        value={value}
                        errorMessage={field.errorMessage}
                        label={field.label}
                        isValid={!control._formState.errors[field.name]}
                        placeholder={field.placeholder}
                        secureTextEntry={field.fieldType === 'password'}
                        mask={field.mask}
                        leftIcon={field.componentProps?.leftIcon}
                        rightIcon={field.componentProps?.rightIcon}
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
                      <>
                        <Label>{field.label}</Label>
                        <Form.Field.Switch
                          value={value}
                          onValueChange={onChange}
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