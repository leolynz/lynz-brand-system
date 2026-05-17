# AGENTS.md — Lynz Brand System

Regras universais para qualquer agente de IA (Claude Code, Codex, Gemini CLI ou qualquer outro) que trabalhe neste repositório.

Leia este arquivo por completo antes de executar qualquer ação.

---

## Contexto do projeto

**Lynz Brand System** é uma aplicação web em Next.js 14 (App Router) que centraliza e apresenta as diretrizes de identidade de marca da Lynz. O conteúdo é escrito em MDX e o sistema é deployado na Vercel.

- Stack: Next.js 14, TypeScript, Tailwind CSS, next-mdx-remote v6, Storybook 10
- Fase atual: **Fase 1 — MVP estático com MDX**
- Deploy: Vercel (projeto já conectado)
- Documentação técnica completa: `docs/spec.md`, `docs/prd.md`, `docs/briefing.md`, `docs/ui-plan.md`
- Estado atual detalhado: `docs/current-state.md`

---

## Princípios de operação

### 1. Escopo limitado
- Trabalhe **apenas nos arquivos relacionados à tarefa** que recebeu.
- Antes de modificar qualquer arquivo, verifique se ele está dentro do escopo declarado.
- Se a tarefa exigir tocar em arquivos fora do escopo, **pare e informe** antes de continuar.

### 2. Alterações pequenas e rastreáveis
- Prefira mudanças incrementais a reescritas grandes.
- Não refatore código que não é parte da tarefa.
- Não adicione abstrações, utilitários ou features não solicitadas.

### 3. Preservar padrões existentes
- Preserve a arquitetura de componentes definida em `docs/spec.md`.
- Preserve os padrões visuais definidos em `docs/ui-plan.md`.
- Preserve o estilo de código TypeScript existente (strict, sem `any` explícito).
- Preserve a estrutura de pastas atual.

### 4. Sem ações destrutivas sem autorização
Nunca execute os seguintes comandos sem autorização explícita do responsável:

```
# PROIBIDOS sem autorização
rm -rf
git reset --hard
git push --force
git push origin main
npm install <pacote>          # alteração de package.json
npm uninstall <pacote>
npx vercel --prod             # deploy em produção
npx vercel deploy             # qualquer deploy
```

Consulte `docs/safe-commands.md` para a lista completa de comandos permitidos e restritos.

### 5. Secrets e variáveis de ambiente
- **Nunca leia, imprima ou exponha** o conteúdo de `.env.local`.
- **Nunca commite** `.env.local` ou qualquer arquivo com credenciais reais.
- O arquivo `.env.example` pode ser lido e editado (contém apenas exemplos sem valores reais).
- As variáveis de ambiente de produção ficam no painel da Vercel — nunca no repositório.

### 6. Sem migrations, seeds ou alterações de banco
- O projeto está na **Fase 1** — não há banco de dados.
- Qualquer referência a Supabase, PostgreSQL, migrations ou seeds é para **fases futuras**.
- Não execute comandos de banco de dados neste momento.

### 7. Sem deploy sem autorização
- Não execute `vercel`, `vercel --prod` ou qualquer comando de deploy.
- Não modifique arquivos de configuração da Vercel (`.vercel/`, `vercel.json`).
- Não altere configurações de CI/CD.

---

## Ao final de cada tarefa

Todo agente deve entregar um resumo com:

1. **Objetivo da tarefa** recebida
2. **Arquivos analisados** (apenas leitura)
3. **Arquivos modificados** (com o que mudou em cada um)
4. **Arquivos criados** (com propósito de cada um)
5. **Comandos executados**
6. **Como testar** as alterações
7. **Pendências** ou decisões que precisam de revisão humana
8. **Riscos identificados**

Use o template em `docs/agent-handoff.md` ao fazer handoff para outro agente.

---

## O que nunca deve ser feito sem autorização explícita

| Ação | Motivo |
|---|---|
| Alterar `package.json` ou `package-lock.json` | Pode introduzir dependências incompatíveis |
| Executar `npm install` com novos pacotes | Idem |
| Alterar `tailwind.config.ts` | Tokens de design são decisão de produto |
| Alterar `next.config.js` | Pode quebrar o build |
| Alterar `tsconfig.json` | Pode afetar todo o sistema de tipos |
| Remover ou renomear arquivos de conteúdo MDX | Quebra rotas existentes |
| Modificar a estrutura de pastas principal | Quebra imports e convenções |
| Fazer push para a branch `main` | Dispara deploy automático |
| Alterar `.gitignore` | Pode expor arquivos sensíveis |
| Criar branches sem informar | Dificulta rastreabilidade |

---

## Convenções de código

- **TypeScript strict:** sem `any` explícito; use tipos do `lib/types.ts` quando disponíveis
- **Componentes:** PascalCase; um componente por arquivo; arquivo `.tsx`
- **Utilitários:** camelCase; arquivo `.ts`
- **Classes Tailwind:** use `clsx` + `tailwind-merge` para composição condicional
- **Sem comentários óbvios:** comente apenas o "por quê", nunca o "o quê"
- **Frontmatter MDX:** campos `title`, `description`, `slug`, `category`, `order` são obrigatórios

## Convenções de UI

- Interface neutra — a marca é o conteúdo, não a UI
- Scrollbars ocultas via `.no-scrollbar` (definida em `globals.css`)
- Sidebar: largura fixa `~240px`; colapsável em mobile
- Tipografia base: Inter (carregada via `next/font/google`)
- Tokens de cor da marca em `tailwind.config.ts` (`brand.primary`, `brand.secondary`)
- Acessibilidade WCAG 2.1 AA: contraste 4.5:1, focus rings visíveis, ARIA labels

---

## Estrutura principal de pastas

```
lynz-brand-system/
├── app/                    # Rotas Next.js (App Router)
│   ├── layout.tsx          # RootLayout global
│   ├── page.tsx            # Página inicial
│   └── docs/[slug]/        # Página dinâmica de cada diretriz
├── components/             # Componentes React
│   ├── Layout/             # AppLayout
│   ├── Sidebar/            # Sidebar, SidebarItem, SidebarSection
│   ├── ContentArea/        # ContentArea
│   ├── MdxRenderer/        # MdxRenderer
│   ├── mdx-components/     # Callout, ColorSwatch, DoAndDont, TokenTable
│   └── ui/                 # Componentes genéricos de UI
├── content/                # Arquivos MDX das diretrizes
│   ├── fundamentos/
│   ├── identidade-verbal/
│   ├── identidade-visual/
│   └── aplicacoes/
├── lib/                    # Utilitários TypeScript
│   ├── mdx.ts              # Leitura e parse dos arquivos MDX
│   ├── navigation.ts       # Construção da árvore de navegação
│   └── types.ts            # Tipos compartilhados
├── docs/                   # Documentação do projeto
└── public/                 # Arquivos estáticos
```

---

## Referências

- Spec técnico completo: `docs/spec.md`
- PRD e fases do produto: `docs/prd.md`
- Briefing do projeto: `docs/briefing.md`
- Plano de UI: `docs/ui-plan.md`
- Estado atual: `docs/current-state.md`
- Comandos seguros: `docs/safe-commands.md`
- Template de handoff: `docs/agent-handoff.md`
