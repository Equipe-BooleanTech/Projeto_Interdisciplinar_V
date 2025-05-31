import { Picker, PickerIOS } from '@react-native-picker/picker';
import TextField from '../TextField/TextField';
import Root from './Root';
import { Modal, Platform, Switch, TouchableOpacity } from 'react-native';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { View } from 'react-native';
import React, { useState } from 'react';
import MaskInput, { MaskArray } from 'react-native-mask-input';
import { StyledLabel, StyledPicker } from '../TextField/TextField.styles';
import { ButtonText, ErrorText, Label, ModalContainer, ModalHeader, PickerContainer, SelectContainer, SelectTrigger, SelectValue, StyledMaskedInput, WebPicker } from './styles/Field.styles';
import { StyledErrorText } from '../TextField/TextField.styles';

const SelectField = ({
  label,
  options = [],
  selectedValue,
  onValueChange,
  error,
  placeholder = "Selecione uma opção...",
  ...rest
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState(selectedValue);

  const displayValue = options.find(opt => opt.value === selectedValue)?.label || placeholder;
  const isPlaceholder = !options.find(opt => opt.value === selectedValue);

  const handleTempChange = (value) => {
    setTempValue(value);
  };

  const handleConfirm = () => {
    onValueChange(tempValue);
    setModalVisible(false);
  };

  if (Platform.OS === 'ios') {
    return (
      <SelectContainer>
        {label && <Label>{label}</Label>}

        <SelectTrigger onPress={() => setModalVisible(true)} activeOpacity={0.7}>
          <SelectValue placeholder={isPlaceholder}>{displayValue}</SelectValue>
        </SelectTrigger>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ModalContainer>
            <PickerContainer>
              <ModalHeader>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <ButtonText>Cancelar</ButtonText>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirm}>
                  <ButtonText bold>Confirmar</ButtonText>
                </TouchableOpacity>
              </ModalHeader>

              <StyledPicker
                selectedValue={tempValue}
                onValueChange={handleTempChange}
                itemStyle={{ fontSize: 16 }}
              >
                {options.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </StyledPicker>
            </PickerContainer>
          </ModalContainer>
        </Modal>
      </SelectContainer>
    );
  }

  // For web and Android
  return (
    <SelectContainer>
      {label && <Label>{label}</Label>}
      <WebPicker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        {...rest}
      >
        <Picker.Item label={placeholder} value="" enabled={false} />
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </WebPicker>
    </SelectContainer>
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
};

interface SelectOption {
  label: string;
  value: string | number; // Adjust based on what values you actually use
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  selectedValue: string | number;
  onValueChange: (value: string | number, index: number) => void;
  options: SelectOption[]; 
  error?: string;
  [key: string]: any; 
}

type SelectFieldProps = BaseFieldProps & {
  type: 'select';
  options: SelectOption[];
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
                        options={field.options as Array<{ label: string; value: any }>}
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
