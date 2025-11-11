# 🚀 Guia Rápido - Integração GPT-3.5

## ✅ O que foi implementado

A integração com OpenAI GPT-3.5 está **100% funcional**! O sistema agora realiza análise real de documentos usando inteligência artificial.

## 📋 Como usar

### 1. Configurar API Key

```bash
# Copie o template
cp .env.example .env

# Edite o arquivo .env e adicione sua chave
VITE_OPENAI_API_KEY=sk-proj-sua-chave-aqui
```

**Obtenha sua chave em**: https://platform.openai.com/api-keys

### 2. Instalar e Executar

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm dev
```

### 3. Testar com Documentos de Exemplo

Use os arquivos em `test-docs/`:

1. Acesse http://localhost:3000
2. Faça upload de `test-docs/PI-teste.txt` como documento base
3. Faça upload de `test-docs/NotaFiscal-teste.txt` para validação
4. Clique em "Iniciar Checagem"
5. Aguarde ~5-10 segundos (análise com IA)
6. Veja os resultados!

## 🎯 O que a IA analisa

### Para Nota Fiscal:
- CNPJ do Fornecedor/Prestador
- Razão Social
- Valor Total da Nota
- Número da Nota Fiscal
- Data de Emissão
- Descrição dos Serviços

### Para Artigo 299:
- CNPJ da Empresa
- Razão Social
- Período de Vigência
- Data de Emissão
- Regime de Tributação

### Para Relatórios:
- Período de Veiculação
- Nome do Cliente
- Nome da Campanha
- Valor Investido
- Métricas de Performance

### Para Simples Nacional:
- CNPJ
- Razão Social
- Período de Validade
- Situação no Simples Nacional

## 💡 Como funciona

1. **Extração de Texto**: O sistema extrai texto dos documentos
2. **Análise com IA**: GPT-3.5 compara os campos importantes
3. **Classificação**: Cada divergência recebe uma severidade:
   - 🔴 **Critical**: Impede aprovação (ex: CNPJ diferente)
   - 🟡 **Warning**: Precisa revisão (ex: valor discrepante)
   - 🔵 **Info**: Informação complementar
4. **Resultado**: Status geral e detalhamento por documento

## 📊 Exemplo de Análise

**Documento**: NotaFiscal-teste.txt  
**Status**: ⚠️ Warning

**Divergências encontradas**:
- ✅ CNPJ: Match (12.345.678/0001-90)
- ✅ Razão Social: Match (Empresa Exemplo Ltda)
- ⚠️ Valor Total: Divergência
  - PI: R$ 150.000,00
  - NF: R$ 148.500,00
  - Diferença: R$ 1.500,00
- ✅ Período: Match (Novembro/2025)

## 💰 Custos

### Por Análise
- Tokens médios: ~4000 input + 500 output
- Custo: **$0.01 - $0.02**

### Mensal
- 100 análises/dia = **$1-2/dia**
- 2000 análises/mês = **$20-40/mês**

### Comparação
- GPT-3.5: $0.01/análise ✅
- GPT-4: $0.10/análise (10x mais caro)

## ⚠️ Limitações Atuais

1. **Extração de PDFs/DOCs**: Ainda usa dados simulados
   - Para testar, use arquivos `.txt`
   - Para produção, adicionar `pdf-parse` e `mammoth`

2. **API Key no Frontend**: Apenas para desenvolvimento
   - Para produção, criar backend
   - Nunca expor API key em produção

3. **Sem Retry**: Se a API falhar, precisa tentar novamente
   - Implementar retry automático em versão futura

## 🔧 Troubleshooting

### Erro: "VITE_OPENAI_API_KEY não configurada"
**Solução**: Crie o arquivo `.env` com sua chave da OpenAI

### Erro: "Invalid API key"
**Solução**: Verifique se a chave está correta e ativa

### Erro: "Rate limit exceeded"
**Solução**: Aguarde alguns minutos ou aumente seu limite na OpenAI

### Análise muito lenta
**Normal**: GPT-3.5 leva 5-15 segundos por documento

### Divergências não detectadas
**Verifique**: 
- Os campos estão escritos de forma clara?
- Os valores estão no formato correto?
- Tente reformular o texto do documento

## 🚀 Próximos Passos

### Para Desenvolvimento
1. Adicionar extração real de PDFs
2. Criar backend seguro
3. Implementar cache de análises
4. Adicionar testes automatizados

### Para Produção
1. **Obrigatório**: Mover API key para backend
2. Implementar autenticação
3. Adicionar logging e monitoramento
4. Configurar rate limiting

## 📚 Arquivos Importantes

- `src/services/documentExtractor.ts` - Extração de texto
- `src/services/openaiAnalyzer.ts` - Análise com IA
- `src/components/DocumentCheckView.tsx` - Interface
- `.env.example` - Template de configuração
- `test-docs/` - Documentos de teste

## 🎉 Pronto para usar!

A integração está funcionando. Basta configurar sua API key e começar a testar!

**Dúvidas?** Consulte:
- `README.md` - Documentação completa
- `INTEGRACAO_OPENAI.md` - Detalhes técnicos
- `ANALISE_BUGS.md` - Bugs conhecidos

---

**Versão**: 0.2.0  
**Data**: 11/11/2025  
**Status**: ✅ Funcional com GPT-3.5
