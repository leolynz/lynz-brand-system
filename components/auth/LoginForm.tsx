'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    console.log('Attempting login for:', email)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error details:', error)
      alert(`Erro no Login: ${error.message}`)
      setError(error.message)
      setLoading(false)
    } else {
      console.log('Login successful, forcing hard redirect...')
      window.location.href = '/'
    }
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-semibold text-neutral-900 mb-8">
        Bem-vindo de volta
      </h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-neutral-700">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
          />
        </div>

        {/* Senha */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-neutral-700">
              Senha
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Esqueci minha senha
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 font-medium">{error}</p>
        )}

        {/* Botão Entrar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-neutral-900 text-white text-sm font-medium rounded-lg px-4 py-2.5 hover:bg-neutral-700 transition-colors mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {/* Link de cadastro */}
      <p className="mt-6 text-sm text-neutral-500 text-center">
        Não tem conta?{' '}
        <Link
          href="/signup"
          className="text-neutral-900 font-medium hover:underline"
        >
          Criar conta
        </Link>
      </p>
    </div>
  )
}
