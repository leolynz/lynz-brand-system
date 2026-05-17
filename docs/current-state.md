# Estado Atual — Lynz Brand System

**Atualizado em:** 2026-05-17  
**Fase atual:** Fase 1 — MVP estático com MDX  
**Branch principal:** `main`

---

## O que está implementado

### Infraestrutura

| Item | Status | Observações |
|---|---|---|
| Projeto Next.js 14 (App Router) | ✅ Funcionando | Build e dev funcionais |
| TypeScript (strict mode) | ✅ Configurado | `tsconfig.json` com paths `@/*` |
| Tailwind CSS | ✅ Configurado | Tokens `brand.primary` e `brand.secondary` |
| next-mdx-remote v6 | ✅ Configurado | Upgrade feito de v4 para v6 |
| Fonte Inter | ✅ Configurada | Via `next/font/google`, variável `--font-sans` |
| ESLint | ✅ Configurado | `eslint-config-next` + `eslint-plugin-storybook` |
| Storybook 10 | ✅ Configurado | Com Vitest, Playwright, addon-a11y, addon-docs |
| Deploy Vercel | ✅ Conectado | Deploy automático no push para `main` |

### Componentes de layout

| Componente | Arquivo | Story | Status |
|---|---|---|---|
| `AppLayout` | `components/Layout/AppLayout.tsx` | ✅ | ✅ Implementado |
| `Sidebar` | `components/Sidebar/Sidebar.tsx` | ✅ | ✅ Implementado |
| `SidebarSection` | `components/Sidebar/SidebarSection.tsx` | ✅ | ✅ Implementado |
| `SidebarItem` | `components/Sidebar/SidebarItem.tsx` | ✅ | ✅ Implementado |
| `ContentArea` | `components/ContentArea/ContentArea.tsx` | ✅ | ✅ Implementado |
| `MdxRenderer` | `components/MdxRenderer/MdxRenderer.tsx` | — | ✅ Implementado |

### Componentes MDX customizados

| Componente | Arquivo | Story | Status |
|---|---|---|---|
| `Callout` | `components/mdx-components/Callout.tsx` | ✅ | ✅ Implementado |
| `ColorSwatch` | `components/mdx-components/ColorSwatch.tsx` | ✅ | ✅ Implementado |
| `DoAndDont` | `components/mdx-components/DoAndDont.tsx` | ✅ | ✅ Implementado |
| `TokenTable` | `components/mdx-components/TokenTable.tsx` | ✅ | ✅ Implementado |
| `TypographyScale` | — | — | ❌ Não implementado |
| `LogoDisplay` | — | — | ❌ Não implementado |

### Componentes genéricos de UI

| Componente | Arquivo | Status |
|---|---|---|
| `Badge` | `components/ui/` | ❓ Verificar — pasta existe mas pode estar vazia |
| `Divider` | `components/ui/` | ❓ Verificar — pasta existe mas pode estar vazia |

### Utilitários

| Arquivo | Status | Observações |
|---|---|---|
| `lib/types.ts` | ✅ Implementado | Tipos `DocMeta`, `Doc`, `NavigationItem`, `NavigationSection` |
| `lib/mdx.ts` | ✅ Implementado | Funções `getAllDocs`, `getDocBySlug` |
| `lib/navigation.ts` | ✅ Implementado | Função `buildNavigation`, mapa de categorias |

### Rotas

| Rota | Arquivo | Status |
|---|---|---|
| `/` | `app/page.tsx` | ✅ Implementada |
| `/docs/[slug]` | `app/docs/[slug]/page.tsx` | ✅ Implementada |

### Conteúdo MDX

| Arquivo | Categoria | Status |
|---|---|---|
| `fundamentos/golden-circle.mdx` | fundamentos | ✅ Criado |
| `fundamentos/nucleo-da-marca.mdx` | fundamentos | ✅ Criado |
| `fundamentos/posicionamento.mdx` | fundamentos | ✅ Criado |
| `identidade-verbal/manifesto.mdx` | identidade-verbal | ✅ Criado |
| `identidade-verbal/tom-de-voz.mdx` | identidade-verbal | ✅ Criado |
| `identidade-visual/cores.mdx` | identidade-visual | ✅ Criado |
| `identidade-visual/tipografia.mdx` | identidade-visual | ✅ Criado |
| `aplicacoes/digital.mdx` | aplicacoes | ✅ Criado |

**Conteúdo planejado ainda não criado** (ver `docs/spec.md` seção 3):
- `fundamentos/missao-visao-valores.mdx`
- `fundamentos/arquetipos.mdx`
- `identidade-verbal/vocabulario.mdx`
- `identidade-verbal/naming.mdx`
- `identidade-visual/logo.mdx`
- `identidade-visual/grafismos.mdx`
- `identidade-visual/direcao-de-imagem.mdx`
- `aplicacoes/impresso.mdx`
- `aplicacoes/redes-sociais.mdx`

---

## O que não está implementado (planejado para fases futuras)

### Fase 2 — Autenticação

**Objetivo:** proteger o acesso ao conteúdo, permitindo controle de quem pode visualizar as diretrizes.

| Funcionalidade | Status | Descrição |
|---|---|---|
| Integração com Supabase Auth | ✅ | Configuração do cliente Supabase e variáveis de ambiente |
| Página de login | ✅ | Interface de autenticação com e-mail e senha em `/login` |
| Proteção de rotas | ✅ | Middleware Next.js que redireciona usuários não autenticados |
| Sessão persistente | ✅ | Manutenção da sessão do usuário via cookies (SSR) |
| Logout | ✅ | Ação de encerramento de sessão na Sidebar |
| Feedback de erro de autenticação | ✅ | Mensagens claras para credenciais inválidas e estado de sucesso no signup |

### Fase 3 — Banco de Dados e Storage

**Objetivo:** permitir gerenciamento dinâmico de conteúdo e assets diretamente pela interface.

| Funcionalidade | Status | Descrição |
|---|---|---|
| Integração com Supabase Database | ✅ | Tabelas `profiles` e `assets` criadas via migrations |
| Upload de assets | ✅ | Interface em `/assets/[type]` conectada ao Storage |
| Listagem de assets | ✅ | Visualização dos arquivos armazenados por categoria |
| Edição de usuários | ✅ | Admin Settings em `/settings` para gerenciar permissões |
| Edição de conteúdo via interface | ❌ | Planejado para fases futuras |

### Fase 4 — Produção (parcialmente iniciada)
- Deploy na Vercel: ✅ Funcionando
- Domínio customizado: ❌ Não configurado
- SEO (sitemap, metadados por página): ❌ Não configurado
- HTTPS: ✅ Garantido pelo Vercel

---

## Riscos e débitos técnicos conhecidos

| Item | Risco | Prioridade |
|---|---|---|
| `components/ui/` pode estar vazia | Componentes `Badge` e `Divider` referenciados na spec mas não verificados | Baixa |
| `TypographyScale` e `LogoDisplay` ausentes | Componentes MDX não implementados; podem quebrar MDX que os use | Média |
| `.vercel/project.json` | ✅ Verificado — `.gitignore` cobre `.vercel/`, arquivo não está no git | N/A |
| Tokens de cor `brand.*` provisórios | `#0047FF` e `#00D4FF` são placeholders; identidade visual final não confirmada | Média |
| Responsive/mobile da sidebar | A spec define drawer em mobile; implementação atual pode não estar completa | Média |

---

## Como verificar o estado atual

```bash
# Servidor local
npm run dev

# Verificar tipos
npm run type-check

# Verificar linting
npm run lint

# Build completo
npm run build
```
