interface AssetCardProps {
  name?: string
  size?: string
  type?: string
  placeholder?: boolean
}

function FileIcon({ type }: { type?: string }) {
  if (!type) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-neutral-400"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  }

  const typeMap: Record<string, string> = {
    image: '▣',
    video: '▶',
    audio: '♫',
    pdf: '⬜',
    font: 'Aa',
    svg: '◈',
    icon: '✦',
    color: '◉',
  }

  const emoji = typeMap[type.toLowerCase()] ?? '📄'

  return (
    <span className="text-3xl select-none" aria-hidden="true">
      {emoji}
    </span>
  )
}

export function AssetCard({ name, size, type, placeholder = false }: AssetCardProps) {
  if (placeholder) {
    return (
      <div className="border border-dashed border-neutral-300 rounded-xl overflow-hidden aspect-[4/3] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-neutral-400 hover:bg-neutral-50 transition-colors">
        <span className="text-2xl text-neutral-400 select-none" aria-hidden="true">+</span>
        <span className="text-xs text-neutral-400">Adicionar ativo</span>
      </div>
    )
  }

  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden aspect-[4/3] flex flex-col">
      {/* Área de preview (70%) */}
      <div className="flex-[7] bg-neutral-100 flex items-center justify-center">
        <FileIcon type={type} />
      </div>

      {/* Área de metadados (30%) */}
      <div className="flex-[3] px-3 py-2 bg-white border-t border-neutral-100">
        <p className="text-xs font-medium text-neutral-800 truncate" title={name}>
          {name ?? 'Sem título'}
        </p>
        {size && (
          <p className="text-xs text-neutral-400">{size}</p>
        )}
      </div>
    </div>
  )
}
