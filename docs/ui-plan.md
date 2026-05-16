# Lynz Brand System — Plano de UI

**Versão:** 1.0  
**Data:** 2026-05-16  
**Projeto:** Lynz Brand System — Web app em Next.js para apresentação de diretrizes de marca

---

## Sumário

1. [Visão Geral da UI](#1-visão-geral-da-ui)
2. [Mapa de Telas](#2-mapa-de-telas)
3. [Especificação de Cada Tela](#3-especificação-de-cada-tela)
   - [3.1 Página Inicial (Home)](#31-página-inicial-home)
   - [3.2 Página de Login](#32-página-de-login)
   - [3.3 Página de Diretrizes (Guidelines)](#33-página-de-diretrizes-guidelines)
4. [Sistema de Layout Global](#4-sistema-de-layout-global)
5. [Tipografia e Espaçamento](#5-tipografia-e-espaçamento)
6. [Cores](#6-cores)
7. [Inventário de Componentes](#7-inventário-de-componentes)
8. [Scrolling e Overflow](#8-scrolling-e-overflow)
9. [Animações e Transições](#9-animações-e-transições)
10. [Acessibilidade](#10-acessibilidade)

---

## 1. Visão Geral da UI

### 1.1 Filosofia de Design

O Lynz Brand System é uma plataforma cujo conteúdo — as diretrizes da marca — é o protagonista absoluto. A interface deve ser invisível: limpa, funcional e discreta o suficiente para não competir com os elementos visuais e textuais do brand system que ela apresenta.

Três princípios norteiam todas as decisões de design:

- **Conteúdo em primeiro lugar.** A tipografia, as cores e os espaçamentos da interface são neutros e minimalistas. O que chama atenção é o conteúdo das diretrizes.
- **Sem distrações visuais.** Scrollbars ocultas, animações sutis, ausência de ornamentos desnecessários. Cada elemento existe por uma razão funcional.
- **Fluidez de navegação.** Transições suaves entre telas, rolagem sem atritos e hierarquia de informação clara reduzem a carga cognitiva do usuário.

### 1.2 Princípios Visuais

| Princípio | Descrição |
|---|---|
| Espaço em branco generoso | Margens amplas e padding consistente criam respiro visual |
| Tipografia como estrutura | A hierarquia tipográfica guia o olhar sem precisar de recursos gráficos extras |
| Paleta neutra e contida | A interface usa no máximo 2-3 tons neutros; cor de destaque apenas em ações primárias |
| Grid disciplinado | Alinhamento consistente em todas as telas transmite credibilidade e organização |
| Estado de hover discreto | Feedback visual imediato mas não intrusivo em elementos interativos |

---

## 2. Mapa de Telas

| # | Tela | Rota | Descrição | Autenticação necessária |
|---|---|---|---|---|
| 1 | Página Inicial (Home) | `/` | Ponto de entrada com campo de prompt IA e sugestões | Não |
| 2 | Login | `/login` | Autenticação do usuário com formulário e painel decorativo | Não |
| 3 | Diretrizes (Guidelines) | `/guidelines/[slug]` | Exibição de conteúdo MDX das diretrizes de marca | Sim |

> **Nota:** Rotas adicionais (ex.: `/guidelines` como index, `/settings`, `/profile`) devem ser planejadas em fases posteriores conforme o produto evolui.

---

## 3. Especificação de Cada Tela

---

### 3.1 Página Inicial (Home)

#### Objetivo

Ser o ponto de entrada principal da plataforma. Oferece ao usuário uma forma conversacional de explorar o brand system por meio de um campo de prompt conectado a uma IA, reduzindo a curva de aprendizado e tornando as diretrizes acessíveis via linguagem natural.

#### Layout

```
+----------------------------------------------------------+
|  [Sidebar estreita]  |   [Área de conteúdo central]      |
|                      |                                   |
|                      |   Lynz Brand System               |  <- Título
|                      |   ─────────────────────────────── |
|                      |                                   |
|                      |   +---------------------------+   |
|                      |   |   Como posso ajudar?      |   |
|                      |   |                           |   |  <- Prompt area
|                      |   |   [campo de texto grande] |   |
|                      |   |                  [Enviar] |   |
|                      |   +---------------------------+   |
|                      |                                   |
|                      |   Sugestões de prompts:           |
|                      |   > Quais são as cores primárias? |  <- Ideia 1
|                      |   > Como usar a tipografia?       |  <- Ideia 2
|                      |   > Mostre os ícones da marca     |  <- Ideia 3
|                      |                                   |
+----------------------------------------------------------+
```

#### Componentes e Responsabilidades

| Componente | Responsabilidade |
|---|---|
| `HomeLayout` | Container de layout com sidebar e área central |
| `HomeSidebar` | Sidebar estreita de navegação (pode estar vazia nesta fase) |
| `HeroTitle` | Título ou tagline da página |
| `PromptArea` | Textarea + botão de envio; gerencia estado do input e dispara chamada à IA |
| `PromptSuggestions` | Lista de sugestões clicáveis que preenchem o campo de prompt automaticamente |
| `AIResponseDisplay` | Área onde a resposta da IA é renderizada após o envio (pode ser abaixo do prompt) |

#### Comportamentos e Interações

- **Clicar em uma sugestão de prompt:** preenche o campo de texto com o texto da sugestão. O foco é movido para o campo. O usuário pode editar antes de enviar.
- **Enviar um prompt:** dispara chamada à API de IA. O campo é bloqueado durante o processamento. A resposta é exibida na área de resultado abaixo do prompt.
- **Enter no campo de texto:** envia o prompt (equivale a clicar em "Enviar"). `Shift + Enter` cria nova linha.
- **Hover em sugestões:** sutil mudança de cor de fundo (sem underline), cursor `pointer`.

#### Estados

| Estado | Comportamento |
|---|---|
| Inicial (vazio) | Prompt area vazio, placeholder visível, sugestões exibidas |
| Digitando | Placeholder some, botão "Enviar" ativo, sugestões ainda visíveis |
| Carregando | Botão desabilitado com indicador de loading (spinner ou dots); campo bloqueado |
| Resposta exibida | Área de resposta aparece abaixo do prompt com animação de fade-in |
| Erro | Mensagem de erro inline abaixo do campo; campo liberado para nova tentativa |

#### Notas de Implementação

- O campo de prompt deve crescer verticalmente conforme o usuário digita (`textarea` com `resize: none` e altura auto via JavaScript ou CSS `field-sizing: content`).
- A integração com a IA deve ser feita via Server Action do Next.js ou rota de API (`/api/chat`), com streaming de resposta quando possível (usando `ReadableStream` ou Vercel AI SDK).
- As sugestões de prompt devem ser configuráveis via arquivo de dados (JSON ou MDX) para facilitar manutenção sem necessidade de alterar código.
- A sidebar nesta tela pode ser omitida ou permanecer como placeholder visual — definir em alinhamento com o produto.

---

### 3.2 Página de Login

#### Objetivo

Autenticar o usuário de forma segura e agradável. O painel com animação de gradiente confere identidade visual e torna o momento de login uma experiência memorável, alinhada ao caráter de um brand system.

#### Layout

```
+----------------------------------------------------------+
|  [Logo]                                     [Apps]       |  <- Header fixo
+----------------------------------------------------------+
|                          |                               |
|   Painel de Login        |   Painel Decorativo           |
|   (~33% da largura)      |   (~67% da largura)           |
|                          |                               |
|   Bem-vindo de volta     |                               |
|                          |   +------------------------+  |
|   [campo: e-mail]        |   |                        |  |
|   [campo: senha]         |   |   Gradient Animation   |  |
|   [Esqueci minha senha]  |   |   (animação contínua   |  |
|                          |   |    de gradiente)       |  |
|   [  Entrar  ]           |   |                        |  |
|                          |   +------------------------+  |
|                          |                               |
+----------------------------------------------------------+
|  ─────────────────────────────────────────────────────── |  <- Rodapé
+----------------------------------------------------------+
```

#### Componentes e Responsabilidades

| Componente | Responsabilidade |
|---|---|
| `LoginHeader` | Header fixo com logo à esquerda e link/ícone "Apps" à direita |
| `LoginLayout` | Container dividido em dois painéis lado a lado (CSS Grid ou Flexbox) |
| `LoginForm` | Formulário com campos de e-mail, senha, link de recuperação e botão de submit |
| `EmailInput` | Campo de e-mail com validação e label acessível |
| `PasswordInput` | Campo de senha com toggle de visibilidade (mostrar/ocultar) |
| `SubmitButton` | Botão primário de submit com estado de loading |
| `GradientPanel` | Painel direito com animação CSS de gradiente em loop contínuo |
| `LoginFooter` | Linha horizontal no rodapé |

#### Comportamentos e Interações

- **Submit do formulário:** valida os campos client-side (e-mail válido, senha não vazia) antes de enviar. Em caso de erro de validação, exibe mensagem inline abaixo do campo.
- **Autenticação:** após submit válido, dispara chamada de autenticação (NextAuth.js ou similar). Em sucesso, redireciona para `/guidelines`. Em falha, exibe mensagem de erro genérica no topo do formulário.
- **Link "Esqueci minha senha":** navega para tela ou modal de recuperação de senha (escopo futuro).
- **Toggle de senha:** alterna o `type` do input entre `password` e `text`. O ícone do botão muda para refletir o estado atual.
- **Gradiente animado:** roda em loop infinito sem interação do usuário; não tem estado de pausa.

#### Estados

| Estado | Comportamento |
|---|---|
| Inicial | Campos vazios, botão ativo mas sem efeito (validação ao submit) |
| Validação falha | Mensagens de erro inline abaixo dos campos com cor de erro |
| Carregando | Botão mostra spinner, campos desabilitados |
| Erro de autenticação | Banner de erro no topo do formulário |
| Sucesso | Redirecionamento para `/guidelines` |

#### Notas de Implementação

- O painel de gradiente deve usar `@keyframes` CSS com `background-size: 400% 400%` e `animation: gradient-shift` para criar o efeito de movimento fluido.
- Em mobile, o painel decorativo é ocultado (`display: none` abaixo do breakpoint `md`) e o formulário ocupa a largura total.
- A sessão de autenticação deve ser gerenciada server-side para evitar exposição de tokens no cliente.
- O campo de e-mail deve ter `autocomplete="email"` e o de senha `autocomplete="current-password"` para suporte a gerenciadores de senha.

---

### 3.3 Página de Diretrizes (Guidelines)

#### Objetivo

Apresentar o conteúdo das diretrizes da marca de forma clara, organizada e imersiva. A navegação pela sidebar permite acesso rápido a qualquer seção. O conteúdo MDX renderizado é a alma da aplicação.

#### Layout

```
+----------------------------------------------------------+
|  [Logo]                              [Apps]   [Ícone]   |  <- Header fixo
+----------------------------------------------------------+
|                    |                                     |
|  Sidebar           |  Área de conteúdo                   |
|  (~22% da largura) |  (~78% da largura)                  |
|                    |                                     |
|  +----------------+|  Tipografia                         |  <- Título H1
|  | [Logo/marca]   ||                                     |
|  +----------------+|  A tipografia da Lynz é...          |
|                    |                                     |
|  Fundamentos       |  Parágrafo de conteúdo com          |
|  > Cores           |  descrição detalhada da diretriz.   |
|  > Tipografia      |                                     |
|  > Espaçamento     |  ## Família tipográfica             |  <- Título H2
|                    |                                     |
|  Componentes       |  Conteúdo MDX renderizado com       |
|  > Botões          |  exemplos, tabelas, blocos de       |
|  > Ícones          |  código e outros elementos.         |
|                    |                                     |
|  (rolagem oculta)  |  (rolagem oculta)                   |
|                    |                                     |
|  +----------------+|                                     |
|  | [Perfil/Config] ||                                     |  <- Rodapé da sidebar
|  +----------------+|                                     |
+----------------------------------------------------------+
```

#### Componentes e Responsabilidades

| Componente | Responsabilidade |
|---|---|
| `GuidelinesHeader` | Header fixo com logo, link "Apps" e ícone auxiliar (configurações ou perfil) |
| `GuidelinesLayout` | Container principal com sidebar e área de conteúdo lado a lado |
| `GuidelinesSidebar` | Sidebar de navegação com logo da marca, itens de nav e rodapé fixo |
| `BrandLogoArea` | Exibe o logo ou nome da marca no topo da sidebar |
| `SidebarNav` | Lista de itens de navegação agrupados por categoria; item ativo destacado |
| `SidebarNavItem` | Item individual de navegação com link e estado ativo/hover |
| `SidebarFooter` | Área fixa no rodapé da sidebar com avatar/nome do usuário e link de configurações |
| `ContentArea` | Área de conteúdo com overflow-y e scrollbar oculta |
| `MDXRenderer` | Renderiza o conteúdo MDX da diretriz atual |
| `GuidelineTitle` | Título H1 da diretriz atual |

#### Comportamentos e Interações

- **Navegação pela sidebar:** clicar em um item de nav navega para a rota correspondente (`/guidelines/[slug]`). O item ativo é destacado visualmente (cor de fundo ou borda lateral). A transição de conteúdo é suave (fade ou slide).
- **Rolagem da sidebar:** quando os itens de nav excedem a altura disponível, a sidebar rola de forma independente da área de conteúdo. A scrollbar é oculta, mas a rolagem funciona normalmente.
- **Rolagem do conteúdo:** a área de conteúdo rola de forma independente. A scrollbar é oculta. `scroll-behavior: smooth` garante rolagem fluida.
- **Rodapé da sidebar fixo:** o componente `SidebarFooter` (perfil/configurações) permanece visível independente da posição de rolagem da sidebar. Implementado com `position: sticky; bottom: 0` dentro do container da sidebar.
- **Hover nos itens de nav:** sutil alteração de cor de fundo e cursor `pointer`.
- **Ícone auxiliar no header:** pode abrir um dropdown ou navegar para configurações (comportamento a definir).

#### Estados

| Estado | Comportamento |
|---|---|
| Carregando conteúdo | Skeleton loader na área de conteúdo |
| Conteúdo carregado | MDX renderizado com fade-in suave |
| Item ativo na nav | Estilo de ativo aplicado ao item correspondente ao slug atual |
| Sidebar em mobile | Oculta por padrão; acessível via botão hamburguer no header |
| Erro ao carregar | Mensagem de erro na área de conteúdo com botão de retry |
| Slug não encontrado | Página 404 customizada ou redirect para primeiro item |

#### Notas de Implementação

- O conteúdo MDX deve ser processado server-side com `next-mdx-remote` ou `contentlayer`. Evitar processamento client-side para SEO e performance.
- O `SidebarFooter` deve usar `position: sticky; bottom: 0` — não `position: fixed` — para que permaneça dentro do fluxo da sidebar sem sobrepor o conteúdo.
- A sidebar em desktop deve ter largura fixa (ex.: `240px` ou `260px`). Em mobile, colapsada como drawer.
- O slug da rota deve ser derivado do nome do arquivo MDX para manter consistência entre sistema de arquivos e navegação.
- O item ativo na sidebar deve ser determinado comparando o `slug` da rota atual com o `href` de cada item de nav via `usePathname()` do Next.js.

---

## 4. Sistema de Layout Global

### 4.1 Grid e Espaçamento

O sistema de espaçamento segue uma escala de 4px (base-4), compatível com Tailwind CSS:

| Token | Valor | Uso típico |
|---|---|---|
| `space-1` | 4px | Gap mínimo entre elementos inline |
| `space-2` | 8px | Padding interno de componentes pequenos |
| `space-3` | 12px | Gap entre elementos relacionados |
| `space-4` | 16px | Padding padrão de containers |
| `space-6` | 24px | Separação entre seções |
| `space-8` | 32px | Margem vertical entre blocos de conteúdo |
| `space-12` | 48px | Padding de layout (áreas maiores) |
| `space-16` | 64px | Separação de seções grandes |

### 4.2 Breakpoints Responsive

| Nome | Largura mínima | Comportamento |
|---|---|---|
| `sm` | 640px | Ajustes de padding e fonte |
| `md` | 768px | Painel decorativo do login aparece |
| `lg` | 1024px | Sidebar de guidelines aparece; layout completo |
| `xl` | 1280px | Largura máxima do conteúdo centralizada |
| `2xl` | 1536px | Sem alterações adicionais |

### 4.3 Header Global

O header aparece nas telas de Login e Guidelines. Não aparece na Home (ou a Home usa uma variação sem header).

Especificação:

```
position: fixed | sticky (a definir por tela)
height: 56px (md) / 48px (sm)
z-index: 50
background: var(--color-background) com backdrop-filter: blur(8px)
border-bottom: 1px solid var(--color-border)
padding: 0 space-6 (md) / 0 space-4 (sm)
display: flex; align-items: center; justify-content: space-between
```

### 4.4 Sidebar — Comportamento em Mobile

Em telas menores que `lg` (1024px):

- A sidebar é **oculta por padrão** e funciona como um **drawer** deslizante da esquerda.
- Um botão hamburguer é exibido no header para abrir/fechar a sidebar.
- Quando aberta, um overlay semitransparente cobre a área de conteúdo.
- Clicar no overlay ou em um item de nav fecha a sidebar.
- A transição de abertura/fechamento usa `transform: translateX(-100%)` animado com `transition: transform 300ms ease`.

---

## 5. Tipografia e Espaçamento

### 5.1 Família Tipográfica

Recomenda-se uma fonte sans-serif com boa legibilidade em tamanhos pequenos e boa presença em títulos grandes. Sugestão:

- **Fonte primária:** Inter (Google Fonts) — amplamente usada em design systems, excelente legibilidade, suporte a variáveis (`font-weight` dinâmico).
- **Fonte monospace (código):** JetBrains Mono ou Fira Code — para blocos de código no MDX.

### 5.2 Hierarquia Tipográfica

| Elemento | Tamanho (rem) | Peso | Line-height | Uso |
|---|---|---|---|---|
| `H1` | 2.25rem (36px) | 700 | 1.2 | Título da diretriz, título da Home |
| `H2` | 1.5rem (24px) | 600 | 1.3 | Subtítulo de seções no MDX |
| `H3` | 1.25rem (20px) | 600 | 1.4 | Sub-seções no MDX |
| `H4` | 1.125rem (18px) | 500 | 1.4 | Terciário |
| `Body` | 1rem (16px) | 400 | 1.6 | Texto de conteúdo padrão |
| `Body Small` | 0.875rem (14px) | 400 | 1.5 | Labels, legendas, metadados |
| `Caption` | 0.75rem (12px) | 400 | 1.4 | Informações auxiliares, tooltips |
| `Code` | 0.875rem (14px) | 400 | 1.6 | Blocos e spans de código |
| `Button` | 0.875rem (14px) | 500 | 1 | Texto de botões |

### 5.3 Escala de Espaçamento Tipográfico

- Margem após `H1`: `space-8` (32px)
- Margem após `H2`: `space-6` (24px)
- Margem após `H3`: `space-4` (16px)
- Margem entre parágrafos: `space-4` (16px)
- Padding interno de blocos de código: `space-4` (16px)

---

## 6. Cores

### 6.1 Filosofia de Cor

A interface usa uma paleta essencialmente neutra. A identidade cromática da marca (cores primárias, secundárias, gradientes) é o conteúdo das diretrizes — não a interface em si. Por isso, a UI é deliberadamente sem cor de destaque forte para não interferir no que está sendo apresentado.

### 6.2 Paleta Base

| Token | Valor sugerido (claro) | Valor sugerido (escuro) | Uso |
|---|---|---|---|
| `--color-background` | `#FFFFFF` | `#0A0A0A` | Fundo principal |
| `--color-surface` | `#F5F5F5` | `#141414` | Cards, sidebar, painéis |
| `--color-border` | `#E5E5E5` | `#2A2A2A` | Bordas e divisores |
| `--color-text-primary` | `#0A0A0A` | `#F5F5F5` | Texto principal |
| `--color-text-secondary` | `#737373` | `#A3A3A3` | Texto auxiliar, legendas |
| `--color-text-disabled` | `#D4D4D4` | `#404040` | Texto desabilitado |
| `--color-accent` | `#171717` | `#FAFAFA` | Botão primário, item ativo |
| `--color-accent-foreground` | `#FAFAFA` | `#171717` | Texto sobre fundo de acento |
| `--color-error` | `#EF4444` | `#F87171` | Mensagens de erro |
| `--color-focus-ring` | `#3B82F6` | `#60A5FA` | Outline de foco |

> **Nota:** A paleta acima é uma sugestão inicial monocromática. Após definição da identidade visual final do Lynz Brand System, os tokens de cor devem ser atualizados para refletir a paleta oficial.

### 6.3 Gradiente Animado (Login)

O painel decorativo usa um gradiente com múltiplas cores da identidade da marca. A sugestão inicial usa tons que podem ser substituídos pelas cores oficiais:

```css
background: linear-gradient(
  -45deg,
  #ee7752,
  #e73c7e,
  #23a6d5,
  #23d5ab
);
background-size: 400% 400%;
animation: gradient-shift 12s ease infinite;
```

---

## 7. Inventário de Componentes

### 7.1 Componentes de Layout

| Componente | Descrição |
|---|---|
| `HomeLayout` | Layout da Home com sidebar estreita e área central |
| `LoginLayout` | Layout de dois painéis lado a lado para a tela de login |
| `GuidelinesLayout` | Layout com sidebar fixa e área de conteúdo para as diretrizes |
| `GlobalHeader` | Header reutilizável com logo, navegação e ações |
| `Sidebar` | Container da sidebar com área de scroll e rodapé fixo |
| `ContentArea` | Área de conteúdo com overflow e scrollbar oculta |

### 7.2 Componentes de Navegação

| Componente | Descrição |
|---|---|
| `SidebarNav` | Lista agrupada de itens de navegação |
| `SidebarNavItem` | Item individual com suporte a estado ativo e hover |
| `SidebarNavGroup` | Agrupador de itens com label de categoria |
| `SidebarFooter` | Rodapé fixo da sidebar com perfil e configurações |
| `BrandLogoArea` | Área de exibição do logo da marca no topo da sidebar |
| `MobileDrawer` | Wrapper para sidebar em modo mobile com overlay |
| `HamburgerButton` | Botão de toggle da sidebar em mobile |

### 7.3 Componentes de Formulário

| Componente | Descrição |
|---|---|
| `LoginForm` | Formulário completo de autenticação com validação |
| `TextInput` | Campo de texto genérico com label, placeholder e estado de erro |
| `EmailInput` | Input especializado para e-mail com `autocomplete` e validação |
| `PasswordInput` | Input de senha com toggle de visibilidade |
| `SubmitButton` | Botão de submit com estados de loading, ativo e desabilitado |
| `ErrorMessage` | Mensagem de erro inline para campos de formulário |
| `FormBanner` | Banner de erro/sucesso no topo de formulários |

### 7.4 Componentes de IA (Home)

| Componente | Descrição |
|---|---|
| `PromptArea` | Container com textarea expansível e botão de envio |
| `PromptInput` | Textarea auto-expansível com contador de caracteres opcional |
| `PromptSendButton` | Botão de envio com estados de loading e desabilitado |
| `PromptSuggestions` | Lista horizontal ou vertical de sugestões clicáveis |
| `PromptSuggestionItem` | Item individual de sugestão clicável |
| `AIResponseDisplay` | Área de exibição da resposta da IA com suporte a markdown |
| `LoadingDots` | Indicador animado de carregamento para resposta da IA |

### 7.5 Componentes de Conteúdo

| Componente | Descrição |
|---|---|
| `MDXRenderer` | Renderizador de conteúdo MDX com componentes customizados |
| `GuidelineTitle` | Título H1 da diretriz com estilo consistente |
| `CodeBlock` | Bloco de código com syntax highlighting e botão de cópia |
| `InlineCode` | Span de código inline |
| `ContentTable` | Tabela estilizada para uso no MDX |
| `ContentImage` | Imagem responsiva com caption opcional |
| `SkeletonLoader` | Placeholder animado para carregamento de conteúdo |

### 7.6 Componentes de UI Geral

| Componente | Descrição |
|---|---|
| `GradientPanel` | Painel com animação de gradiente para o login |
| `Divider` | Linha horizontal separadora |
| `Avatar` | Avatar circular com fallback para iniciais |
| `Tooltip` | Tooltip acessível para elementos com ações |
| `FocusRing` | Utilitário de estilo para focus states consistentes |
| `VisuallyHidden` | Elemento oculto visualmente mas acessível para leitores de tela |

---

## 8. Scrolling e Overflow

### 8.1 Princípio

Toda área rolável da interface deve ter scrollbar oculta visualmente, mas manter o comportamento de scroll funcional. Isso se aplica a:

- `body` (página completa)
- `.sidebar` (navegação lateral)
- `.content-area` (área de conteúdo das diretrizes)
- Qualquer container com `overflow-y: auto` ou `overflow-y: scroll`

### 8.2 Implementação CSS

Aplicar as seguintes regras a qualquer elemento rolável:

```css
/* Ocultar scrollbar — Chrome, Safari e Opera */
.scrollable::-webkit-scrollbar {
  display: none;
}

/* Ocultar scrollbar — Firefox */
.scrollable {
  scrollbar-width: none;
}

/* Ocultar scrollbar — IE e Edge legado */
.scrollable {
  -ms-overflow-style: none;
}
```

Combinando todas as declarações em um bloco:

```css
.scrollable {
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;          /* Firefox */
  -ms-overflow-style: none;       /* IE / Edge legado */
}

.scrollable::-webkit-scrollbar {
  display: none;                  /* Chrome, Safari, Opera */
}
```

### 8.3 Classe Utilitária (Tailwind + CSS customizado)

No arquivo de estilos globais (`globals.css`):

```css
@layer utilities {
  .no-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
}
```

Uso nos componentes:

```tsx
<div className="overflow-y-auto scroll-smooth no-scrollbar">
  {/* conteúdo rolável */}
</div>
```

### 8.4 Onde Aplicar

| Elemento | Classes / Regras |
|---|---|
| `body` | `overflow-y: auto; no-scrollbar` |
| `GuidelinesSidebar` | `overflow-y: auto; no-scrollbar; height: 100vh; padding-bottom: [altura do rodapé]` |
| `ContentArea` | `overflow-y: auto; no-scrollbar; height: 100vh` |
| `MobileDrawer` | `overflow-y: auto; no-scrollbar` |
| `AIResponseDisplay` | `overflow-y: auto; no-scrollbar` (quando a resposta for longa) |

### 8.5 Rolagem Suave Global

No arquivo `globals.css` ou `layout.tsx`:

```css
html {
  scroll-behavior: smooth;
}
```

No `tailwind.config.ts`, habilitar a variante `motion-safe` para respeitar preferências de acessibilidade:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

---

## 9. Animações e Transições

### 9.1 Gradiente Animado (Login)

O painel decorativo da tela de login usa uma animação de gradiente contínua e suave.

Especificação:

- Tipo: gradiente linear com 4 cores animado via `background-position`
- Duração: 12 segundos
- Easing: `ease`
- Loop: infinito, sem pausa
- Direção do gradiente: `-45deg`
- `background-size: 400% 400%` para permitir o movimento

```css
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gradient-panel {
  background: linear-gradient(
    -45deg,
    var(--gradient-color-1),
    var(--gradient-color-2),
    var(--gradient-color-3),
    var(--gradient-color-4)
  );
  background-size: 400% 400%;
  animation: gradient-shift 12s ease infinite;
}
```

> As cores do gradiente devem ser substituídas pelas cores oficiais da marca Lynz quando definidas.

### 9.2 Transições de Página

Usando a API de View Transitions do Next.js 14+ ou uma biblioteca como `framer-motion`:

| Transição | Tipo | Duração |
|---|---|---|
| Entrada de página | Fade-in (`opacity 0 -> 1`) | 200ms |
| Saída de página | Fade-out (`opacity 1 -> 0`) | 150ms |
| Troca de conteúdo MDX | Fade cross (`opacity` simultâneo) | 200ms |
| Abertura da sidebar mobile | Slide-in (`translateX(-100% -> 0)`) | 300ms ease |
| Fechamento da sidebar mobile | Slide-out (`translateX(0 -> -100%)`) | 250ms ease |

### 9.3 Hover States

| Elemento | Comportamento | Duração |
|---|---|---|
| `SidebarNavItem` | Fundo muda para `--color-surface` | 150ms ease |
| `PromptSuggestionItem` | Fundo muda para `--color-surface` | 150ms ease |
| `SubmitButton` | Leve escurecimento do fundo (10%) | 150ms ease |
| `PasswordInput` toggle | Opacidade 70% -> 100% | 100ms ease |
| Links do MDX | Sublinhado animado (underline offset) | 150ms ease |

### 9.4 Micro-interações

| Interação | Animação |
|---|---|
| Resposta da IA aparecendo | Fade-in + leve translate-y (8px -> 0) — 300ms ease |
| Skeleton loader | Pulse animado via `animate-pulse` (Tailwind) |
| Botão de submit em loading | Spinner rotacionando (`rotate 360deg`) — 600ms linear infinite |
| Item ativo na nav | Transição de fundo suave — 150ms ease |

---

## 10. Acessibilidade

### 10.1 Contraste Mínimo

Seguir as diretrizes WCAG 2.1 nível AA:

| Tipo de texto | Taxa mínima de contraste |
|---|---|
| Texto normal (< 18pt) | 4.5:1 |
| Texto grande (>= 18pt ou 14pt bold) | 3:1 |
| Elementos de interface (bordas de input, ícones) | 3:1 |

A paleta neutra sugerida na seção 6 foi escolhida com este critério em mente. Verificar com ferramentas como Stark (Figma), Colour Contrast Analyser ou `axe` (DevTools).

### 10.2 Focus States

Todo elemento interativo deve ter um `focus-visible` ring claramente visível:

```css
/* Aplicar globalmente */
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Remover outline padrão apenas quando :focus-visible estiver sendo tratado */
:focus:not(:focus-visible) {
  outline: none;
}
```

Elementos que exigem atenção especial:

- `SidebarNavItem`: focus ring visível com contraste adequado
- `PromptInput`: borda de foco distinta do estado padrão
- `EmailInput`, `PasswordInput`: borda de foco + ring externo
- `SubmitButton`: ring ao redor do botão
- `PromptSuggestionItem`: ring ao redor do item

### 10.3 ARIA Labels

| Elemento | Atributo ARIA |
|---|---|
| `HamburgerButton` | `aria-label="Abrir menu de navegação"` / `aria-expanded={isOpen}` |
| `PasswordInput` toggle | `aria-label="Mostrar senha"` / `aria-pressed={isVisible}` |
| `PromptSendButton` | `aria-label="Enviar prompt"` |
| `LoadingDots` | `aria-live="polite"` + `aria-label="Carregando resposta"` |
| `SidebarNav` | `role="navigation"` + `aria-label="Navegação de diretrizes"` |
| `SidebarNavItem` ativo | `aria-current="page"` |
| `GradientPanel` | `aria-hidden="true"` (puramente decorativo) |
| `SkeletonLoader` | `aria-busy="true"` no container durante carregamento |
| `FormBanner` de erro | `role="alert"` + `aria-live="assertive"` |
| `ErrorMessage` inline | `aria-describedby` no input correspondente |

### 10.4 Navegação por Teclado

- A sidebar deve ser navegável com `Tab`, `Shift+Tab`, `Enter` e setas.
- O campo de prompt usa `Enter` para envio e `Shift+Enter` para nova linha — documentar no placeholder.
- O drawer da sidebar em mobile deve capturar o foco quando aberto (`focus trap`) e devolvê-lo ao botão hamburguer ao fechar.
- Modais e drawers devem suportar fechamento com `Escape`.

### 10.5 Movimento Reduzido

Respeitar a preferência do sistema operacional `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* Desabilitar animação do gradiente */
  .gradient-panel {
    animation: none;
    background-position: 0% 50%;
  }

  /* Desabilitar transições de página */
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }

  /* Manter scroll behavior padrão */
  html {
    scroll-behavior: auto;
  }
}
```

---

*Documento gerado em 2026-05-16. Deve ser revisado e atualizado conforme o design evolui.*
