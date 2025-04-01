import TextField from '../components/TextField/TextField';

export default {
  title: 'TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    color: {
      control: 'color',
      description: 'Custom button color',
    },
    hasIcon: {
      control: 'boolean',
      description: 'Whether to display an icon',
    },
  },
};

export const Default = {};
