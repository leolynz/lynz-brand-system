'use client'

import Link from 'next/link'

export function LoginForm() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-semibold text-neutral-900 mb-8">
        Bem-vindo de volta
      </h1>

      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
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
            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
          />
        </div>

        {/* Botão Entrar */}
        <button
          type="submit"
          className="w-full bg-neutral-900 text-white text-sm font-medium rounded-lg px-4 py-2.5 hover:bg-neutral-700 transition-colors mt-1"
        >
          Entrar
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
