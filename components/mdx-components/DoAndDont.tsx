interface DoAndDontProps {
  doExample: React.ReactNode
  dontExample: React.ReactNode
  doLabel?: string
  dontLabel?: string
}

export function DoAndDont({
  doExample,
  dontExample,
  doLabel = 'Correto',
  dontLabel = 'Incorreto',
}: DoAndDontProps) {
  return (
    <div className="my-6 grid grid-cols-2 gap-4">
      <div className="rounded-lg border border-emerald-200 overflow-hidden">
        <div className="px-3 py-2 bg-emerald-50 border-b border-emerald-200">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
            {doLabel}
          </span>
        </div>
        <div className="p-4">{doExample}</div>
      </div>

      <div className="rounded-lg border border-red-200 overflow-hidden">
        <div className="px-3 py-2 bg-red-50 border-b border-red-200">
          <span className="text-xs font-semibold text-red-700 uppercase tracking-widest">
            {dontLabel}
          </span>
        </div>
        <div className="p-4">{dontExample}</div>
      </div>
    </div>
  )
}
