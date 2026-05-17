import { AssetsBanner } from '@/components/assets/AssetsBanner'
import { AssetsToolbar } from '@/components/assets/AssetsToolbar'
import { AssetCard } from '@/components/assets/AssetCard'

export default function LogotiposPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Banner com gradiente */}
      <AssetsBanner
        title="Logotipos"
        subtitle="Versões oficiais do logotipo da Lynz em diferentes formatos e variações"
      />

      {/* Toolbar: busca + upload */}
      <div className="px-8 py-5 border-b border-neutral-200 bg-white">
        <AssetsToolbar
          accept=".png,.svg,.jpg,.webp"
          uploadLabel="Upload de Logotipo"
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
