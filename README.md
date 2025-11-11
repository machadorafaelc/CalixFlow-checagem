# CalixFlow - Sistema de Checagem de Documentos

Sistema de validação automatizada de documentos contra o PI (Pedido de Inserção) para o CalixFlow.

> **Projeto Original**: [Figma Design](https://www.figma.com/design/Z6U52yHXkzYf31nhXE4YNi/Calix-Flow-checagem)

## 📋 Sobre o Projeto

O CalixFlow é uma plataforma de gestão de agências que inclui um módulo especializado em checagem de documentos. Este sistema permite validar automaticamente documentos como Notas Fiscais, Artigo 299, Relatórios e Simples Nacional contra um documento base (PI), identificando divergências e garantindo conformidade.

## ✨ Funcionalidades Atuais

### Interface de Upload
- ✅ Upload de documento base (PI) em PDF, DOC ou DOCX
- ✅ Upload de múltiplos documentos para validação:
  - Nota Fiscal
  - Artigo 299
  - Relatórios
  - Simples Nacional
  - Outros documentos (múltiplos)
- ✅ Visualização de arquivos enviados com detalhes (nome, tamanho, data)
- ✅ Remoção individual de documentos

### Análise de Documentos
- ✅ Barra de progresso visual durante análise
- ✅ Comparação campo a campo entre PI e documentos
- ✅ Identificação de divergências com três níveis de severidade:
  - 🔴 **Crítico**: Erros que impedem aprovação
  - 🟡 **Atenção**: Divergências que precisam revisão
  - 🔵 **Info**: Informações complementares

### Resultados
- ✅ Status geral (Aprovado/Rejeitado/Com Ressalvas)
- ✅ Análise detalhada por documento
- ✅ Comparação lado a lado de valores divergentes
- ✅ Interface visual clara com cores e ícones

## 🚧 Status Atual

**Versão**: 0.1.0 (Protótipo com dados simulados)

⚠️ **Importante**: A versão atual implementa apenas a interface e simula a análise com dados mockados. A integração real com IA para leitura e comparação de documentos será implementada nas próximas fases.

## 🛠️ Tecnologias

- **Framework**: React 18.3.1
- **Linguagem**: TypeScript
- **Build Tool**: Vite 6.3.5
- **UI Components**: Radix UI (shadcn/ui)
- **Estilo**: Tailwind CSS
- **Ícones**: Lucide React

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/machadorafaelc/CalixFlow-checagem.git

# Entre no diretório
cd CalixFlow-checagem

# Instale as dependências
pnpm install
# ou
npm install

# Execute em modo desenvolvimento
pnpm dev
# ou
npm run dev

# Build para produção
pnpm build
# ou
npm run build
```

## 🚀 Uso

1. Acesse a aplicação em `http://localhost:3000`
2. Faça upload do documento PI (Pedido de Inserção)
3. Adicione os documentos que deseja validar
4. Clique em "Iniciar Checagem"
5. Aguarde a análise e visualize os resultados

## 📁 Estrutura do Projeto

```
CalixFlow-checagem/
├── src/
│   ├── components/
│   │   ├── DocumentCheckView.tsx    # Componente principal de checagem
│   │   ├── ui/                      # Componentes shadcn/ui
│   │   └── ...                      # Outros componentes do sistema
│   ├── assets/                      # Imagens e recursos
│   ├── styles/                      # Estilos globais
│   └── main.tsx                     # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── ANALISE_BUGS.md                  # Análise detalhada de bugs
└── README.md
```

## 🔄 Próximas Implementações

### Fase 1: Integração com OpenAI ⏳
- [ ] Extração de texto de PDFs usando `pdf-parse` ou `pdf.js`
- [ ] Extração de texto de DOC/DOCX usando `mammoth`
- [ ] Integração com OpenAI GPT-4 Vision para análise de documentos
- [ ] Prompts estruturados para comparação de campos específicos
- [ ] Parsing inteligente das respostas da IA

### Fase 2: Backend e Processamento
- [ ] API REST para upload e processamento
- [ ] Armazenamento seguro de documentos (S3 ou similar)
- [ ] Fila de processamento para análises longas
- [ ] Autenticação e autorização de usuários
- [ ] Histórico de análises

### Fase 3: Melhorias e Otimizações
- [ ] OCR para documentos escaneados
- [ ] Suporte a mais formatos de arquivo
- [ ] Exportação de relatórios em PDF
- [ ] Configuração de regras de validação personalizadas
- [ ] Dashboard com métricas de conformidade

## 🐛 Bugs Conhecidos

Veja o arquivo [ANALISE_BUGS.md](./ANALISE_BUGS.md) para lista completa de bugs e problemas identificados.

### Principais Limitações Atuais:
- ❌ Análise apenas simulada (não processa arquivos reais)
- ❌ Sem integração com IA
- ❌ Sem extração de texto de documentos
- ❌ Sem validação de tipo/tamanho de arquivo
- ❌ Sem tratamento de erros

## 🤝 Contribuindo

Este é um projeto em desenvolvimento ativo. Contribuições são bem-vindas!

## 📄 Licença

Este projeto é privado e proprietário.

## 👥 Equipe

Desenvolvido para CalixFlow

## 📞 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato através do GitHub.

---

**Nota**: Este README será atualizado conforme o projeto evolui e novas funcionalidades são implementadas.
