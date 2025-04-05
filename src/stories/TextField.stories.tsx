import { TextField } from '../components';
import { formatDate } from '../utils';

export default {
  title: 'TextField',
  component: TextField,
  argTypes: {
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    focused: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    multiline: { control: 'boolean' },
    onChangeText: { action: 'changed' },
    onBlur: { action: 'blurred' },
    onFocus: { action: 'focused' },
    onSelect: { action: 'selected' },
    selectedOption: { control: 'text' },
    icon: { control: 'object' },
    labelAlign: {
      control: {
        type: 'select',
        options: ['left', 'center', 'right'],
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'email', 'number', 'select', 'date', 'phone'],
      },
    },
  },
};

export const Default = {
  args: {
    variant: 'default',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    type: 'text',
    disabled: false,
    focused: false,
  },
};

export const Disabled = {
  args: {
    variant: 'default',
    disabled: true,
    label: 'Nome',
    placeholder: 'Digite seu nome',
    type: 'text',
  },
};

export const Error = {
  args: {
    error: {
      show: true,
      type: 'error',
      message: 'Campo obrigatório',
    },
    label: 'Nome',
    placeholder: 'Digite seu nome',
    type: 'text',
    focused: true,
  },
};

export const HelperText = {
  args: {
    helperText: 'Campo obrigatório',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    type: 'text',
  },
};

export const Multiline = {
  args: {
    multiline: true,
    numberOfLines: 4,
    label: 'Nome',
    placeholder: 'Digite seu nome',
    type: 'text',
  },
};

export const Password = {
  args: {
    label: 'Senha',
    placeholder: 'Digite sua senha',
    type: 'password',
  },
};

export const Formatted = {
  args: {
    label: 'Data',
    placeholder: 'Digite sua data',
    type: 'date',
    onChangeText: (text: string) => {
      console.log(formatDate(text));
    }
  },
};
