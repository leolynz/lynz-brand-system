interface ContentAreaProps {
  title: string
  description?: string
  category?: string
  children: React.ReactNode
}

const categoryLabels: Record<string, string> = {
  fundamentos: 'Fundamentos',
  'identidade-verbal': 'Identidade Verbal',
  'identidade-visual': 'Identidade Visual',
  aplicacoes: 'Aplicações',
}

export function ContentArea({ title, description, category, children }: ContentAreaProps) {
  return (
    <main className="flex-1 overflow-y-auto no-scrollbar">
      <div className="max-w-3xl mx-auto px-10 py-12">
        {category && (
          <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            {categoryLabels[category] ?? category}
          </span>
        )}
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-base text-neutral-500 mb-10 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
        <div className="border-t border-neutral-100 pt-10">
          {children}
        </div>
      </div>
    </main>
  )
}
