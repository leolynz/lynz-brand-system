import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AppLayout } from './AppLayout'

const meta = {
  component: AppLayout,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppLayout>

export default meta
type Story = StoryObj<typeof meta>

const navigation = [
  {
    title: 'Fundamentos',
    category: 'fundamentos',
    items: [
      { label: 'Cores', slug: 'cores' },
      { label: 'Tipografia', slug: 'tipografia' },
      { label: 'Espaçamento', slug: 'espacamento' },
    ],
  },
  {
    title: 'Identidade Visual',
    category: 'identidade-visual',
    items: [
      { label: 'Logo', slug: 'logo' },
      { label: 'Paleta de Cores', slug: 'paleta' },
    ],
  },
]

export const Default: Story = {
  args: {
    navigation,
    children: (
      <main className="flex-1 overflow-y-auto px-10 py-12">
        <h1 className="text-3xl font-semibold text-neutral-900 mb-3">Cores</h1>
        <p className="text-neutral-500">
          A paleta de cores da Lynz.
        </p>
      </main>
    ),
  },
}

export const WithActiveItem: Story = {
  args: {
    navigation,
    currentSlug: 'cores',
    children: (
      <main className="flex-1 overflow-y-auto px-10 py-12">
        <h1 className="text-3xl font-semibold text-neutral-900 mb-3">Cores</h1>
        <p className="text-neutral-500">
          Item ativo destacado na sidebar.
        </p>
      </main>
    ),
  },
}
