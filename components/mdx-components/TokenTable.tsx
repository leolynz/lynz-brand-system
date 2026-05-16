interface Token {
  name: string
  value: string
  description?: string
}

interface TokenTableProps {
  tokens: Token[]
}

export function TokenTable({ tokens }: TokenTableProps) {
  if (!tokens?.length) return null

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-neutral-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-neutral-500 uppercase tracking-widest">
              Token
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-neutral-500 uppercase tracking-widest">
              Valor
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-neutral-500 uppercase tracking-widest">
              Descrição
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => (
            <tr
              key={token.name}
              className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}
            >
              <td className="px-4 py-2.5 font-mono text-neutral-800">{token.name}</td>
              <td className="px-4 py-2.5 font-mono text-neutral-600">{token.value}</td>
              <td className="px-4 py-2.5 text-neutral-500">{token.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
