# Comandos Seguros — Lynz Brand System

Referência de comandos para agentes de IA. Todos os agentes devem consultar este arquivo antes de executar qualquer comando no terminal.

---

## Comandos PERMITIDOS (sempre seguros)

Podem ser executados a qualquer momento, sem pedir autorização.

```bash
# Desenvolvimento
npm run dev               # Inicia servidor local em :3000
npm run storybook         # Inicia Storybook em :6006

# Verificação de qualidade
npm run type-check        # Verifica tipos TypeScript (somente leitura)
npm run lint              # Verifica linting ESLint (somente leitura)

# Leitura e navegação
ls                        # Listar arquivos
find . -name "*.tsx"      # Buscar arquivos
grep -r "termo"           # Buscar conteúdo
cat arquivo.ts            # Ler arquivo
git status                # Ver estado do repositório
git log --oneline         # Ver histórico de commits
git diff                  # Ver diferenças não commitadas
git diff HEAD~1           # Comparar com commit anterior
git branch                # Listar branches

# Build (somente verificação)
npm run build             # Build completo — OK para verificar erros
npm run build-storybook   # Build do Storybook
```

---

## Comandos que PRECISAM de autorização

Não execute sem confirmação explícita do responsável pelo projeto.

```bash
# Git — alterações de estado
git add .                 # Staging amplo — autorizar antes
git commit -m "..."       # Commit — deve ser revisado
git checkout -b nova      # Criar branch — informar antes
git merge                 # Merge — sempre com revisão

# Dependências
npm install               # Instalar todas as dependências (OK em setup inicial)
npm install <pacote>      # Instalar novo pacote — requer aprovação
npm uninstall <pacote>    # Remover pacote — requer aprovação
npm update                # Atualizar dependências — requer aprovação

# Arquivos de configuração
# Editar next.config.js, tailwind.config.ts, tsconfig.json, .gitignore
# → Pedir aprovação antes de qualquer alteração

# Conteúdo MDX
# Renomear ou mover arquivos .mdx existentes
# → Pedir aprovação (quebra rotas e slug)
```

---

## Comandos PROIBIDOS (nunca executar)

Ações irreversíveis ou com impacto em produção. Nunca execute sem instrução explícita e direta do responsável.

```bash
# Destrutivos
rm -rf                    # Remoção recursiva — NUNCA
git reset --hard          # Descarta mudanças locais — NUNCA sem instrução
git clean -f              # Remove arquivos não rastreados — NUNCA sem instrução

# Deploy e produção
vercel                    # Qualquer comando vercel — PROIBIDO
vercel deploy             # Deploy — PROIBIDO
vercel --prod             # Deploy em produção — PROIBIDO

# Git remoto
git push --force          # Push forçado — NUNCA
git push origin main      # Push direto para main — NUNCA (use PR)
git push                  # Qualquer push — requer instrução explícita

# Banco de dados (não aplicável na Fase 1, mas listado para prevenção)
# Qualquer migration, seed, drop ou alter de banco de dados
# → Completamente fora do escopo da Fase 1
```

---

## Regras sobre variáveis de ambiente

```bash
# PROIBIDO ler ou imprimir
cat .env.local
echo $SUPABASE_SERVICE_ROLE_KEY
printenv

# PERMITIDO ler (sem valores reais)
cat .env.example

# PROIBIDO commitar
git add .env.local
```

---

## Antes de executar um comando, pergunte

1. Este comando altera o estado do repositório?
2. Este comando afeta dependências ou configurações globais?
3. Este comando interage com serviços externos (Vercel, Supabase)?
4. Este comando pode ser irreversível?

Se a resposta for "sim" para qualquer uma das perguntas acima, **pare e peça autorização** antes de executar.
