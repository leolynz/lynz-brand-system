import { AssetsBanner } from '@/components/assets/AssetsBanner'
import { AssetsToolbar } from '@/components/assets/AssetsToolbar'
import { AssetCard } from '@/components/assets/AssetCard'

export default function CoresPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Banner com gradiente */}
      <AssetsBanner
        title="Cores"
        subtitle="Paletas de cor oficiais, swatches e arquivos de referência cromática"
      />

      {/* Toolbar: busca + upload */}
      <div className="px-8 py-5 border-b border-neutral-200 bg-white">
        <AssetsToolbar
          accept=".json,.css,.ase,.txt"
          uploadLabel="Upload de Paleta"
        />
      </div>

      {/* Grid de cards */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-5 gap-4">
          {/* 6 cards placeholder para preencher visualmente */}
          {Array.from({ length: 6 }).map((_, i) => (
            <AssetCard key={i} placeholder />
          ))}
        </div>
      </div>
    </div>
  )
}
