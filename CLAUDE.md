# CLAUDE.md — Lynz Brand System

Contexto para o Claude Code. Leia também `AGENTS.md` para as regras gerais de agentes.

---

## Projeto

**Lynz Brand System** — web app em Next.js 14 que apresenta as diretrizes de identidade de marca da Lynz via conteúdo MDX navegável.

- Responsável: Leonardo Lins (leolynz@gmail.com)
- Branch principal: `main`
- Deploy: Vercel (automático ao mergear em `main`)
- Fase atual: **Fase 1 — MVP estático com MDX**

---

## Comandos principais

```bash
# Desenvolvimento
npm run dev             # Inicia o servidor local em http://localhost:3000

# Build e verificação
npm run build           # Build de produção (SSG)
npm run type-check      # Verificação TypeScript sem emitir arquivos
npm run lint            # ESLint

# Storybook
npm run storybook       # Inicia Storybook em http://localhost:6006
npm run build-storybook # Build estático do Storybook
```

---

## O que está implementado (Fase 1)

**Componentes:**
- `AppLayout` — layout de duas colunas (sidebar + content)
- `Sidebar`, `SidebarSection`, `SidebarItem` — navegação lateral
- `ContentArea` — área principal com título e categoria
- `MdxRenderer` — renderizador MDX com componentes injetados
- `Callout`, `ColorSwatch`, `DoAndDont`, `TokenTable` — componentes MDX customizados

**Conteúdo MDX:**
- `fundamentos/`: golden-circle, nucleo-da-marca, posicionamento
- `identidade-verbal/`: manifesto, tom-de-voz
- `identidade-visual/`: cores, tipografia
- `aplicacoes/`: digital

**Infraestrutura:**
- Storybook 10 configurado com Vitest, Playwright e addon a11y
- Deploy funcional na Vercel
- Fonte Inter via `next/font/google`

---

## Como adicionar novo conteúdo MDX

1. Crie um arquivo `.mdx` na pasta de categoria correta em `/content/`
2. Inclua o frontmatter obrigatório:

```yaml
---
title: "Título da Seção"
description: "Descrição breve da seção."
slug: "slug-unico"
category: "fundamentos"   # ou: identidade-verbal, identidade-visual, aplicacoes
order: 3                  # ordem na sidebar dentro da categoria
---
```

3. A rota `/docs/[slug]` é gerada automaticamente via `generateStaticParams` em `app/docs/[slug]/page.tsx`
4. A sidebar é atualizada automaticamente via `lib/navigation.ts`

---

## Como adicionar novo componente MDX

1. Crie o componente em `components/mdx-components/NomeDoComponente.tsx`
2. Registre-o no mapa de componentes em `components/MdxRenderer/MdxRenderer.tsx`
3. Crie uma Storybook story em `components/mdx-components/NomeDoComponente.stories.tsx`

---

## Arquivos sensíveis — nunca altere sem revisar

| Arquivo | Risco |
|---|---|
| `next.config.js` | Pode quebrar o build |
| `tailwind.config.ts` | Altera tokens de design globais |
| `tsconfig.json` | Afeta todo o sistema de tipos |
| `app/layout.tsx` | Afeta toda a aplicação |
| `.gitignore` | Pode expor arquivos sensíveis |
| `.vercel/project.json` | Credenciais de projeto Vercel |

---

## Fases futuras (não implementar sem instrução explícita)

- **Fase 2:** Autenticação com Supabase Auth
- **Fase 3:** Banco de dados e storage (Supabase PostgreSQL + Storage)
- **Fase 4:** Domínio customizado e configurações de produção

As variáveis de ambiente para fases futuras estão documentadas em `.env.example`.

---

## Referências

- `AGENTS.md` — regras para todos os agentes de IA
- `docs/spec.md` — spec técnico completo
- `docs/prd.md` — PRD e fases do produto
- `docs/current-state.md` — estado atual detalhado
- `docs/safe-commands.md` — comandos permitidos e proibidos
- `docs/agent-handoff.md` — template de handoff
