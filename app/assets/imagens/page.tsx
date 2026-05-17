import { AssetsBanner } from '@/components/assets/AssetsBanner'
import { AssetsToolbar } from '@/components/assets/AssetsToolbar'
import { AssetCard } from '@/components/assets/AssetCard'

export default function ImagensPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Banner com gradiente */}
      <AssetsBanner
        title="Imagens"
        subtitle="Fotos, ilustrações e elementos visuais da identidade da marca"
      />

      {/* Toolbar: busca + upload */}
      <div className="px-8 py-5 border-b border-neutral-200 bg-white">
        <AssetsToolbar
          accept=".png,.jpg,.jpeg,.webp,.gif,.svg"
          uploadLabel="Upload de Imagem"
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
