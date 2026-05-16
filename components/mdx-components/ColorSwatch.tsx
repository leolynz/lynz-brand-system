interface ColorVariant {
  shade: string
  hex: string
}

interface ColorSwatchProps {
  name: string
  hex: string
  label?: string
  variants?: ColorVariant[]
}

export function ColorSwatch({ name, hex, label, variants }: ColorSwatchProps) {
  return (
    <div className="my-6 flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-lg border border-black/10 shrink-0"
          style={{ backgroundColor: hex }}
        />
        <div>
          {label && (
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              {label}
            </span>
          )}
          <p className="text-base font-semibold text-neutral-900">{name}</p>
          <p className="text-sm font-mono text-neutral-500">{hex}</p>
        </div>
      </div>

      {variants && variants.length > 0 && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {variants.map((v) => (
            <div key={v.shade} className="flex flex-col items-center gap-1">
              <div
                className="w-10 h-10 rounded-md border border-black/10"
                style={{ backgroundColor: v.hex }}
              />
              <span className="text-xs text-neutral-500 font-mono">{v.shade}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
