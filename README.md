# CalixFlow - Sistema de Checagem de Documentos

Sistema de validação automatizada de documentos contra o PI (Pedido de Inserção) para o CalixFlow.

> **Projeto Original**: [Figma Design](https://www.figma.com/design/Z6U52yHXkzYf31nhXE4YNi/Calix-Flow-checagem)

## 📋 Sobre o Projeto

O CalixFlow é uma plataforma de gestão de agências que inclui um módulo especializado em checagem de documentos. Este sistema permite validar automaticamente documentos como Notas Fiscais, Artigo 299, Relatórios e Simples Nacional contra um documento base (PI), identificando divergências e garantindo conformidade.

## ✨ Funcionalidades

### Interface de Upload
- ✅ Upload de documento base (PI) em PDF, DOC, DOCX ou TXT
- ✅ Upload de múltiplos documentos para validação:
  - Nota Fiscal
  - Artigo 299
  - Relatórios
  - Simples Nacional
  - Outros documentos (múltiplos)
- ✅ Visualização de arquivos enviados com detalhes (nome, tamanho, data)
- ✅ Remoção individual de documentos

### Análise Inteligente com IA ✨ NOVO!
- ✅ **Integração real com GPT-3.5-turbo da OpenAI**
- ✅ Extração automática de campos importantes
- ✅ Comparação inteligente entre PI e documentos
- ✅ Identificação de divergências com três níveis de severidade:
  - 🔴 **Crítico**: Erros que impedem aprovação (ex: CNPJ diferente)
  - 🟡 **Atenção**: Divergências que precisam revisão (ex: valor discrepante)
  - 🔵 **Info**: Informações complementares
- ✅ Nível de confiança para cada comparação
- ✅ Explicações detalhadas das divergências

### Resultados
- ✅ Status geral (Aprovado/Rejeitado/Com Ressalvas)
- ✅ Análise detalhada por documento
- ✅ Comparação lado a lado de valores divergentes
- ✅ Interface visual clara com cores e ícones

## 🚀 Status Atual

**Versão**: 0.2.0 (Integração com IA implementada!)

✅ **Funcional**: O sistema agora usa GPT-3.5 para análise real de documentos!

### O que funciona:
- ✅ Análise real com OpenAI GPT-3.5
- ✅ Extração de texto de arquivos TXT
- ✅ Comparação inteligente de campos
- ✅ Classificação automática de severidade

### Limitações atuais:
- ⚠️ Extração de PDFs e DOCs usa dados simulados (para testar, use arquivos .txt)
- ⚠️ API key no frontend (apenas para desenvolvimento)
- ⚠️ Para produção, necessário backend

## 🛠️ Tecnologias

- **Framework**: React 18.3.1
- **Linguagem**: TypeScript
- **Build Tool**: Vite 6.3.5
- **UI Components**: Radix UI (shadcn/ui)
- **Estilo**: Tailwind CSS
- **Ícones**: Lucide React
- **IA**: OpenAI GPT-3.5-turbo

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

# Configure a API key da OpenAI
cp .env.example .env
# Edite .env e adicione sua chave: VITE_OPENAI_API_KEY=sk-...

# Execute em modo desenvolvimento
pnpm dev
# ou
npm run dev

# Build para produção
pnpm build
# ou
npm run build
```

## 🔑 Configuração da API OpenAI

1. Obtenha uma API key em: https://platform.openai.com/api-keys
2. Copie o arquivo `.env.example` para `.env`
3. Adicione sua chave no arquivo `.env`:
   ```
   VITE_OPENAI_API_KEY=sk-proj-sua-chave-aqui
   ```

⚠️ **Importante**: Nunca commite o arquivo `.env` com sua chave real!

## 🚀 Uso

1. Acesse a aplicação em `http://localhost:3000`
2. Faça upload do documento PI (Pedido de Inserção)
3. Adicione os documentos que deseja validar
4. Clique em "Iniciar Checagem"
5. Aguarde a análise com IA (pode levar alguns segundos)
6. Visualize os resultados detalhados

### 🧪 Testando com Documentos de Exemplo

Use os arquivos em `test-docs/` para testar:
- `PI-teste.txt` - Documento base
- `NotaFiscal-teste.txt` - Nota com divergência intencional no valor

## 💰 Custos de Operação

### GPT-3.5-turbo
- **Input**: $0.0005 / 1K tokens
- **Output**: $0.0015 / 1K tokens
- **Custo por análise**: ~$0.01 - $0.02
- **90% mais barato** que GPT-4!

### Estimativa Mensal
- 100 análises/dia = $1-2/dia
- 2000 análises/mês = $20-40/mês

## 📁 Estrutura do Projeto

```
CalixFlow-checagem/
├── src/
│   ├── components/
│   │   ├── DocumentCheckView.tsx    # Componente principal de checagem
│   │   └── ui/                      # Componentes shadcn/ui
│   ├── services/                    # ✨ NOVO!
│   │   ├── documentExtractor.ts     # Extração de texto
│   │   └── openaiAnalyzer.ts        # Análise com IA
│   ├── assets/                      # Imagens e recursos
│   └── main.tsx                     # Entry point
├── test-docs/                       # Documentos de teste
├── .env.example                     # Template de configuração
├── package.json
├── vite.config.ts
└── README.md
```

## 🔄 Próximas Melhorias

### Curto Prazo
- [ ] Extração real de PDFs (pdf-parse)
- [ ] Extração real de DOCs (mammoth)
- [ ] Validação de tamanho e tipo de arquivo
- [ ] Tratamento de erros mais robusto
- [ ] Loading states mais detalhados

### Médio Prazo
- [ ] Backend para processamento seguro
- [ ] Autenticação de usuários
- [ ] Histórico de análises
- [ ] Exportação de relatórios em PDF
- [ ] Cache de análises repetidas

### Longo Prazo
- [ ] OCR para documentos escaneados
- [ ] Suporte a mais formatos
- [ ] Dashboard com métricas
- [ ] Regras de validação personalizáveis
- [ ] API REST para integração

## 🐛 Problemas Conhecidos

- ⚠️ Extração de PDFs e DOCs ainda usa dados simulados
- ⚠️ API key exposta no frontend (apenas para desenvolvimento)
- ⚠️ Sem tratamento de timeout para análises longas
- ⚠️ Sem retry automático em caso de falha da API

## 🤝 Contribuindo

Este é um projeto em desenvolvimento ativo. Contribuições são bem-vindas!

## 📄 Licença

Este projeto é privado e proprietário.

## 👥 Equipe

Desenvolvido para CalixFlow

## 📞 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato através do GitHub.

---

**Última atualização**: 11/11/2025  
**Versão**: 0.2.0 - Integração com GPT-3.5 implementada ✨
