import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { Callout } from './Callout'

const meta = {
  component: Callout,
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Callout>

export default meta
type Story = StoryObj<typeof meta>

// Única CssCheck do projeto — bg-blue-50 = rgb(239, 246, 255): falha se o Tailwind não carregou
export const CssCheck: Story = {
  args: { type: 'info', children: 'Verificação de estilos do Tailwind.' },
  play: async ({ canvasElement }) => {
    const el = canvasElement.firstElementChild as HTMLElement
    await expect(getComputedStyle(el).backgroundColor).toBe('rgb(239, 246, 255)')
  },
}

export const Info: Story = {
  args: { type: 'info', children: 'Este é um callout informativo.' },
}

export const Warning: Story = {
  args: { type: 'warning', children: 'Atenção a este ponto importante.' },
}

export const Danger: Story = {
  args: { type: 'danger', children: 'Evite usar este padrão em produção.' },
}

export const Tip: Story = {
  args: { type: 'tip', children: 'Uma dica útil para melhorar a experiência.' },
}

export const WithTitle: Story = {
  args: {
    type: 'info',
    title: 'Importante',
    children: 'Este callout tem um título descritivo.',
  },
}
