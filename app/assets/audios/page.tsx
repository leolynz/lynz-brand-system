import { AssetsBanner } from '@/components/assets/AssetsBanner'
import { AssetsToolbar } from '@/components/assets/AssetsToolbar'
import { AssetCard } from '@/components/assets/AssetCard'

export default function AudiosPage() {
  return (
    <div className="flex flex-col min-h-full">
      <AssetsBanner
        title="Áudios"
        subtitle="Trilhas sonoras, jingles e identidade sonora da marca"
      />
      <div className="px-8 py-5 border-b border-neutral-200 bg-white">
        <AssetsToolbar
          accept=".mp3,.wav,.ogg,.aac"
          uploadLabel="Upload de Áudio"
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
