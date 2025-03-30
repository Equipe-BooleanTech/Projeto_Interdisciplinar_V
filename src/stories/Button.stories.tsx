import images from '@/assets';
import { Button } from '../components';

export default {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onPress: { action: 'pressed' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'social'],
      description: 'Button style variant',
    },
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

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
  },
};

export const Social = {
  args: {
    variant: 'social',
    children: 'Continue with Google',
    hasIcon: true,
    icon: {
      component: images.googleIcon,
      size: '24px',
    },
    disabled: false,
  },
};

export const Disabled = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
};

export const CustomColor = {
  args: {
    variant: 'primary',
    children: 'Custom Color Button',
    color: '#6A0DAD',
    disabled: false,
  },
};
