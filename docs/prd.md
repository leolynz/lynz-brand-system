# PRD — Lynz Brand System

**Versão:** 1.0  
**Status:** Em elaboração  
**Responsável:** Leonardo Lins  

---

## Sumário

1. [Sumário Executivo](#1-sumário-executivo)
2. [Problema e Oportunidade](#2-problema-e-oportunidade)
3. [Usuários e Personas](#3-usuários-e-personas)
4. [Objetivos do Produto](#4-objetivos-do-produto)
5. [Funcionalidades por Fase](#5-funcionalidades-por-fase)
6. [Requisitos Funcionais](#6-requisitos-funcionais)
7. [Requisitos Não-Funcionais](#7-requisitos-não-funcionais)
8. [User Stories](#8-user-stories)
9. [Critérios de Aceite — Fase 1](#9-critérios-de-aceite--fase-1)
10. [Fora do Escopo](#10-fora-do-escopo)
11. [Riscos e Dependências](#11-riscos-e-dependências)
12. [Timeline Estimada](#12-timeline-estimada)

---

## 1. Sumário Executivo

O Lynz Brand System é uma aplicação web construída com Next.js que centraliza e apresenta todas as diretrizes de identidade visual e de marca de forma estruturada, navegável e sempre atualizada. A plataforma serve como fonte única de verdade para times de design, desenvolvimento e marketing, eliminando a dependência de PDFs estáticos e documentos dispersos. O conteúdo é gerenciado via arquivos MDX, permitindo que as diretrizes sejam mantidas como código — versionadas, revisáveis e colaborativas — enquanto a interface oferece uma experiência de leitura clara e profissional diretamente no navegador.

---

## 2. Problema e Oportunidade

### 2.1 Problema atual

Diretrizes de marca são frequentemente documentadas em PDFs, apresentações de slides ou wikis genéricos (Notion, Confluence). Esse modelo apresenta problemas recorrentes:

- **Desatualização:** PDFs não têm versionamento natural. Quando as diretrizes mudam, versões antigas continuam circulando.
- **Falta de autoridade:** Sem um ponto único de acesso, diferentes times consultam fontes diferentes e aplicam a marca de forma inconsistente.
- **Baixa descoberta:** Profissionais novos na empresa levam tempo para encontrar e entender o conjunto completo de diretrizes.
- **Inflexibilidade técnica:** Documentos tradicionais não permitem renderizar exemplos interativos, tokens de design ou componentes reais.
- **Sem controle de acesso:** Qualquer pessoa com o link pode acessar, ou o documento fica trancado sem distinção de audiência.

### 2.2 Oportunidade

Um sistema de brand guidelines baseado em web app — com conteúdo em MDX, navegação estruturada e autenticação — resolve esses problemas ao:

- Criar uma URL canônica que todos os times referenciam.
- Permitir que as diretrizes evoluam junto com o código, usando pull requests e revisões.
- Servir conteúdo rich-text com componentes customizados (paletas de cor, tipografia interativa, exemplos de uso correto/incorreto).
- Controlar quem pode visualizar e, futuramente, quem pode editar.
- Ser deployado em Vercel com deploys contínuos — qualquer mudança aprovada vai ao ar automaticamente.

---

## 3. Usuários e Personas

### 3.1 Persona 1 — Designer de Produto

| Atributo | Descrição |
|---|---|
| Nome fictício | Carla |
| Cargo | Designer de Produto Pleno |
| Contexto | Trabalha com múltiplos projetos e precisa consultar rapidamente tokens de cor, tipografia e espaçamento |
| Frequência de uso | Alta — várias vezes por semana |
| Principal necessidade | Encontrar rapidamente a diretriz correta sem interromper o fluxo de trabalho |
| Frustração atual | PDFs longos sem busca eficiente; dúvida sobre qual versão é a mais atual |
| Expectativa | Navegar por seções específicas em segundos, ver exemplos visuais ao lado das regras |

### 3.2 Persona 2 — Desenvolvedor Front-end

| Atributo | Descrição |
|---|---|
| Nome fictício | Rafael |
| Cargo | Desenvolvedor Front-end Sênior |
| Contexto | Implementa componentes e precisa saber os valores exatos dos tokens (hex, rem, variáveis CSS) |
| Frequência de uso | Média — consulta ao iniciar novas features ou revisar inconsistências visuais |
| Principal necessidade | Ver valores técnicos prontos para copiar, sem precisar converter de PDF para código |
| Frustração atual | Receber especificações ambíguas; precisar perguntar ao designer o que "azul primário" significa em hex |
| Expectativa | Encontrar tokens com valores copiáveis, exemplos de implementação e regras de uso correto |

### 3.3 Persona 3 — Stakeholder de Marketing

| Atributo | Descrição |
|---|---|
| Nome fictício | Beatriz |
| Cargo | Coordenadora de Marketing |
| Contexto | Gerencia agências externas e freelancers que precisam seguir a identidade da marca |
| Frequência de uso | Baixa — consulta ao onboarding de fornecedores e em campanhas maiores |
| Principal necessidade | Ter um link único e confiável para compartilhar com parceiros externos |
| Frustração atual | Enviar pacotes de arquivos pesados por e-mail; dificuldade de garantir que fornecedores usaram a versão correta |
| Expectativa | Compartilhar uma URL com acesso controlado; ter certeza de que a versão online é sempre a mais recente |

### 3.4 Persona 4 — Profissional Recém-integrado

| Atributo | Descrição |
|---|---|
| Nome fictício | Lucas |
| Cargo | Qualquer cargo — novo na equipe |
| Contexto | Está em onboarding e precisa entender rapidamente os padrões da marca |
| Frequência de uso | Alta no início, depois reduz |
| Principal necessidade | Entender a identidade da marca de forma rápida e autônoma |
| Frustração atual | Precisar pedir para alguém do time para receber os arquivos corretos |
| Expectativa | Acessar tudo que precisa por conta própria em um único lugar bem organizado |

---

## 4. Objetivos do Produto

| # | Objetivo | Métrica de sucesso |
|---|---|---|
| O1 | Ser a fonte única de verdade para as diretrizes da marca | 100% das consultas internas redirecionadas para o Brand System até o fim da Fase 2 |
| O2 | Reduzir o tempo de busca por diretrizes específicas | Usuários encontram a informação desejada em menos de 30 segundos via navegação |
| O3 | Garantir que o conteúdo está sempre atualizado | Zero versões desatualizadas em circulação — toda atualização passa pelo repositório |
| O4 | Proteger o conteúdo de acessos não autorizados | Apenas usuários autenticados conseguem acessar as diretrizes (Fase 2) |
| O5 | Permitir evolução contínua do conteúdo sem dependência de devs | Qualquer pessoa com acesso ao repositório consegue editar MDX e publicar (Fase 3+) |
| O6 | Oferecer uma experiência de leitura de alta qualidade | Aprovação subjetiva de pelo menos 4/5 nas avaliações internas de usabilidade |

---

## 5. Funcionalidades por Fase

### Fase 1 — MVP Local

**Objetivo:** ter a estrutura base funcionando localmente, com conteúdo navegável via browser.

| Funcionalidade | Descrição |
|---|---|
| Estrutura Next.js com App Router | Setup inicial do projeto com roteamento baseado em arquivos |
| Suporte a MDX | Configuração de `@next/mdx` ou `next-mdx-remote` para renderizar arquivos `.mdx` como páginas |
| Sidebar de navegação | Componente fixo à esquerda com links para todas as seções de diretrizes |
| Área de conteúdo central | Coluna principal que renderiza o conteúdo MDX da rota ativa |
| Navegação entre páginas | Links funcionais entre seções; indicação visual da seção ativa na sidebar |
| Layout responsivo base | Layout funcional em desktop; sidebar colapsável em mobile |
| Estilização com Tailwind CSS | Configuração do Tailwind com tokens de design da marca (cores, tipografia, espaçamento) |
| Páginas de diretrizes iniciais | Ao menos 5 seções de conteúdo (ex: introdução, cores, tipografia, logo, voz da marca) |

### Fase 2 — Autenticação

**Objetivo:** proteger o acesso ao conteúdo, permitindo controle de quem pode visualizar as diretrizes.

| Funcionalidade | Descrição |
|---|---|
| Integração com Supabase Auth | Configuração do cliente Supabase e variáveis de ambiente |
| Página de login | Interface de autenticação com e-mail e senha |
| Proteção de rotas | Middleware Next.js que redireciona usuários não autenticados para o login |
| Sessão persistente | Manutenção da sessão do usuário entre navegações e recargas |
| Logout | Ação de encerramento de sessão com redirecionamento para o login |
| Feedback de erro de autenticação | Mensagens claras para credenciais inválidas |

### Fase 3 — Banco de Dados e Storage

**Objetivo:** permitir gerenciamento dinâmico de conteúdo e assets diretamente pela interface.

| Funcionalidade | Descrição |
|---|---|
| Integração com Supabase Database | Tabelas para metadados de seções, assets e configurações da marca |
| Upload de assets | Interface para fazer upload de logos, ícones e imagens de exemplo para o Supabase Storage |
| Listagem de assets | Visualização dos arquivos armazenados, com URL pública para referência |
| Edição de conteúdo via interface | Editor in-browser (básico) para atualizar o conteúdo MDX sem precisar do repositório |
| Histórico de alterações | Registro de quem alterou o quê e quando |

### Fase 4 — Deploy em Produção

**Objetivo:** disponibilizar o Brand System em uma URL pública e estável para todos os stakeholders.

| Funcionalidade | Descrição |
|---|---|
| Deploy na Vercel | Configuração do projeto na Vercel com integração ao repositório Git |
| Variáveis de ambiente em produção | Configuração segura das chaves do Supabase no painel da Vercel |
| Domínio customizado | Configuração de domínio próprio (ex: brand.lynz.com.br) |
| Deploy contínuo | Toda merge na branch principal dispara deploy automático |
| Preview deployments | Pull requests geram URLs de preview para revisão antes de mergear |

---

## 6. Requisitos Funcionais

### 6.1 Fase 1

| ID | Requisito |
|---|---|
| RF-01 | O sistema deve renderizar arquivos `.mdx` como páginas HTML completas |
| RF-02 | A sidebar deve listar todas as seções de diretrizes disponíveis |
| RF-03 | A seção ativa deve ser destacada visualmente na sidebar |
| RF-04 | A navegação entre seções deve ocorrer sem recarregamento completo da página (client-side navigation) |
| RF-05 | O layout deve ter no mínimo uma coluna de navegação (sidebar) e uma coluna de conteúdo |
| RF-06 | O Tailwind CSS deve ser configurado com os tokens de cor e tipografia da marca |
| RF-07 | O conteúdo MDX deve suportar componentes React customizados embutidos |
| RF-08 | Em viewports menores que 768px, a sidebar deve ser ocultável |

### 6.2 Fase 2

| ID | Requisito |
|---|---|
| RF-09 | Usuários não autenticados devem ser redirecionados para `/login` ao tentar acessar qualquer rota protegida |
| RF-10 | O formulário de login deve validar campos obrigatórios antes de submeter |
| RF-11 | Após login bem-sucedido, o usuário deve ser redirecionado para a página inicial das diretrizes |
| RF-12 | A sessão deve persistir em recargas de página |
| RF-13 | O botão de logout deve encerrar a sessão e redirecionar para `/login` |
| RF-14 | Erros de autenticação (credencial inválida, conta inexistente) devem exibir mensagens descritivas |

### 6.3 Fase 3

| ID | Requisito |
|---|---|
| RF-15 | O sistema deve listar assets armazenados no Supabase Storage por categoria |
| RF-16 | Usuários com permissão de editor devem conseguir fazer upload de arquivos (PNG, SVG, PDF, máx. 10MB) |
| RF-17 | Após upload, o asset deve estar disponível imediatamente para referência na plataforma |
| RF-18 | Alterações no conteúdo devem ser registradas com timestamp e identificação do usuário |
| RF-19 | O editor de conteúdo deve suportar formatação Markdown básica |

### 6.4 Fase 4

| ID | Requisito |
|---|---|
| RF-20 | O deploy deve ocorrer automaticamente após merge na branch `main` |
| RF-21 | Pull requests devem gerar URLs de preview únicas e acessíveis |
| RF-22 | O domínio customizado deve servir a aplicação com HTTPS |
| RF-23 | Variáveis de ambiente de produção não devem ser expostas ao cliente sem prefixo `NEXT_PUBLIC_` |

---

## 7. Requisitos Não-Funcionais

### 7.1 Performance

| Requisito | Meta |
|---|---|
| Tempo de carregamento da página inicial | Menor que 2 segundos em conexão 4G (medido via Lighthouse) |
| Core Web Vitals (LCP) | Menor que 2,5 segundos |
| Core Web Vitals (CLS) | Menor que 0,1 |
| Core Web Vitals (FID/INP) | Menor que 200ms |
| Tamanho do bundle JavaScript | Menor que 200KB comprimido para a rota inicial |

### 7.2 Acessibilidade

| Requisito | Meta |
|---|---|
| Score Lighthouse Accessibility | Mínimo 90/100 |
| Contraste de texto | Conformidade com WCAG 2.1 AA (relação mínima de 4,5:1 para texto normal) |
| Navegação por teclado | Toda a interface deve ser completamente navegável via teclado |
| Semântica HTML | Uso correto de landmarks (`<nav>`, `<main>`, `<article>`, `<aside>`) |
| Atributos ARIA | Componentes interativos devem ter atributos ARIA adequados |

### 7.3 Responsividade

| Breakpoint | Comportamento esperado |
|---|---|
| Mobile (< 768px) | Sidebar oculta por padrão, acessível via botão de menu |
| Tablet (768px–1024px) | Sidebar colapsada ou em overlay |
| Desktop (> 1024px) | Layout de duas colunas com sidebar sempre visível |

### 7.4 SEO (Fase 4)

| Requisito | Detalhe |
|---|---|
| Metadados por página | Cada seção deve ter `<title>` e `<meta description>` únicos |
| Open Graph | Tags OG configuradas para compartilhamento em redes sociais |
| Sitemap | Geração automática de `sitemap.xml` |
| Robots | `robots.txt` configurado adequadamente para controle de indexação |

### 7.5 Segurança

| Requisito | Detalhe |
|---|---|
| Variáveis de ambiente | Chaves privadas nunca expostas ao cliente |
| Autenticação JWT | Tokens gerenciados pelo Supabase com expiração configurada |
| HTTPS | Toda comunicação em produção via HTTPS (garantido pelo Vercel) |
| Proteção de rotas | Middleware server-side — não dependente apenas de lógica client-side |

### 7.6 Manutenibilidade

| Requisito | Detalhe |
|---|---|
| Estrutura de arquivos | Organização previsível e documentada no repositório |
| Conteúdo separado do código | Arquivos MDX isolados em `/content` ou `/diretrizes`, sem lógica de negócio |
| Componentes reutilizáveis | Componentes de UI separados e documentados |

---

## 8. User Stories

| # | Como | Quero | Para |
|---|---|---|---|
| US-01 | designer | navegar entre as seções de diretrizes pela sidebar | encontrar rapidamente a informação que preciso sem rolar a página inteira |
| US-02 | designer | ver a seção ativa destacada na sidebar | saber exatamente onde estou dentro da estrutura de conteúdo |
| US-03 | desenvolvedor | ver os valores exatos dos tokens de cor (hex, HSL, variável CSS) | implementar os estilos corretos sem precisar perguntar para o designer |
| US-04 | desenvolvedor | copiar trechos de código de exemplo diretamente da documentação | acelerar a implementação e reduzir erros manuais |
| US-05 | stakeholder de marketing | acessar o Brand System por um link único e confiável | compartilhar com agências e fornecedores sem enviar arquivos por e-mail |
| US-06 | stakeholder de marketing | ter certeza de que a versão online é sempre a mais recente | evitar que parceiros externos usem diretrizes desatualizadas |
| US-07 | profissional recém-integrado | entender a estrutura completa da marca de forma autônoma | não precisar depender de alguém do time para me orientar no onboarding |
| US-08 | designer | visualizar exemplos de uso correto e incorreto da marca | aplicar as diretrizes com maior precisão e confiança |
| US-09 | administrador | proteger o acesso ao Brand System com autenticação | garantir que apenas pessoas autorizadas visualizam o conteúdo |
| US-10 | editor de conteúdo | fazer upload de novos assets (logos, ícones) pela interface | atualizar os arquivos disponíveis sem precisar mexer no código |
| US-11 | desenvolvedor | acessar as diretrizes em dispositivos móveis | consultar informações mesmo fora do escritório ou em reuniões |
| US-12 | designer | ver exemplos de tipografia renderizados com as fontes reais da marca | avaliar o impacto visual das escolhas tipográficas diretamente na documentação |

---

## 9. Critérios de Aceite — Fase 1

### CA-01 — Renderização de MDX

- Dado um arquivo `.mdx` válido na pasta de conteúdo
- Quando o usuário acessa a rota correspondente
- Então o conteúdo é renderizado como HTML completo, incluindo headings, parágrafos, listas, imagens e componentes React embutidos

### CA-02 — Sidebar de Navegação

- Dado que o usuário está em qualquer página do sistema
- Quando a página carrega
- Então a sidebar exibe todos os links de navegação para as seções disponíveis
- E o link da seção ativa está visualmente destacado (cor diferente, peso de fonte ou indicador lateral)

### CA-03 — Navegação Client-Side

- Dado que o usuário está em uma seção
- Quando clica em outro link da sidebar
- Então a transição ocorre sem recarregamento completo da página
- E o scroll da área de conteúdo volta ao topo

### CA-04 — Layout de Duas Colunas (Desktop)

- Dado um viewport maior que 1024px
- Quando o usuário acessa qualquer página
- Então a sidebar ocupa a coluna esquerda e o conteúdo ocupa a coluna principal à direita, ambos visíveis simultaneamente

### CA-05 — Responsividade Mobile

- Dado um viewport menor que 768px
- Quando o usuário acessa qualquer página
- Então a sidebar está oculta por padrão
- E existe um controle visível (botão de menu) para exibir/ocultar a sidebar

### CA-06 — Tokens de Design no Tailwind

- Dado que o `tailwind.config.js` ou `tailwind.config.ts` está configurado
- Quando o sistema é iniciado
- Então as cores, fontes e espaçamentos da marca estão disponíveis como classes utilitárias do Tailwind

### CA-07 — Componentes React em MDX

- Dado um arquivo MDX que importa um componente React customizado
- Quando a página é renderizada
- Então o componente aparece funcional dentro do conteúdo da diretriz, sem erros de runtime

### CA-08 — Performance Mínima

- Dado o ambiente de desenvolvimento local
- Quando a página inicial é carregada
- Então o Lighthouse (modo desktop) retorna score de Performance igual ou maior que 80

### CA-09 — Acessibilidade Mínima

- Dado qualquer página do sistema
- Quando auditada pelo Lighthouse
- Então o score de Acessibilidade é igual ou maior que 90

### CA-10 — Sem Erros de Console

- Dado qualquer página do sistema em desenvolvimento
- Quando acessada pelo browser
- Então o console do navegador não exibe erros de JavaScript, erros de hidratação ou avisos críticos do React

---

## 10. Fora do Escopo

Os itens abaixo foram deliberadamente excluídos do escopo atual para manter o foco nas funcionalidades essenciais.

| Item | Justificativa |
|---|---|
| Editor visual de arrastar e soltar (no-code) | Complexidade elevada; MDX como código é suficiente para o perfil técnico dos mantenedores |
| Internacionalização (i18n) | A marca opera em um único idioma no momento |
| Versionamento de conteúdo com histórico visual (estilo Git blame na UI) | Funcionalidade avançada que pode ser endereçada em fases futuras |
| Integração com ferramentas de design (Figma API) | Fora do escopo técnico desta fase; pode ser avaliado futuramente |
| App mobile nativo (iOS/Android) | A web app responsiva atende a necessidade de acesso mobile |
| Sistema de comentários ou anotações no conteúdo | Não é prioritário para o MVP; pode ser considerado após validação |
| Temas customizáveis por usuário (dark mode, fontes) | O Brand System deve refletir a identidade da marca, não preferências individuais |
| Analytics avançado de uso (heatmaps, gravações de sessão) | Pode ser adicionado em fases futuras com ferramentas de terceiros |
| Exportação para PDF a partir da interface | PDFs são exatamente o problema que este sistema resolve |
| Multi-tenancy (múltiplas marcas no mesmo sistema) | Arquitetura inicial focada em uma única marca |

---

## 11. Riscos e Dependências

### 11.1 Riscos Técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Incompatibilidade entre versões do Next.js e plugins MDX | Média | Alto | Fixar versões no `package.json`; testar upgrades em branch separada |
| Complexidade crescente de configuração do Supabase Auth com Next.js App Router | Média | Médio | Usar a biblioteca oficial `@supabase/ssr`; seguir documentação atualizada |
| Performance degradada com grande volume de conteúdo MDX | Baixa | Médio | Usar Static Site Generation (SSG) para páginas de conteúdo; avaliar paginação se necessário |
| Quebra de layout em browsers menos comuns | Baixa | Baixo | Testar nos browsers mais usados (Chrome, Firefox, Safari); usar PostCSS e autoprefixer |

### 11.2 Riscos de Processo

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Conteúdo das diretrizes incompleto ou desatualizado | Alta | Alto | Definir responsável por cada seção antes de iniciar a escrita do conteúdo |
| Scope creep entre fases | Média | Alto | Revisar backlog ao início de cada fase; qualquer novo item entra na fase seguinte |
| Falta de adoção pelos times | Média | Alto | Envolver ao menos um representante de cada time na validação do MVP |

### 11.3 Dependências Externas

| Dependência | Impacto se indisponível |
|---|---|
| Supabase (Auth, Database, Storage) | Fases 2 e 3 bloqueadas; alternativas: Auth.js + Postgres próprio |
| Vercel | Fase 4 bloqueada; alternativa: deploy em Netlify ou Railway |
| Next.js / npm registry | Desenvolvimento bloqueado; risco muito baixo dado a maturidade do ecossistema |
| Domínio customizado (DNS) | Deploy em produção com URL customizada bloqueado; app funciona no domínio Vercel padrão |

---

## 12. Timeline Estimada

A timeline é apresentada em sprints de 1 semana. As durações assumem dedicação parcial (não full-time).

### Fase 1 — MVP Local

| Sprint | Atividades |
|---|---|
| Sprint 1 | Setup do repositório, configuração do Next.js com App Router, Tailwind CSS, MDX |
| Sprint 2 | Estrutura de layout (sidebar + área de conteúdo), navegação entre páginas |
| Sprint 3 | Escrita do conteúdo MDX inicial (5+ seções), componentes customizados para MDX |
| Sprint 4 | Refinamento visual, responsividade mobile, testes de acessibilidade e performance |

**Duração total estimada:** 4 semanas

---

### Fase 2 — Autenticação

| Sprint | Atividades |
|---|---|
| Sprint 5 | Configuração do Supabase, integração do cliente no Next.js, variáveis de ambiente |
| Sprint 6 | Página de login, middleware de proteção de rotas, sessão persistente, logout |
| Sprint 7 | Testes de fluxo de autenticação, tratamento de erros, ajustes de UX |

**Duração total estimada:** 3 semanas

---

### Fase 3 — Banco de Dados e Storage

| Sprint | Atividades |
|---|---|
| Sprint 8 | Modelagem de tabelas no Supabase, integração do database no Next.js |
| Sprint 9 | Interface de upload de assets, listagem e visualização de arquivos |
| Sprint 10 | Editor básico de conteúdo in-browser, registro de histórico de alterações |
| Sprint 11 | Testes, ajustes de permissões (roles: viewer, editor, admin) |

**Duração total estimada:** 4 semanas

---

### Fase 4 — Deploy em Produção

| Sprint | Atividades |
|---|---|
| Sprint 12 | Configuração do projeto na Vercel, variáveis de ambiente de produção, primeiro deploy |
| Sprint 13 | Configuração do domínio customizado, HTTPS, testes em produção |
| Sprint 14 | Ajustes finais de SEO, sitemap, monitoramento básico de erros |

**Duração total estimada:** 3 semanas

---

### Resumo da Timeline

| Fase | Sprints | Duração estimada |
|---|---|---|
| Fase 1 — MVP Local | 1–4 | 4 semanas |
| Fase 2 — Autenticação | 5–7 | 3 semanas |
| Fase 3 — Database e Storage | 8–11 | 4 semanas |
| Fase 4 — Deploy em Produção | 12–14 | 3 semanas |
| **Total** | **14 sprints** | **14 semanas** |

> Nota: As fases podem se sobrepor parcialmente. A Fase 4, por exemplo, pode ter seu setup inicial (conta Vercel, primeiro deploy de teste) antecipado para o final da Fase 1, evitando que problemas de ambiente apareçam apenas no final do projeto.
