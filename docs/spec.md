# Lynz Brand System — SPEC Técnico

**Versão:** 1.0  
**Data:** 2026-05-16  
**Status:** Rascunho

---

## Sumário

1. [Visão Geral](#1-visão-geral)
2. [Arquitetura Geral](#2-arquitetura-geral)
3. [Estrutura de Pastas](#3-estrutura-de-pastas)
4. [Páginas e Rotas](#4-páginas-e-rotas)
5. [Componentes Principais](#5-componentes-principais)
6. [Sistema de Conteúdo MDX](#6-sistema-de-conteúdo-mdx)
7. [Navegação e Sidebar](#7-navegação-e-sidebar)
8. [Configurações Técnicas](#8-configurações-técnicas)
9. [Dependências](#9-dependências)
10. [Decisões Técnicas e Trade-offs](#10-decisões-técnicas-e-trade-offs)
11. [Plano de Implementação — Fase 1](#11-plano-de-implementação--fase-1)

---

## 1. Visão Geral

O **Lynz Brand System** é uma aplicação web que centraliza e apresenta todas as diretrizes de marca (brand guidelines) da Lynz. O sistema funciona como um portal de consulta interno, onde times de design, marketing e desenvolvimento podem acessar as regras de identidade visual, tom de voz, tipografia, paleta de cores, e demais pilares da marca.

### Objetivos do sistema

- Centralizar todas as diretrizes em um único lugar acessível via navegador
- Facilitar a navegação entre seções por meio de uma sidebar estruturada
- Permitir que o conteúdo seja mantido em arquivos MDX versionados em Git
- Servir de base para evolução futura com autenticação, banco de dados e storage

### Escopo da Fase 1

A Fase 1 contempla exclusivamente o frontend estático com suporte a MDX local, sem autenticação nem banco de dados. O objetivo é ter o sistema rodando com toda a estrutura de navegação e conteúdo funcional.

---

## 2. Arquitetura Geral

### Diagrama de componentes

```
┌─────────────────────────────────────────────────────────────────┐
│                        Vercel (deploy)                          │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Next.js App Router                       │  │
│  │                                                           │  │
│  │  ┌──────────────────────────────────────────────────┐    │  │
│  │  │                  RootLayout                       │    │  │
│  │  │  ┌──────────────┐   ┌───────────────────────┐   │    │  │
│  │  │  │   Sidebar    │   │     ContentArea        │   │    │  │
│  │  │  │              │   │                        │   │    │  │
│  │  │  │  SidebarSec  │   │   MdxRenderer          │   │    │  │
│  │  │  │  SidebarItem │   │   (componentes MDX)    │   │    │  │
│  │  │  └──────────────┘   └───────────────────────┘   │    │  │
│  │  └──────────────────────────────────────────────────┘    │  │
│  │                                                           │  │
│  │  Rotas:                                                   │  │
│  │    /                    → página inicial (overview)       │  │
│  │    /docs/[slug]         → página de diretriz por slug     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Sistema de Arquivos (conteúdo MDX)           │  │
│  │                                                           │  │
│  │  /content/                                                │  │
│  │    fundamentos/         → missao.mdx, valores.mdx, ...    │  │
│  │    identidade-visual/   → cores.mdx, tipografia.mdx, ...  │  │
│  │    tom-de-voz/          → principios.mdx, vocabulario.mdx │  │
│  │    aplicacoes/          → digital.mdx, impresso.mdx, ...  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Fluxo de dados

```
Requisição HTTP (navegador)
         │
         ▼
   Next.js App Router
         │
         ├── Rota /
         │       └── page.tsx renderiza a página inicial estática
         │
         └── Rota /docs/[slug]
                 │
                 ▼
         app/docs/[slug]/page.tsx
                 │
                 ├── generateStaticParams()
                 │       └── lê /content/**/*.mdx
                 │               └── extrai slugs do frontmatter
                 │
                 ├── getDocBySlug(slug)
                 │       └── lê o arquivo .mdx correspondente
                 │               └── parseia frontmatter (gray-matter)
                 │               └── compila MDX (next-mdx-remote)
                 │
                 └── renderiza <ContentArea>
                         └── <MdxRenderer source={compiledMdx} />
                                 └── componentes customizados injetados
```

### Arquitetura de fases

| Fase | Escopo | Tecnologias adicionais |
|------|--------|------------------------|
| 1 | Frontend estático com MDX local | Next.js, Tailwind, MDX |
| 2 | Autenticação e controle de acesso | Supabase Auth |
| 3 | Gestão de conteúdo via UI | Supabase PostgreSQL + Storage |

---

## 3. Estrutura de Pastas

```
lynz-brand-system/
├── app/
│   ├── layout.tsx                  # RootLayout: fonte, tema, estrutura global
│   ├── page.tsx                    # Página inicial (overview da marca)
│   ├── globals.css                 # Estilos globais + variáveis CSS
│   └── docs/
│       └── [slug]/
│           └── page.tsx            # Página dinâmica de cada diretriz
│
├── components/
│   ├── Layout/
│   │   └── AppLayout.tsx           # Wrapper com sidebar + content area
│   ├── Sidebar/
│   │   ├── Sidebar.tsx             # Container principal da sidebar
│   │   ├── SidebarSection.tsx      # Agrupador de seção (ex: "Identidade Visual")
│   │   └── SidebarItem.tsx         # Link individual de navegação
│   ├── ContentArea/
│   │   └── ContentArea.tsx         # Área de conteúdo principal
│   ├── MdxRenderer/
│   │   └── MdxRenderer.tsx         # Renderizador de MDX com componentes injetados
│   ├── mdx-components/
│   │   ├── ColorSwatch.tsx         # Componente de paleta de cores
│   │   ├── TypographyScale.tsx     # Escala tipográfica visual
│   │   ├── LogoDisplay.tsx         # Exibição de logotipo com variações
│   │   ├── DoAndDont.tsx           # Bloco de exemplo certo/errado
│   │   ├── Callout.tsx             # Caixa de destaque (atenção, dica, aviso)
│   │   └── TokenTable.tsx          # Tabela de design tokens
│   └── ui/
│       ├── Badge.tsx               # Badge de categoria/status
│       └── Divider.tsx             # Separador visual
│
├── content/
│   ├── fundamentos/
│   │   ├── missao-visao-valores.mdx
│   │   ├── posicionamento.mdx
│   │   ├── golden-circle.mdx
│   │   ├── nucleo-da-marca.mdx
│   │   └── arquetipos.mdx
│   ├── identidade-verbal/
│   │   ├── tom-de-voz.mdx
│   │   ├── vocabulario.mdx
│   │   ├── manifesto.mdx
│   │   └── naming.mdx
│   ├── identidade-visual/
│   │   ├── logo.mdx
│   │   ├── cores.mdx
│   │   ├── tipografia.mdx
│   │   ├── grafismos.mdx
│   │   └── direcao-de-imagem.mdx
│   └── aplicacoes/
│       ├── digital.mdx
│       ├── impresso.mdx
│       └── redes-sociais.mdx
│
├── lib/
│   ├── mdx.ts                      # Funções de leitura e parse dos arquivos MDX
│   ├── navigation.ts               # Funções de construção da árvore de navegação
│   └── types.ts                    # Tipos TypeScript compartilhados
│
├── public/
│   ├── fonts/                      # Fontes locais (se não usar Google Fonts)
│   ├── images/
│   │   ├── logos/                  # Arquivos de logotipo (SVG, PNG)
│   │   └── brand/                  # Imagens de uso nos docs
│   └── favicon.ico
│
├── styles/
│   └── typography.css              # Estilos base para prosa MDX (se não usar @tailwindcss/typography)
│
├── next.config.js                  # Configuração do Next.js e MDX
├── tailwind.config.ts              # Configuração do Tailwind CSS
├── tsconfig.json                   # Configuração TypeScript
├── .env.local                      # Variáveis de ambiente (não commitado)
├── .env.example                    # Exemplo de variáveis de ambiente (commitado)
├── package.json
└── postcss.config.js
```

---

## 4. Páginas e Rotas

### Mapa de rotas

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `app/page.tsx` | Página inicial com overview da marca e links para as seções |
| `/docs/[slug]` | `app/docs/[slug]/page.tsx` | Página de conteúdo dinâmica, carregada a partir de um arquivo `.mdx` |

### Página inicial — `/`

Renderiza uma visão geral da marca. Não depende de MDX. Contém:

- Apresentação do sistema (nome, propósito)
- Grid de cards com atalhos para as principais seções
- Chamada para a primeira diretriz (ex: "Comece por aqui: Missão, Visão e Valores")

### Página de conteúdo — `/docs/[slug]`

Renderiza qualquer diretriz de marca a partir do slug da rota. O slug corresponde ao campo `slug` do frontmatter do arquivo `.mdx`.

#### Geração estática

```tsx
// app/docs/[slug]/page.tsx
export async function generateStaticParams() {
  const docs = await getAllDocs()
  return docs.map((doc) => ({ slug: doc.slug }))
}
```

Todos os slugs são resolvidos em tempo de build, gerando páginas estáticas. Não há requisições de servidor em runtime (SSR desativado para conteúdo).

#### Parâmetros da página

```tsx
interface PageProps {
  params: {
    slug: string
  }
}
```

---

## 5. Componentes Principais

### 5.1 `AppLayout`

**Arquivo:** `components/Layout/AppLayout.tsx`  
**Responsabilidade:** Wrapper estrutural que posiciona a sidebar à esquerda e a área de conteúdo à direita.

```tsx
interface AppLayoutProps {
  children: React.ReactNode
  navigation: NavigationSection[]
}
```

**Comportamento:**
- Renderiza uma grade de duas colunas: sidebar fixa (largura definida) + área de conteúdo com scroll
- A sidebar não rola junto com o conteúdo (posição fixa ou sticky)
- Em dispositivos móveis, a sidebar colapsa (implementação futura)

---

### 5.2 `Sidebar`

**Arquivo:** `components/Sidebar/Sidebar.tsx`  
**Responsabilidade:** Container da navegação lateral. Recebe a árvore de navegação e delega a renderização para `SidebarSection`.

```tsx
interface SidebarProps {
  navigation: NavigationSection[]
  currentSlug?: string
}
```

**Comportamento:**
- Exibe o logotipo ou nome do sistema no topo
- Itera sobre `navigation` e renderiza um `SidebarSection` para cada seção
- Destaca o item correspondente ao `currentSlug` ativo

---

### 5.3 `SidebarSection`

**Arquivo:** `components/Sidebar/SidebarSection.tsx`  
**Responsabilidade:** Agrupa itens de navegação sob um título de seção.

```tsx
interface SidebarSectionProps {
  title: string
  items: NavigationItem[]
  currentSlug?: string
}
```

**Comportamento:**
- Renderiza o título da seção em estilo de label (caixa alta, menor, separador visual)
- Itera sobre `items` e renderiza um `SidebarItem` para cada um

---

### 5.4 `SidebarItem`

**Arquivo:** `components/Sidebar/SidebarItem.tsx`  
**Responsabilidade:** Link individual de navegação na sidebar.

```tsx
interface SidebarItemProps {
  label: string
  slug: string
  isActive: boolean
}
```

**Comportamento:**
- Renderiza um `<Link href={/docs/${slug}}>` do Next.js
- Aplica estilo visual de "ativo" quando `isActive` é `true`
- Suporte a estado hover com transição suave

---

### 5.5 `ContentArea`

**Arquivo:** `components/ContentArea/ContentArea.tsx`  
**Responsabilidade:** Área de exibição do conteúdo principal. Envolve o `MdxRenderer` e adiciona o cabeçalho da página (título, descrição, categoria).

```tsx
interface ContentAreaProps {
  title: string
  description?: string
  category?: string
  children: React.ReactNode
}
```

**Comportamento:**
- Renderiza o título e a descrição do frontmatter acima do conteúdo MDX
- Aplica estilos de prosa ao conteúdo interno (via Tailwind `prose`)
- Exibe uma badge de categoria quando `category` está definido

---

### 5.6 `MdxRenderer`

**Arquivo:** `components/MdxRenderer/MdxRenderer.tsx`  
**Responsabilidade:** Compilar e renderizar o conteúdo MDX com os componentes customizados injetados.

```tsx
interface MdxRendererProps {
  source: MDXRemoteSerializeResult
}
```

**Comportamento:**
- Usa `MDXRemote` do `next-mdx-remote` para renderizar o conteúdo compilado
- Injeta o mapa de componentes customizados (`components` prop)
- Os componentes customizados ficam disponíveis dentro dos arquivos `.mdx` sem necessidade de import explícito

```tsx
const components = {
  ColorSwatch,
  TypographyScale,
  LogoDisplay,
  DoAndDont,
  Callout,
  TokenTable,
}
```

---

### 5.7 `ColorSwatch`

**Arquivo:** `components/mdx-components/ColorSwatch.tsx`  
**Responsabilidade:** Exibir uma paleta de cor com nome, valor hex e variações.

```tsx
interface ColorSwatchProps {
  name: string
  hex: string
  label?: string
  variants?: { shade: string; hex: string }[]
}
```

---

### 5.8 `Callout`

**Arquivo:** `components/mdx-components/Callout.tsx`  
**Responsabilidade:** Caixa de destaque contextual para notas, avisos e dicas.

```tsx
interface CalloutProps {
  type: 'info' | 'warning' | 'danger' | 'tip'
  title?: string
  children: React.ReactNode
}
```

---

### 5.9 `DoAndDont`

**Arquivo:** `components/mdx-components/DoAndDont.tsx`  
**Responsabilidade:** Exibir exemplos de uso correto e incorreto lado a lado.

```tsx
interface DoAndDontProps {
  doExample: React.ReactNode
  dontExample: React.ReactNode
  doLabel?: string
  dontLabel?: string
}
```

---

## 6. Sistema de Conteúdo MDX

### Organização dos arquivos

Os arquivos `.mdx` ficam na pasta `/content`, organizados em subpastas por categoria. Cada subpasta corresponde a uma seção da sidebar.

```
content/
├── fundamentos/          # Missão, visão, valores, posicionamento, golden circle
├── identidade-verbal/    # Tom de voz, vocabulário, manifesto, naming
├── identidade-visual/    # Logo, cores, tipografia, grafismos, direção de imagem
└── aplicacoes/           # Digital, impresso, redes sociais
```

### Frontmatter obrigatório

Todo arquivo `.mdx` deve conter o seguinte frontmatter no topo:

```yaml
---
title: "Paleta de Cores"
description: "As cores primárias, secundárias e neutras da Lynz e suas regras de uso."
slug: "cores"
category: "identidade-visual"
order: 2
publishedAt: "2026-05-16"
---
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `title` | `string` | Sim | Título exibido no topo da página e na sidebar |
| `description` | `string` | Sim | Subtítulo exibido abaixo do título da página |
| `slug` | `string` | Sim | Identificador único usado na URL: `/docs/[slug]` |
| `category` | `string` | Sim | Slug da categoria (deve corresponder a uma pasta em `/content`) |
| `order` | `number` | Sim | Ordem de exibição na sidebar dentro da seção |
| `publishedAt` | `string` | Não | Data de publicação no formato ISO 8601 |

### Carregamento e parse do MDX

O utilitário em `lib/mdx.ts` é responsável por toda a leitura e compilação do conteúdo.

```ts
// lib/mdx.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export async function getAllDocs(): Promise<DocMeta[]> {
  // Percorre recursivamente /content, lê o frontmatter de cada .mdx
  // Retorna array de DocMeta ordenado por category + order
}

export async function getDocBySlug(slug: string): Promise<Doc> {
  // Encontra o arquivo .mdx com frontmatter.slug === slug
  // Parseia com gray-matter
  // Compila com next-mdx-remote/serialize
  // Retorna { meta: DocMeta, source: MDXRemoteSerializeResult }
}
```

### Tipos TypeScript para o conteúdo

```ts
// lib/types.ts

export interface DocMeta {
  title: string
  description: string
  slug: string
  category: string
  order: number
  publishedAt?: string
}

export interface Doc {
  meta: DocMeta
  source: MDXRemoteSerializeResult
}

export interface NavigationItem {
  label: string
  slug: string
}

export interface NavigationSection {
  title: string
  category: string
  items: NavigationItem[]
}
```

### Componentes customizados disponíveis no MDX

Os componentes abaixo podem ser usados diretamente nos arquivos `.mdx` sem import:

| Componente | Uso |
|------------|-----|
| `<ColorSwatch>` | Exibir uma amostra de cor com nome e hex |
| `<TypographyScale>` | Exibir escala tipográfica com tamanhos e pesos |
| `<LogoDisplay>` | Exibir variações do logotipo com regras de uso |
| `<DoAndDont>` | Exemplo certo vs. errado lado a lado |
| `<Callout>` | Caixa de destaque com tipo: info, warning, danger, tip |
| `<TokenTable>` | Tabela de design tokens (nome, valor, descrição) |

**Exemplo de uso dentro de um `.mdx`:**

```mdx
## Cor Primária

A cor primária da Lynz define o tom de toda a comunicação visual.

<ColorSwatch name="Lynz Blue" hex="#0047FF" label="Primária" />

<Callout type="warning" title="Atenção">
  Nunca utilize a cor primária sobre fundos coloridos. Use apenas sobre branco ou cinza claro.
</Callout>

<DoAndDont
  doExample={<img src="/images/brand/cor-correto.png" alt="Uso correto" />}
  dontExample={<img src="/images/brand/cor-errado.png" alt="Uso incorreto" />}
/>
```

---

## 7. Navegação e Sidebar

### Como a sidebar é populada

A sidebar é construída a partir dos metadados (frontmatter) dos arquivos `.mdx`. O processo ocorre no momento do build (ou em tempo de execução no servidor, para a rota de layout):

1. `lib/navigation.ts` chama `getAllDocs()` para obter todos os `DocMeta`
2. Os itens são agrupados por `category`
3. Dentro de cada categoria, os itens são ordenados pelo campo `order`
4. O resultado é uma array de `NavigationSection` passada para o componente `Sidebar`

```ts
// lib/navigation.ts
import { getAllDocs } from './mdx'
import { NavigationSection } from './types'

const CATEGORY_LABELS: Record<string, string> = {
  'fundamentos': 'Fundamentos',
  'identidade-verbal': 'Identidade Verbal',
  'identidade-visual': 'Identidade Visual',
  'aplicacoes': 'Aplicações',
}

const CATEGORY_ORDER = ['fundamentos', 'identidade-verbal', 'identidade-visual', 'aplicacoes']

export async function buildNavigation(): Promise<NavigationSection[]> {
  const docs = await getAllDocs()

  const grouped = CATEGORY_ORDER.map((category) => ({
    title: CATEGORY_LABELS[category],
    category,
    items: docs
      .filter((doc) => doc.category === category)
      .sort((a, b) => a.order - b.order)
      .map((doc) => ({ label: doc.title, slug: doc.slug })),
  }))

  return grouped.filter((section) => section.items.length > 0)
}
```

### Estrutura de dados da navegação

```ts
[
  {
    title: "Fundamentos",
    category: "fundamentos",
    items: [
      { label: "Missão, Visão e Valores", slug: "missao-visao-valores" },
      { label: "Posicionamento", slug: "posicionamento" },
      { label: "Golden Circle", slug: "golden-circle" },
      { label: "Núcleo da Marca", slug: "nucleo-da-marca" },
      { label: "Arquetipos", slug: "arquetipos" },
    ]
  },
  {
    title: "Identidade Verbal",
    category: "identidade-verbal",
    items: [
      { label: "Tom de Voz", slug: "tom-de-voz" },
      { label: "Vocabulário", slug: "vocabulario" },
      { label: "Manifesto", slug: "manifesto" },
      { label: "Naming", slug: "naming" },
    ]
  },
  {
    title: "Identidade Visual",
    category: "identidade-visual",
    items: [
      { label: "Logo", slug: "logo" },
      { label: "Cores", slug: "cores" },
      { label: "Tipografia", slug: "tipografia" },
      { label: "Grafismos", slug: "grafismos" },
      { label: "Direção de Imagem", slug: "direcao-de-imagem" },
    ]
  },
  {
    title: "Aplicações",
    category: "aplicacoes",
    items: [
      { label: "Digital", slug: "digital" },
      { label: "Impresso", slug: "impresso" },
      { label: "Redes Sociais", slug: "redes-sociais" },
    ]
  }
]
```

### Como o item ativo é determinado

No componente de página (`app/docs/[slug]/page.tsx`), o `slug` atual é obtido via `params.slug` e repassado para `AppLayout`, que por sua vez passa `currentSlug` para `Sidebar`. O `SidebarItem` compara seu próprio `slug` com `currentSlug` para aplicar o estilo ativo.

---

## 8. Configurações Técnicas

### `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    domains: [],
  },
}

module.exports = nextConfig
```

> Nota: o MDX é processado via `next-mdx-remote` em tempo de build/servidor, e não requer plugin no `next.config.js`. Se a opção `@next/mdx` for preferida no futuro, a configuração deve ser atualizada com `withMDX`.

### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        // Tokens de cor da Lynz (a definir após entrega da identidade visual)
        brand: {
          primary: '#0047FF',
          secondary: '#00D4FF',
        },
      },
      fontFamily: {
        // Tipografia principal da marca (a definir após entrega da identidade visual)
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.800'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      { "name": "next" }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/content/*": ["./content/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Variáveis de ambiente (`.env.local`)

O arquivo `.env.local` não deve ser commitado. O arquivo `.env.example` deve ser commitado com os nomes das variáveis e descrições (sem valores reais).

```bash
# .env.example

# ──────────────────────────────────────
# FASE 1 — Sem variáveis de ambiente obrigatórias
# ──────────────────────────────────────

# ──────────────────────────────────────
# FASE 2 — Supabase Auth (não usar na Fase 1)
# ──────────────────────────────────────

# URL pública do projeto Supabase
NEXT_PUBLIC_SUPABASE_URL=

# Chave anon/public do Supabase (exposta no cliente — não é segredo)
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Chave de serviço do Supabase (NUNCA expor no cliente)
SUPABASE_SERVICE_ROLE_KEY=

# ──────────────────────────────────────
# FASE 3 — Supabase Storage (não usar na Fase 1)
# ──────────────────────────────────────

# Nome do bucket no Supabase Storage para assets da marca
SUPABASE_STORAGE_BUCKET=brand-assets
```

---

## 9. Dependências

### `package.json` — dependências de produção

| Pacote | Versão | Finalidade |
|--------|--------|-----------|
| `next` | `^14.2.0` | Framework principal |
| `react` | `^18.3.0` | Biblioteca de UI |
| `react-dom` | `^18.3.0` | Renderização React para DOM |
| `next-mdx-remote` | `^4.4.1` | Compilação e renderização de MDX no App Router |
| `gray-matter` | `^4.0.3` | Parse de frontmatter YAML nos arquivos MDX |
| `@tailwindcss/typography` | `^0.5.13` | Estilos de prosa para conteúdo MDX |
| `clsx` | `^2.1.1` | Utilitário para composição de classes CSS condicionais |
| `tailwind-merge` | `^2.3.0` | Merge inteligente de classes Tailwind (evita conflitos) |

### `package.json` — dependências de desenvolvimento

| Pacote | Versão | Finalidade |
|--------|--------|-----------|
| `typescript` | `^5.4.5` | Tipagem estática |
| `tailwindcss` | `^3.4.3` | Framework de CSS utilitário |
| `postcss` | `^8.4.38` | Processador CSS (requerido pelo Tailwind) |
| `autoprefixer` | `^10.4.19` | Prefixos CSS automáticos (requerido pelo Tailwind) |
| `@types/node` | `^20.12.7` | Tipos para Node.js |
| `@types/react` | `^18.3.1` | Tipos para React |
| `@types/react-dom` | `^18.3.0` | Tipos para React DOM |
| `eslint` | `^8.57.0` | Linter |
| `eslint-config-next` | `^14.2.0` | Config ESLint para Next.js |

### Scripts npm

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 10. Decisões Técnicas e Trade-offs

### Por que App Router e não Pages Router

O App Router (introduzido no Next.js 13 e estabilizado no 14) é a abordagem recomendada para novos projetos. As vantagens relevantes para este sistema são:

- **React Server Components por padrão:** a leitura dos arquivos MDX do sistema de arquivos ocorre no servidor sem necessidade de `getStaticProps`, reduzindo o boilerplate
- **Layouts aninhados:** permite definir o `AppLayout` (sidebar + content area) uma vez e reutilizá-lo em todas as rotas de `/docs/*` sem duplicação
- **Streaming e Suspense:** base para melhorias de performance futuras
- **Melhor alinhamento com o futuro do ecossistema React**

O Pages Router continua funcional, mas exigiria `getStaticProps`, `getStaticPaths` e `_app.tsx` para atingir o mesmo resultado, com mais código e padrões mais antigos.

### Por que MDX local e não CMS externo

Na Fase 1, MDX local foi escolhido pelas seguintes razões:

- **Zero dependência externa:** o conteúdo vive no repositório Git, sem custo de serviço, sem latência de API, sem conta em serviço terceiro
- **Versionamento nativo:** alterações no conteúdo são rastreadas por commits, com histórico completo
- **Componentes reutilizáveis dentro do MDX:** componentes React customizados (ColorSwatch, Callout, etc.) são injetados diretamente no MDX sem nenhuma configuração adicional em um CMS
- **Build estático:** todas as páginas são geradas em build time via `generateStaticParams`, resultando em HTML estático servido pelo Vercel CDN

**Limitação:** edição de conteúdo requer acesso ao repositório e conhecimento básico de MDX/Git. Este trade-off é aceitável na Fase 1, onde o conteúdo é gerenciado pelo time de design/estratégia com suporte técnico. A Fase 3 resolve isso com uma interface de gestão via Supabase.

### Por que Tailwind CSS

- **Velocidade de prototipação:** estilos inline com classes utilitárias eliminam o ciclo de criar arquivos CSS separados
- **Sem conflitos de especificidade:** cada classe tem escopo próprio, evitando problemas comuns de CSS global
- **Tree-shaking automático:** apenas as classes utilizadas vão para o bundle final
- **Integração com `@tailwindcss/typography`:** o plugin `prose` aplica estilos de leitura ao conteúdo MDX com uma única classe, sem necessidade de customizar cada elemento HTML gerado pelo MDX
- **Tokens de design via `extend`:** cores e tipografia da marca podem ser definidas como tokens em `tailwind.config.ts`, centralizando os valores e tornando-os acessíveis em todo o projeto

---

## 11. Plano de Implementação — Fase 1

### Passo a passo para scaffoldar o projeto

**1. Criar o projeto Next.js**

```bash
npx create-next-app@latest lynz-brand-system \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"

cd lynz-brand-system
```

**2. Instalar dependências de conteúdo**

```bash
npm install next-mdx-remote gray-matter
npm install @tailwindcss/typography
npm install clsx tailwind-merge
```

**3. Configurar o plugin de typography no Tailwind**

Editar `tailwind.config.ts` para incluir o plugin e os caminhos de conteúdo corretos, conforme a seção [8. Configurações Técnicas](#8-configurações-técnicas).

**4. Criar a estrutura de pastas**

```bash
mkdir -p content/{fundamentos,identidade-verbal,identidade-visual,aplicacoes}
mkdir -p components/{Layout,Sidebar,ContentArea,MdxRenderer,mdx-components,ui}
mkdir -p lib
mkdir -p public/{fonts,images/{logos,brand}}
```

**5. Definir os tipos TypeScript**

Criar `lib/types.ts` com as interfaces `DocMeta`, `Doc`, `NavigationItem` e `NavigationSection`.

**6. Implementar o utilitário de leitura MDX**

Criar `lib/mdx.ts` com as funções `getAllDocs` e `getDocBySlug`.

**7. Implementar o utilitário de navegação**

Criar `lib/navigation.ts` com a função `buildNavigation` e o mapeamento de categorias.

**8. Criar os primeiros arquivos de conteúdo MDX**

Criar pelo menos dois arquivos `.mdx` de exemplo em `/content` para validar o pipeline de leitura. Exemplo mínimo:

```mdx
---
title: "Missão, Visão e Valores"
description: "Os pilares que definem o propósito e a direção da Lynz."
slug: "missao-visao-valores"
category: "fundamentos"
order: 1
---

## Missão

Conteúdo da missão aqui.
```

**9. Implementar os componentes da sidebar**

Ordem sugerida:
1. `SidebarItem` — componente folha, sem dependências internas
2. `SidebarSection` — usa `SidebarItem`
3. `Sidebar` — usa `SidebarSection`

**10. Implementar `ContentArea` e `MdxRenderer`**

1. `MdxRenderer` — wrapper do `MDXRemote` com mapa de componentes
2. `ContentArea` — wrapper com título, descrição e badge de categoria

**11. Implementar `AppLayout`**

Criar o layout de duas colunas com `Sidebar` + área de conteúdo.

**12. Criar o `RootLayout` (`app/layout.tsx`)**

Incluir `AppLayout`, importar estilos globais, configurar fonte.

**13. Criar a página dinâmica `/docs/[slug]`**

Implementar `generateStaticParams`, `getDocBySlug` e a renderização da página com `ContentArea` + `MdxRenderer`.

**14. Criar a página inicial (`app/page.tsx`)**

Grid de cards com atalhos para as seções principais.

**15. Implementar os componentes MDX customizados**

Ordem sugerida (do mais simples ao mais complexo):
1. `Callout`
2. `ColorSwatch`
3. `DoAndDont`
4. `TypographyScale`
5. `TokenTable`
6. `LogoDisplay`

**16. Validar e rodar localmente**

```bash
npm run dev
```

Acessar `http://localhost:3000` e verificar:
- Sidebar renderizando com as seções corretas
- Links da sidebar navegando para as páginas de conteúdo
- Conteúdo MDX renderizando corretamente
- Componentes customizados funcionando dentro do MDX

**17. Build de produção**

```bash
npm run build
npm run start
```

Verificar que todas as páginas foram geradas estaticamente sem erros.

**18. Deploy na Vercel**

```bash
# Via CLI da Vercel
npx vercel
```

Ou conectar o repositório GitHub à Vercel via painel e configurar o deploy automático em push para `main`.

---

### Ordem sugerida de implementação dos componentes (resumo)

| Etapa | Componente / Módulo | Dependências |
|-------|---------------------|--------------|
| 1 | `lib/types.ts` | Nenhuma |
| 2 | `lib/mdx.ts` | `gray-matter`, `next-mdx-remote` |
| 3 | `lib/navigation.ts` | `lib/mdx.ts` |
| 4 | `SidebarItem` | Nenhuma |
| 5 | `SidebarSection` | `SidebarItem` |
| 6 | `Sidebar` | `SidebarSection` |
| 7 | `MdxRenderer` | `next-mdx-remote`, componentes MDX |
| 8 | `ContentArea` | `MdxRenderer` |
| 9 | `AppLayout` | `Sidebar`, `ContentArea` |
| 10 | `app/layout.tsx` | `AppLayout` |
| 11 | `app/docs/[slug]/page.tsx` | `lib/mdx.ts`, `ContentArea` |
| 12 | `app/page.tsx` | Nenhuma |
| 13 | Componentes MDX customizados | Nenhuma (autônomos) |

---

*Fim do SPEC técnico — Lynz Brand System v1.0*
