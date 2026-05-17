export const ASSET_CATEGORIES = {
  logotipos: {
    title: 'Logotipos',
    subtitle: 'Versões oficiais do logotipo da Lynz em diferentes formatos e variações',
    accept: '.png,.svg,.jpg,.webp'
  },
  icones: {
    title: 'Ícones',
    subtitle: 'Conjunto de ícones proprietários para interface e sinalização',
    accept: '.svg,.png'
  },
  cores: {
    title: 'Cores',
    subtitle: 'Paleta cromática oficial e amostras de cores',
    accept: '.json,.ase,.png'
  },
  tipografia: {
    title: 'Tipografia',
    subtitle: 'Fontes oficiais e diretrizes de hierarquia visual',
    accept: '.ttf,.otf,.woff,.woff2'
  },
  imagens: {
    title: 'Imagens',
    subtitle: 'Banco de imagens e diretrizes de direção de arte',
    accept: '.jpg,.jpeg,.png,.webp'
  },
  videos: {
    title: 'Vídeos',
    subtitle: 'Materiais audiovisuais e vinhetas da marca',
    accept: '.mp4,.mov,.webm'
  },
  audios: {
    title: 'Áudios',
    subtitle: 'Identidade sonora e trilhas oficiais',
    accept: '.mp3,.wav'
  },
  pdfs: {
    title: 'PDFs',
    subtitle: 'Documentos, manuais e materiais de apresentação',
    accept: '.pdf'
  }
} as const

export type AssetCategory = keyof typeof ASSET_CATEGORIES
