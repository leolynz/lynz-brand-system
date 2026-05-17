import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TokenTable } from './TokenTable'

const meta = {
  component: TokenTable,
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TokenTable>

export default meta
type Story = StoryObj<typeof meta>

export const Colors: Story = {
  args: {
    tokens: [
      { name: '--color-brand-primary', value: '#0047FF', description: 'Cor principal da marca' },
      { name: '--color-brand-secondary', value: '#00D4FF', description: 'Cor secundária da marca' },
      { name: '--color-neutral-900', value: '#171717', description: 'Texto principal' },
      { name: '--color-neutral-500', value: '#737373', description: 'Texto secundário' },
    ],
  },
}

export const Spacing: Story = {
  args: {
    tokens: [
      { name: '--spacing-1', value: '4px', description: '0.25rem' },
      { name: '--spacing-2', value: '8px', description: '0.5rem' },
      { name: '--spacing-4', value: '16px', description: '1rem' },
      { name: '--spacing-8', value: '32px', description: '2rem' },
      { name: '--spacing-16', value: '64px', description: '4rem' },
    ],
  },
}

export const Typography: Story = {
  args: {
    tokens: [
      { name: '--font-sans', value: 'Inter, system-ui', description: 'Fonte padrão' },
      { name: '--font-display', value: 'Sora, system-ui', description: 'Fonte de destaque' },
      { name: '--font-mono', value: 'JetBrains Mono, monospace', description: 'Fonte monospace' },
    ],
  },
}
