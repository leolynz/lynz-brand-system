import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { SidebarItem } from './SidebarItem'

const meta = {
  component: SidebarItem,
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SidebarItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Cores', slug: 'cores', isActive: false },
}

export const Active: Story = {
  args: { label: 'Tipografia', slug: 'tipografia', isActive: true },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Tipografia' })
    await expect(link).toHaveAttribute('aria-current', 'page')
  },
}

export const LongLabel: Story = {
  args: { label: 'Identidade Visual e Expressão de Marca', slug: 'identidade-visual', isActive: false },
}
