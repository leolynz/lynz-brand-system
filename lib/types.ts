export interface DocMeta {
  title: string
  description: string
  slug: string
  category: string
  order: number
  publishedAt?: string
}

export interface Doc {
  meta: DocMeta
  source: string
}

export interface NavigationItem {
  label: string
  slug: string
}

export interface NavigationSection {
  title: string
  category: string
  items: NavigationItem[]
}
