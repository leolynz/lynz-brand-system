'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface AssetsToolbarProps {
  category: string
  onSearch?: (query: string) => void
  accept?: string
  uploadLabel?: string
}

export function AssetsToolbar({
  category,
  onSearch,
  accept,
  uploadLabel = 'Upload',
}: AssetsToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  function handleUploadClick() {
    fileInputRef.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Não autenticado')

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${category}/${fileName}`

      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('brand-assets')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Save to Database
      const { error: dbError } = await supabase
        .from('assets')
        .insert({
          name: file.name,
          type: file.type,
          category: category,
          storage_path: filePath,
          size: file.size,
          uploaded_by: user.id
        })

      if (dbError) throw dbError

      router.refresh()
    } catch (error: any) {
      alert(`Erro no upload: ${error.message}`)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex items-center gap-3">
      {/* Campo de busca */}
      <label className="flex items-center gap-2 border border-neutral-200 rounded-full px-4 py-2 bg-white text-sm flex-1 focus-within:ring-2 focus-within:ring-neutral-900 cursor-text">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-neutral-400 shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder="Buscar ativos..."
          className="flex-1 bg-transparent outline-none text-neutral-700 placeholder:text-neutral-400"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </label>

      {/* Botão de upload */}
      <button
        type="button"
        onClick={handleUploadClick}
        disabled={uploading}
        className="bg-neutral-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-neutral-700 transition-colors shrink-0 disabled:opacity-50"
      >
        {uploading ? 'Enviando...' : uploadLabel}
      </button>

      {/* Input file oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  )
}
