import { clsx } from 'clsx'

interface CalloutProps {
  type?: 'info' | 'warning' | 'danger' | 'tip'
  title?: string
  children: React.ReactNode
}

const styles = {
  info: 'border-blue-200 bg-blue-50 text-blue-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  danger: 'border-red-200 bg-red-50 text-red-900',
  tip: 'border-emerald-200 bg-emerald-50 text-emerald-900',
}

const icons = {
  info: 'ℹ',
  warning: '⚠',
  danger: '✕',
  tip: '✓',
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  return (
    <div className={clsx('my-6 rounded-lg border px-4 py-3', styles[type])}>
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 text-sm shrink-0 select-none">{icons[type]}</span>
        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold text-sm mb-1">{title}</p>}
          <div className="text-sm [&>p]:m-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
