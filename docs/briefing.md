# Briefing de Projeto — Lynz Brand System

**Versão:** 1.0
**Data:** 16 de maio de 2026
**Status:** Em definição

---

## 1. Visão Geral do Projeto

O **Lynz Brand System** é uma aplicação web criada para centralizar, organizar e apresentar as diretrizes de identidade de uma marca (brand guidelines) em um único ambiente digital acessível via navegador.

O problema que o projeto resolve é simples: documentos de marca espalhados em PDFs, Google Docs e apresentações tornam-se rapidamente obsoletos, difíceis de manter e ainda mais difíceis de distribuir com consistência. Equipes diferentes trabalham com versões distintas das mesmas regras, o que gera inconsistência na aplicação da identidade visual e de comunicação.

O Lynz Brand System substitui esse modelo fragmentado por uma fonte única de verdade — estruturada, navegável, sempre atualizada e acessível a qualquer pessoa que precise trabalhar com a marca.

---

## 2. Objetivos

- Reunir todas as diretrizes da marca em um único ambiente web, eliminando a dependência de arquivos estáticos como PDFs ou apresentações.
- Oferecer uma experiência de consulta fluida, com navegação lateral e área de conteúdo central bem estruturada.
- Permitir que o conteúdo das diretrizes seja escrito e mantido em formato MDX, facilitando a edição por pessoas com conhecimento técnico básico.
- Estabelecer uma base técnica sólida que suporte evoluções futuras como autenticação de usuários, armazenamento de ativos e banco de dados.
- Garantir que o sistema seja publicável de forma rápida e confiável via Vercel.

---

## 3. Público-Alvo

O sistema atende a diferentes perfis de usuário dentro de uma organização:

| Perfil | Necessidade principal |
|---|---|
| Designers | Consultar padrões visuais, tipografia, cores e componentes de interface |
| Desenvolvedores | Verificar tokens, convenções e padrões de implementação |
| Equipe de Marketing | Consultar diretrizes de tom de voz, comunicação e uso da marca |
| Stakeholders e parceiros | Compreender a identidade da marca antes de iniciativas externas |

O sistema deve ser acessível sem necessidade de instalação local ou conhecimento técnico avançado — basta acessar a URL no navegador.

---

## 4. Escopo da Fase 1 — Estrutura e Interface Local

A Fase 1 tem como foco construir a estrutura base da aplicação e validar a experiência de navegação e consumo de conteúdo.

### O que será entregue

- Projeto Next.js configurado com App Router.
- Estrutura de pastas organizada para separar conteúdo (MDX), componentes de interface e configurações.
- Suporte a arquivos MDX para as páginas de diretrizes, permitindo texto rico combinado com componentes React.
- Sidebar de navegação lateral com links para as seções da marca.
- Área de conteúdo central que renderiza as páginas MDX de forma legível e bem formatada.
- Estilização base com Tailwind CSS, refletindo a identidade visual da marca no próprio sistema.
- Ambiente de desenvolvimento local funcional.

### O que está fora do escopo da Fase 1

- Autenticação e controle de acesso.
- Banco de dados.
- Upload ou gerenciamento de ativos (imagens, fontes, arquivos).
- Deploy em produção com domínio final configurado.
- Busca no conteúdo.
- Múltiplos idiomas.

---

## 5. Escopo das Fases Futuras

### Fase 2 — Autenticação e Controle de Acesso

- Integração com Supabase Auth para autenticação de usuários.
- Controle de quem pode visualizar ou editar conteúdo (acesso público vs. restrito).
- Tela de login e gerenciamento de sessão.

### Fase 3 — Banco de Dados e Conteúdo Dinâmico

- Integração com Supabase para persistência de dados.
- Possibilidade de armazenar metadados de diretrizes, histórico de versões ou configurações por usuário.
- Eventual migração ou complementação do conteúdo MDX com dados vindos do banco.

### Fase 4 — Storage e Gerenciamento de Ativos

- Integração com Supabase Storage para upload e servir arquivos da marca (logos, fontes, templates).
- Interface para download de ativos diretamente pelo sistema.

### Fase 5 — Deploy e Produção

- Configuração de domínio personalizado na Vercel.
- Configuração de variáveis de ambiente para produção (Supabase keys, etc.).
- Revisão de performance, SEO e acessibilidade antes do go-live.

---

## 6. Stack Tecnológica

### Next.js (App Router)

Escolhido por ser o framework React mais maduro para aplicações web com renderização híbrida. O App Router oferece uma estrutura de rotas baseada em sistema de arquivos, suporte nativo a layouts aninhados e server components — o que facilita a organização de seções de conteúdo como as de um brand system. A integração com MDX e com a Vercel é direta e bem documentada.

### MDX (Markdown + JSX)

O conteúdo das diretrizes é escrito em MDX, que combina a simplicidade do Markdown com a capacidade de incorporar componentes React. Isso permite que textos de orientação, exemplos visuais e componentes interativos coexistam no mesmo arquivo, sem exigir uma CMS externa na Fase 1. A edição é feita diretamente nos arquivos `.mdx`, com versionamento pelo próprio repositório Git.

### Tailwind CSS

Escolhido pela velocidade de prototipação e pela facilidade de manter consistência visual sem criar arquivos CSS separados. A customização do tema (cores, tipografia, espaçamentos) pode refletir diretamente os tokens da marca, tornando o sistema uma demonstração prática das próprias diretrizes que documenta.

### Supabase (fases futuras)

Plataforma de backend como serviço que oferece banco de dados PostgreSQL, autenticação e storage em um único produto. Escolhido pela facilidade de integração com Next.js, pela camada generosa do plano gratuito e pela possibilidade de escalar conforme a necessidade sem trocar de fornecedor.

### Vercel

Plataforma de deploy otimizada para Next.js, com integração direta ao repositório Git, previews automáticos por branch e CDN global. Reduz a complexidade operacional de manter infraestrutura para uma aplicação desse porte.

---

## 7. Premissas e Restrições

### Premissas

- O conteúdo das diretrizes estará disponível para ser estruturado em arquivos MDX antes ou durante o desenvolvimento da Fase 1.
- A identidade visual da própria marca (cores, tipografia) já está definida ou será definida em paralelo ao desenvolvimento do sistema.
- O projeto será mantido em repositório Git, com versionamento de código e conteúdo.
- O ambiente de desenvolvimento local usa Node.js em versão compatível com o Next.js mais recente.

### Restrições

- A Fase 1 não terá banco de dados nem autenticação; todo o conteúdo será estático e público no ambiente local.
- O sistema não substitui ferramentas de design como Figma — ele documenta e apresenta diretrizes, não as cria.
- Atualizações de conteúdo na Fase 1 exigem edição manual dos arquivos MDX e novo deploy; não há painel de edição para não-técnicos nesta fase.

---

## 8. Critérios de Sucesso

A Fase 1 será considerada bem-sucedida quando:

- O projeto Next.js estiver configurado e rodando localmente sem erros.
- Pelo menos uma seção completa de diretrizes (ex: cores, tipografia ou logo) estiver escrita em MDX e renderizando corretamente no navegador.
- A sidebar de navegação estiver funcional e linkando para todas as seções disponíveis.
- O layout for responsivo e legível em telas de desktop e tablet.
- O código estiver organizado de forma que novos arquivos MDX possam ser adicionados sem modificar a estrutura de componentes.
- Um desenvolvedor novo consiga entender a estrutura do projeto e adicionar uma nova seção de conteúdo sem orientação direta.
