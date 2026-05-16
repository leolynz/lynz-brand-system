import { getAllDocs } from './mdx'
import type { NavigationSection } from './types'

const CATEGORY_LABELS: Record<string, string> = {
  fundamentos: 'Fundamentos',
  'identidade-verbal': 'Identidade Verbal',
  'identidade-visual': 'Identidade Visual',
  aplicacoes: 'Aplicações',
}

const CATEGORY_ORDER = ['fundamentos', 'identidade-verbal', 'identidade-visual', 'aplicacoes']

export async function buildNavigation(): Promise<NavigationSection[]> {
  const docs = await getAllDocs()

  const grouped = CATEGORY_ORDER.map((category) => ({
    title: CATEGORY_LABELS[category],
    category,
    items: docs
      .filter((doc) => doc.category === category)
      .sort((a, b) => a.order - b.order)
      .map((doc) => ({ label: doc.title, slug: doc.slug })),
  }))

  return grouped.filter((section) => section.items.length > 0)
}
