# Template de Handoff entre Agentes — Lynz Brand System

Use este template ao encerrar uma sessão de trabalho e passar o contexto para outro agente (ou para retomar o trabalho em uma nova sessão).

Copie o bloco abaixo, preencha cada campo e envie como contexto inicial para o próximo agente.

---

## Template de Handoff

```markdown
# Handoff — Lynz Brand System

**Data:** [YYYY-MM-DD]
**Agente de origem:** [Claude Code / Codex / Gemini CLI / humano]
**Agente de destino:** [Claude Code / Codex / Gemini CLI / humano]
**Branch atual:** [ex: main / feat/nome-da-feature]

---

## Objetivo da tarefa recebida

[Descrever em 2-4 linhas o que o agente anterior (ou humano) pediu para fazer]

---

## Arquivos analisados (somente leitura)

- `caminho/do/arquivo.ts` — [motivo da leitura]
- `caminho/do/outro.tsx` — [motivo da leitura]

---

## Arquivos modificados

- `caminho/do/arquivo.ts` — [o que mudou e por quê]
- `caminho/do/outro.tsx` — [o que mudou e por quê]

---

## Arquivos criados

- `caminho/novo-arquivo.ts` — [propósito]

---

## Comandos executados

```bash
npm run type-check   # verificação de tipos — resultado: OK
npm run lint         # linting — resultado: OK
npm run build        # build — resultado: [OK / falhou com erro X]
```

---

## Como testar as alterações

1. [Passo 1 — ex: `npm run dev` e acessar `http://localhost:3000/docs/cores`]
2. [Passo 2 — ex: verificar se o componente ColorSwatch renderiza corretamente]
3. [Passo 3 — ex: rodar `npm run type-check` e confirmar zero erros]

---

## Decisões tomadas

| Decisão | Motivo |
|---|---|
| [descrição da decisão] | [por que foi tomada assim] |

---

## Pendências

- [ ] [Item pendente 1 — o que falta e por que não foi feito]
- [ ] [Item pendente 2]

---

## Riscos identificados

| Risco | Probabilidade | Impacto | Observação |
|---|---|---|---|
| [descrição do risco] | Alta/Média/Baixa | Alto/Médio/Baixo | [contexto] |

---

## Próximos passos recomendados

1. [Próximo passo prioritário]
2. [Segundo passo]
3. [Terceiro passo]

---

## Contexto adicional

[Qualquer informação que o próximo agente precise saber e que não esteja coberta acima]
```

---

## Exemplo preenchido

```markdown
# Handoff — Lynz Brand System

**Data:** 2026-05-17
**Agente de origem:** Claude Code
**Agente de destino:** Codex
**Branch atual:** main

---

## Objetivo da tarefa recebida

Criar documentação de contexto e regras para múltiplos agentes de IA trabalharem com segurança no projeto.

---

## Arquivos analisados (somente leitura)

- `package.json` — verificar stack e scripts
- `docs/spec.md` — entender arquitetura
- `docs/prd.md` — entender fases e escopo
- `components/MdxRenderer/MdxRenderer.tsx` — entender componentes injetados

---

## Arquivos modificados

Nenhum arquivo de código foi modificado.

---

## Arquivos criados

- `AGENTS.md` — regras universais para agentes de IA
- `CLAUDE.md` — contexto específico para Claude Code
- `README.md` — visão geral do projeto
- `docs/current-state.md` — estado atual de implementação
- `docs/safe-commands.md` — comandos permitidos e proibidos
- `docs/agent-handoff.md` — este arquivo

---

## Comandos executados

Nenhum comando foi executado (apenas leitura de arquivos).

---

## Como testar as alterações

1. Ler `AGENTS.md` e confirmar que as regras fazem sentido para o projeto
2. Ler `docs/current-state.md` e verificar se o estado listado corresponde ao que você observa no código
3. Confirmar que `README.md` carrega corretamente no GitHub/repositório

---

## Pendências

- [ ] Verificar se `components/ui/` contém Badge e Divider ou está vazia
- [ ] Verificar se `.vercel/` está no `.gitignore`

---

## Riscos identificados

| Risco | Probabilidade | Impacto | Observação |
|---|---|---|---|
| `.vercel/project.json` exposto | Média | Médio | Verificar `.gitignore` |
| `TypographyScale` e `LogoDisplay` ausentes | Baixa | Médio | Podem ser referenciados em MDX futuro |

---

## Próximos passos recomendados

1. Verificar e corrigir `.gitignore` para cobrir `.vercel/`
2. Implementar conteúdo MDX faltante (lista em `docs/current-state.md`)
3. Implementar componentes `TypographyScale` e `LogoDisplay`
```

---

## Instruções para o agente que recebe o handoff

1. Leia `AGENTS.md` antes de qualquer ação.
2. Leia este documento de handoff por completo.
3. Verifique o estado atual do repositório com `git status` e `git log --oneline -5`.
4. Confirme com o responsável humano qual tarefa priorizar antes de iniciar.
5. Se algo no handoff parecer inconsistente com o código atual, informe antes de continuar.
