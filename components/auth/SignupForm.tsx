'use client'

import Link from 'next/link'

export function SignupForm() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-semibold text-neutral-900">Criar conta</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Preencha os dados abaixo para começar
      </p>

      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-neutral-700">
            Nome completo
          </label>
          <input
            id="name"
            type="text"
            placeholder="Seu nome"
            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-neutral-700">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-neutral-700">
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirm-password" className="text-sm font-medium text-neutral-700">
            Confirmar senha
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Repita a senha"
            className="border border-neutral-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
        >
          Criar conta
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-neutral-500">
        Já tem conta?{' '}
        <Link href="/login" className="font-medium text-neutral-900 hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  )
}
