'use client'

import { useRef } from 'react'

interface AssetsToolbarProps {
  onSearch?: (query: string) => void
  accept?: string
  uploadLabel?: string
}

export function AssetsToolbar({
  onSearch,
  accept,
  uploadLabel = 'Upload',
}: AssetsToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleUploadClick() {
    fileInputRef.current?.click()
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
        className="bg-neutral-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-neutral-700 transition-colors shrink-0"
      >
        {uploadLabel}
      </button>

      {/* Input file oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  )
}
