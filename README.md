# Lynz Brand System

Plataforma web que centraliza e apresenta as diretrizes de identidade de marca da Lynz. O conteúdo é escrito em MDX, versionado em Git e servido como HTML estático via Next.js e Vercel.

---

## Stack

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + @tailwindcss/typography
- **Conteúdo:** MDX via next-mdx-remote v6 + gray-matter
- **Componentes:** Storybook 10 com Vitest e addon a11y
- **Deploy:** Vercel

---

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

---

## Comandos disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia o build de produção localmente |
| `npm run lint` | Verifica linting (ESLint) |
| `npm run type-check` | Verifica tipos TypeScript |
| `npm run storybook` | Inicia o Storybook em `:6006` |
| `npm run build-storybook` | Build estático do Storybook |

---

## Estrutura de pastas

```
lynz-brand-system/
├── app/                    # Rotas Next.js (App Router)
│   ├── layout.tsx          # Layout global com fonte e metadados
│   ├── page.tsx            # Página inicial
│   └── docs/[slug]/        # Páginas dinâmicas de cada diretriz
├── components/             # Componentes React
│   ├── Layout/             # AppLayout (sidebar + content)
│   ├── Sidebar/            # Navegação lateral
│   ├── ContentArea/        # Área principal de conteúdo
│   ├── MdxRenderer/        # Renderizador MDX
│   ├── mdx-components/     # Componentes usáveis dentro dos MDX
│   └── ui/                 # Componentes genéricos
├── content/                # Arquivos .mdx das diretrizes
│   ├── fundamentos/
│   ├── identidade-verbal/
│   ├── identidade-visual/
│   └── aplicacoes/
├── lib/                    # Utilitários
│   ├── mdx.ts              # Leitura e parse dos arquivos MDX
│   ├── navigation.ts       # Geração da sidebar
│   └── types.ts            # Tipos TypeScript compartilhados
├── docs/                   # Documentação do projeto
└── public/                 # Fontes e imagens estáticas
```

---

## Adicionando conteúdo

Crie um arquivo `.mdx` em `/content/<categoria>/` com o frontmatter obrigatório:

```yaml
---
title: "Nome da Seção"
description: "Descrição breve."
slug: "nome-da-secao"
category: "identidade-visual"
order: 3
---
```

A rota `/docs/[slug]` e o item na sidebar são gerados automaticamente.

---

## Documentação

| Arquivo | Conteúdo |
|---|---|
| `AGENTS.md` | Regras para agentes de IA |
| `CLAUDE.md` | Contexto específico para Claude Code |
| `docs/briefing.md` | Briefing do projeto |
| `docs/prd.md` | PRD com fases e user stories |
| `docs/spec.md` | Spec técnico completo |
| `docs/ui-plan.md` | Especificação de UI e componentes |
| `docs/current-state.md` | Estado atual de implementação |
| `docs/safe-commands.md` | Comandos seguros para agentes |
| `docs/agent-handoff.md` | Template de handoff entre agentes |

---

## Fase atual

**Fase 1 — MVP estático com MDX.** Sem banco de dados, sem autenticação.  
Próxima fase planejada: autenticação com Supabase Auth.  
Detalhes em `docs/prd.md`.
