import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ColorSwatch } from './ColorSwatch'

const meta = {
  component: ColorSwatch,
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ColorSwatch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Brand Primary',
    hex: '#0047FF',
  },
}

export const WithLabel: Story = {
  args: {
    name: 'Brand Primary',
    hex: '#0047FF',
    label: 'Principal',
  },
}

export const WithVariants: Story = {
  args: {
    name: 'Azul',
    hex: '#0047FF',
    label: 'Cor Principal',
    variants: [
      { shade: '100', hex: '#dbeafe' },
      { shade: '300', hex: '#93c5fd' },
      { shade: '500', hex: '#3b82f6' },
      { shade: '700', hex: '#1d4ed8' },
      { shade: '900', hex: '#1e3a8a' },
    ],
  },
}

export const Secondary: Story = {
  args: {
    name: 'Brand Secondary',
    hex: '#00D4FF',
    label: 'Secundária',
  },
}
