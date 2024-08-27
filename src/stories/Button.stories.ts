import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '../components/common/Button';

const meta = {
  title: 'Component/Button',
  component: Button,
  args: {
    primary: true,
    label: 'Button',
    size: 'small' || 'medium' || 'large',
    borderStyle: 'none',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
