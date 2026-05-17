import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DoAndDont } from './DoAndDont'

const meta = {
  component: DoAndDont,
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DoAndDont>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    doExample: <p style={{ fontSize: '1rem', fontWeight: 600 }}>Lynz</p>,
    dontExample: <p style={{ fontSize: '0.75rem', fontWeight: 400 }}>lynz</p>,
  },
}

export const CustomLabels: Story = {
  args: {
    doLabel: 'Use assim',
    dontLabel: 'Não use assim',
    doExample: <p>Texto com contraste adequado sobre fundo branco.</p>,
    dontExample: <p style={{ color: '#bbb' }}>Texto com baixo contraste.</p>,
  },
}

export const TypographyExample: Story = {
  args: {
    doLabel: 'Correto',
    dontLabel: 'Incorreto',
    doExample: (
      <p style={{ fontFamily: 'sans-serif', lineHeight: 1.6 }}>
        Corpo do texto com espaçamento confortável.
      </p>
    ),
    dontExample: (
      <p style={{ fontFamily: 'serif', lineHeight: 1 }}>
        Texto apertado e difícil de ler.
      </p>
    ),
  },
}
