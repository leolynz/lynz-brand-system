import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ContentArea } from './ContentArea'

const meta = {
  component: ContentArea,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ContentArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Cores',
    description: 'A paleta de cores da Lynz reflete nossa identidade visual e garante consistência em todas as aplicações.',
    category: 'identidade-visual',
    children: (
      <p className="text-neutral-600">
        Conteúdo da página de cores aqui.
      </p>
    ),
  },
}

export const WithoutDescription: Story = {
  args: {
    title: 'Tipografia',
    category: 'fundamentos',
    children: (
      <p className="text-neutral-600">
        Conteúdo sem descrição introdutória.
      </p>
    ),
  },
}

export const WithoutCategory: Story = {
  args: {
    title: 'Visão Geral',
    description: 'Bem-vindo ao Lynz Brand System.',
    children: (
      <p className="text-neutral-600">
        Página sem categoria definida.
      </p>
    ),
  },
}
