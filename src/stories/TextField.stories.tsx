import React, { useState } from 'react';
import { TextField } from '../components';
import { View } from 'react-native';

export default {
  title: 'TextField',
  component: TextField,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <View style={{ padding: 16, maxWidth: 400 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onChangeText: { action: 'text changed' },
    onBlur: { action: 'blurred' },
    onFocus: { action: 'focused' },
    onSelectionChange: { action: 'selection changed' },
    labelAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Label alignment',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'date', 'phone'],
      description: 'Input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    multiline: {
      control: 'boolean',
      description: 'Multiline input',
    },
  },
};

// Basic input field
export const Basic = () => {
  const [value, setValue] = useState('');
  return <TextField placeholder="Type something here..." value={value} onChangeText={setValue} />;
};

// Input with label
export const WithLabel = () => {
  const [value, setValue] = useState('');
  return (
    <TextField
      label="Username"
      placeholder="Enter your username"
      value={value}
      onChangeText={setValue}
    />
  );
};

// Input with error
export const WithError = () => {
  const [value, setValue] = useState('');
  return (
    <TextField
      label="Email"
      placeholder="Enter your email"
      value={value}
      onChangeText={setValue}
      error={{
        message: 'Please enter a valid email address',
        type: 'error',
        show: true,
      }}
    />
  );
};

// Disabled input
export const Disabled = () => {
  return (
    <TextField
      label="Disabled Field"
      placeholder="This field is disabled"
      disabled={true}
      value="Cannot edit this field"
      onChangeText={() => {}}
    />
  );
};

// Password input
export const Password = () => {
  const [value, setValue] = useState('');
  return (
    <TextField
      label="Password"
      placeholder="Enter your password"
      type="password"
      secureTextEntry={true}
      value={value}
      onChangeText={setValue}
    />
  );
};

// Date input with formatting
export const DateInput = () => {
  const [value, setValue] = useState('');
  return (
    <TextField
      label="Birth Date"
      placeholder="DD/MM/YYYY"
      type="date"
      value={value}
      onChangeText={setValue}
    />
  );
};

// Phone input with country code selector
export const PhoneInput = () => {
  const [value, setValue] = useState('');
  return (
    <TextField
      label="Phone Number"
      type="phone"
      selectedOption="+55"
      value={value}
      onChangeText={setValue}
    />
  );
};

// Multiline text area
export const Multiline = () => {
  const [value, setValue] = useState('');
  return (
    <TextField
      label="Description"
      placeholder="Write a detailed description..."
      multiline={true}
      numberOfLines={4}
      style={{ height: 100 }}
      value={value}
      onChangeText={setValue}
    />
  );
};

// Input with helper text
export const WithHelperText = () => {
  const [value, setValue] = useState('');
  return (
    <TextField
      label="Username"
      placeholder="Enter your username"
      helperText="Your username must be at least 4 characters"
      value={value}
      onChangeText={setValue}
    />
  );
};

// Interactive example with validation
export const Interactive = () => {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const validateEmail = (text: string) => {
    setValue(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setHasError(!emailRegex.test(text) && text.length > 0);
  };

  return (
    <TextField
      label="Email"
      placeholder="Enter your email"
      value={value}
      onChangeText={validateEmail}
      error={
        hasError
          ? {
              message: 'Please enter a valid email address',
              type: 'error',
              show: true,
            }
          : undefined
      }
    />
  );
};
