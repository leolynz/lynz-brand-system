'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface AssetCardProps {
  id?: string
  name?: string
  size?: string
  type?: string
  storagePath?: string
  placeholder?: boolean
  isAdmin?: boolean
}

function FileIcon({ type }: { type?: string }) {
  if (!type) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-neutral-400"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  }

  if (type.startsWith('image/')) return <span className="text-3xl">▣</span>
  if (type.startsWith('video/')) return <span className="text-3xl">▶</span>
  if (type.startsWith('audio/')) return <span className="text-3xl">♫</span>
  if (type.includes('pdf')) return <span className="text-3xl">⬜</span>
  
  return <span className="text-3xl">📄</span>
}

export function AssetCard({ 
  id, 
  name, 
  size, 
  type, 
  storagePath,
  placeholder = false,
  isAdmin = false
}: AssetCardProps) {
  const [deleting, setDeleting] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleDelete = async () => {
    if (!id || !storagePath) return
    if (!confirm(`Excluir "${name}"?`)) return

    setDeleting(true)
    try {
      // 1. Delete from Storage
      const { error: storageError } = await supabase.storage
        .from('brand-assets')
        .remove([storagePath])
      
      if (storageError) throw storageError

      // 2. Delete from Database
      const { error: dbError } = await supabase
        .from('assets')
        .delete()
        .eq('id', id)

      if (dbError) throw dbError

      router.refresh()
    } catch (error: any) {
      alert(`Erro ao excluir: ${error.message}`)
      setDeleting(false)
    }
  }

  const handleDownload = async () => {
    if (!storagePath) return
    const { data } = await supabase.storage
      .from('brand-assets')
      .createSignedUrl(storagePath, 60)
    
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank')
    }
  }

  if (placeholder) {
    return (
      <div className="border border-dashed border-neutral-300 rounded-xl overflow-hidden aspect-[4/3] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-neutral-400 hover:bg-neutral-50 transition-colors">
        <span className="text-2xl text-neutral-400 select-none" aria-hidden="true">+</span>
        <span className="text-xs text-neutral-400">Adicionar ativo</span>
      </div>
    )
  }

  return (
    <div className={`group border border-neutral-200 rounded-xl overflow-hidden aspect-[4/3] flex flex-col relative ${deleting ? 'opacity-50 grayscale' : ''}`}>
      {/* Área de preview (70%) */}
      <div 
        className="flex-[7] bg-neutral-100 flex items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors"
        onClick={handleDownload}
      >
        <FileIcon type={type} />
        
        {/* Overlay com botão de download/visualizar */}
        <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors flex items-center justify-center">
           <span className="opacity-0 group-hover:opacity-100 bg-white text-neutral-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm transition-opacity uppercase">
             Download
           </span>
        </div>
      </div>

      {/* Área de metadados (30%) */}
      <div className="flex-[3] px-3 py-2 bg-white border-t border-neutral-100 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-medium text-neutral-800 truncate" title={name}>
            {name ?? 'Sem título'}
          </p>
          {size && (
            <p className="text-[10px] text-neutral-400 uppercase">
              {(parseInt(size) / 1024).toFixed(1)} KB
            </p>
          )}
        </div>

        {isAdmin && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-[10px] text-red-400 hover:text-red-600 font-bold uppercase transition-colors shrink-0"
          >
            {deleting ? '...' : 'Excluir'}
          </button>
        )}
      </div>
    </div>
  )
}
