import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Sidebar } from './Sidebar'

const meta = {
  component: Sidebar,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>

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
      { label: 'Ícones', slug: 'icones' },
    ],
  },
  {
    title: 'Identidade Visual',
    category: 'identidade-visual',
    items: [
      { label: 'Logo', slug: 'logo' },
      { label: 'Paleta de Cores', slug: 'paleta' },
      { label: 'Grid e Layout', slug: 'grid' },
    ],
  },
  {
    title: 'Aplicações',
    category: 'aplicacoes',
    items: [
      { label: 'UI Components', slug: 'ui-components' },
      { label: 'Motion', slug: 'motion' },
    ],
  },
]

export const Default: Story = {
  args: { navigation },
}

export const WithActiveItem: Story = {
  args: { navigation, currentSlug: 'tipografia' },
}
