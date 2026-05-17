import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SidebarSection } from './SidebarSection'

const meta = {
  component: SidebarSection,
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SidebarSection>

export default meta
type Story = StoryObj<typeof meta>

const section = {
  title: 'Fundamentos',
  category: 'fundamentos',
  items: [
    { label: 'Cores', slug: 'cores' },
    { label: 'Tipografia', slug: 'tipografia' },
    { label: 'Espaçamento', slug: 'espacamento' },
    { label: 'Ícones', slug: 'icones' },
  ],
}

export const Default: Story = {
  args: { section },
}

export const WithActiveItem: Story = {
  args: { section, currentSlug: 'tipografia' },
}

export const IdentidadeVisual: Story = {
  args: {
    section: {
      title: 'Identidade Visual',
      category: 'identidade-visual',
      items: [
        { label: 'Logo', slug: 'logo' },
        { label: 'Paleta de Cores', slug: 'paleta' },
        { label: 'Grid e Layout', slug: 'grid' },
      ],
    },
  },
}
