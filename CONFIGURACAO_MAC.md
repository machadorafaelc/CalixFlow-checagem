# 🍎 Guia Completo: Configurar CalixFlow no Mac

## ✅ Projeto Testado e Funcionando!

O projeto está **100% funcional** aqui no Manus. Agora vamos configurar no seu Mac.

---

## 🎯 Visão Geral

Você vai:
1. ✅ Deletar a pasta antiga (com problemas)
2. ✅ Clonar a versão atualizada do GitHub
3. ✅ Configurar a API key
4. ✅ Rodar o projeto
5. ✅ Integrar com o Cursor

**Tempo estimado**: 5-10 minutos

---

## 📋 Passo a Passo

### 1️⃣ Deletar a Pasta Antiga

A pasta atual tem problemas. Vamos começar do zero.

**No Terminal do Mac:**
```bash
# Deletar a pasta antiga
rm -rf "/Users/rafael/Downloads/Calix Flow-checagem"
```

---

### 2️⃣ Clonar do GitHub

**No Terminal do Mac:**
```bash
# Ir para a pasta Downloads
cd ~/Downloads

# Clonar o repositório
git clone https://github.com/machadorafaelc/CalixFlow-checagem.git

# Entrar na pasta
cd CalixFlow-checagem
```

✅ **Agora você tem a versão mais recente e funcional!**

---

### 3️⃣ Configurar a API Key

**No Terminal do Mac:**
```bash
# Copiar o template
cp .env.example .env

# Editar o arquivo .env
nano .env
# ou
code .env  # se tiver VS Code/Cursor
```

**Adicione sua API key da OpenAI:**
```
VITE_OPENAI_API_KEY=sk-proj-sua-chave-aqui
```

**Onde conseguir a chave:**
1. Acesse: https://platform.openai.com/api-keys
2. Clique em "Create new secret key"
3. Copie a chave
4. Cole no arquivo `.env`

⚠️ **IMPORTANTE**: Nunca compartilhe sua API key!

---

### 4️⃣ Instalar Dependências e Rodar

**No Terminal do Mac:**
```bash
# Instalar dependências
pnpm install

# Rodar o projeto
pnpm dev
```

**Aguarde aparecer:**
```
VITE v6.3.5  ready in XXX ms
➜  Local:   http://localhost:3000/
```

---

### 5️⃣ Abrir no Navegador

**Acesse:**
```
http://localhost:3000
```

✅ **Deve aparecer a tela do CalixFlow com a sidebar roxa!**

---

## 🎨 Integrar com o Cursor

### Opção 1: Abrir pelo Terminal

**No Terminal do Mac:**
```bash
# Certifique-se de estar na pasta do projeto
cd ~/Downloads/CalixFlow-checagem

# Abrir no Cursor
cursor .
```

### Opção 2: Abrir pelo Cursor

1. Abra o Cursor
2. **File** → **Open Folder...**
3. Navegue até: `/Users/rafael/Downloads/CalixFlow-checagem`
4. Clique em "Selecionar Pasta"

---

## 🔧 Usar o Terminal do Cursor

**Depois de abrir o projeto no Cursor:**

1. Aperte `Ctrl + ` ` (Control + acento grave)
2. Ou vá em: **Terminal** → **New Terminal**
3. O terminal já estará na pasta certa!

**Rode os comandos:**
```bash
pnpm install  # Se ainda não instalou
pnpm dev      # Para rodar o servidor
```

---

## ✅ Verificar se Está Tudo Certo

### No Cursor, você deve ver:

**Barra lateral esquerda:**
```
📁 CALIXFLOW-CHECAGEM
  📁 src
    📁 components
    📁 services  ← Serviços de IA
    📄 App.tsx
    📄 main.tsx
  📁 test-docs  ← Documentos de teste
  📄 package.json
  📄 .env  ← Sua API key
  📄 README.md
```

**Terminal do Cursor:**
```bash
rafael@iMac-de-Rafael CalixFlow-checagem %
```

---

## 🧪 Testar a Integração com IA

**1. Certifique-se de que o servidor está rodando:**
```bash
pnpm dev
```

**2. Acesse:** http://localhost:3000

**3. Faça upload dos documentos de teste:**
- **PI**: Clique na área de upload → Selecione `test-docs/PI-teste.txt`
- **Nota Fiscal**: Clique na área de upload → Selecione `test-docs/NotaFiscal-teste.txt`

**4. Clique em "Iniciar Checagem"**

**5. Aguarde ~5-10 segundos**

**6. Veja o resultado da IA!** 🎉
- Deve detectar divergência no valor
- PI: R$ 150.000,00
- NF: R$ 148.500,00

---

## 🔄 Fluxo de Trabalho Integrado

### Manus ↔ GitHub ↔ Mac ↔ Cursor

**Quando eu (Manus) faço mudanças:**
1. Eu commito no GitHub
2. Você puxa as mudanças no Mac:
   ```bash
   git pull
   ```
3. O Cursor detecta automaticamente

**Quando você faz mudanças:**
1. Edita no Cursor
2. Commita no GitHub:
   ```bash
   git add .
   git commit -m "sua mensagem"
   git push
   ```
3. Eu vejo as mudanças no Manus

---

## 🆘 Troubleshooting

### Problema: `pnpm: command not found`

**Solução:**
```bash
sudo npm install -g pnpm
```

### Problema: Tela em branco no navegador

**Solução:**
```bash
# Parar o servidor (Ctrl+C)
# Limpar e reinstalar
rm -rf node_modules
pnpm install
pnpm dev
```

### Problema: Erro de API key

**Solução:**
```bash
# Verificar se o .env existe
cat .env

# Deve aparecer: VITE_OPENAI_API_KEY=sk-...
```

### Problema: Cursor não reconhece o projeto

**Solução:**
1. Feche o Cursor
2. Abra novamente com: `cursor .` (na pasta do projeto)
3. Ou use **File** → **Open Folder...**

---

## 🎯 Comandos Úteis

### Rodar o projeto
```bash
pnpm dev
```

### Parar o servidor
```
Ctrl + C
```

### Ver status do Git
```bash
git status
```

### Puxar atualizações do GitHub
```bash
git pull
```

### Commitar mudanças
```bash
git add .
git commit -m "descrição das mudanças"
git push
```

### Abrir no Cursor
```bash
cursor .
```

---

## 📊 Resumo

| Ação | Comando |
|------|---------|
| Deletar pasta antiga | `rm -rf "/Users/rafael/Downloads/Calix Flow-checagem"` |
| Clonar do GitHub | `git clone https://github.com/machadorafaelc/CalixFlow-checagem.git` |
| Entrar na pasta | `cd CalixFlow-checagem` |
| Configurar API key | `cat > .env << 'EOF'` (ver Passo 3) |
| Instalar dependências | `pnpm install` |
| Rodar projeto | `pnpm dev` |
| Abrir no Cursor | `cursor .` |
| Acessar no navegador | http://localhost:3000 |

---

## 🎉 Pronto!

Depois de seguir esses passos, você terá:

✅ Projeto funcionando no Mac  
✅ Integrado com o Cursor  
✅ Sincronizado com o GitHub  
✅ Análise de IA funcionando  
✅ Tudo conectado: Manus ↔ GitHub ↔ Mac ↔ Cursor

---

**Dúvidas?** Me chame que te ajudo! 🚀
