export interface AssetNavItem {
  label: string
  slug: string
  description: string
  accept: string
  icon: string // emoji simples para representar visualmente
}

export const ASSET_NAV_ITEMS: AssetNavItem[] = [
  { label: 'Logotipos', slug: 'logotipos', description: 'Versões do logotipo da marca', accept: '.png,.svg,.jpg,.webp', icon: '◈' },
  { label: 'Cores', slug: 'cores', description: 'Paletas e swatches de cor', accept: '.json,.css,.ase,.txt', icon: '◉' },
  { label: 'Tipografia', slug: 'tipografia', description: 'Fontes e variações tipográficas', accept: '.ttf,.otf,.woff,.woff2', icon: 'Aa' },
  { label: 'Imagens', slug: 'imagens', description: 'Fotos e imagens da marca', accept: '.png,.jpg,.jpeg,.webp,.gif,.svg', icon: '▣' },
  { label: 'Vídeos', slug: 'videos', description: 'Vídeos institucionais e de campanha', accept: '.mp4,.mov,.webm', icon: '▶' },
  { label: 'Áudios', slug: 'audios', description: 'Trilhas sonoras e jingles da marca', accept: '.mp3,.wav,.ogg,.aac', icon: '♫' },
  { label: 'PDFs', slug: 'pdfs', description: 'Documentos e apresentações', accept: '.pdf', icon: '⬜' },
  { label: 'Ícones', slug: 'icones', description: 'Biblioteca de ícones da marca', accept: '.svg,.png', icon: '✦' },
]
