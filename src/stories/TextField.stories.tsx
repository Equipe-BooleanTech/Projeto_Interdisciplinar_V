import { TextField } from '../components';

export default {
  title: 'TextField',
  component: TextField,
  argTypes: {
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
};
export const Default = {
  args: {
    variant: 'default',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    type: 'text',
    disabled: false,
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
