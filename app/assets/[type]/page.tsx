import { createClient } from '@/lib/supabase/server'
import { AssetsBanner } from '@/components/assets/AssetsBanner'
import { AssetsToolbar } from '@/components/assets/AssetsToolbar'
import { AssetCard } from '@/components/assets/AssetCard'
import { ASSET_CATEGORIES, AssetCategory } from '@/lib/constants'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    type: string
  }
}

export default async function AssetCategoryPage({ params }: PageProps) {
  const category = params.type as AssetCategory
  const categoryData = ASSET_CATEGORIES[category]

  if (!categoryData) {
    notFound()
  }

  const supabase = createClient()
  
  // 1. Check user role
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id as string)
    .single()
  
  const isAdmin = profile?.role === 'admin'

  // 2. Fetch assets
  const { data: assets } = await supabase
    .from('assets')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col min-h-full w-full bg-white">
      {/* Banner com gradiente */}
      <AssetsBanner
        title={categoryData.title}
        subtitle={categoryData.subtitle}
      />

      {/* Toolbar: busca + upload */}
      <div className="px-8 py-5 border-b border-neutral-200 bg-white">
        <AssetsToolbar
          category={category}
          accept={categoryData.accept}
          uploadLabel={`Upload de ${categoryData.title.slice(0, -1)}`}
        />
      </div>

      {/* Grid de cards */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {assets?.map((asset) => (
            <AssetCard
              key={asset.id}
              id={asset.id}
              name={asset.name}
              size={asset.size.toString()}
              type={asset.type}
              storagePath={asset.storage_path}
              isAdmin={isAdmin}
            />
          ))}
          
          {(!assets || assets.length === 0) && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-100 rounded-2xl">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-20">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className="text-sm font-medium">Nenhum ativo encontrado</p>
              <p className="text-xs opacity-60">Faça o upload do primeiro arquivo para começar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
