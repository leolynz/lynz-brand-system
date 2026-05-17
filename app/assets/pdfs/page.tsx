import { AssetsBanner } from '@/components/assets/AssetsBanner'
import { AssetsToolbar } from '@/components/assets/AssetsToolbar'
import { AssetCard } from '@/components/assets/AssetCard'

export default function PdfsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <AssetsBanner
        title="PDFs"
        subtitle="Documentos, apresentações e materiais institucionais em PDF"
      />
      <div className="px-8 py-5 border-b border-neutral-200 bg-white">
        <AssetsToolbar
          accept=".pdf"
          uploadLabel="Upload de PDF"
        />
      </div>
      <div className="flex-1 p-8">
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <AssetCard key={i} placeholder />
          ))}
        </div>
      </div>
    </div>
  )
}
