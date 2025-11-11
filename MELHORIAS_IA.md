# 🤖 Melhorias na Inteligência Artificial

## ✨ O que foi implementado

### 1. 📚 Prompts Especializados

A IA agora **entende profundamente** o que é cada tipo de documento!

#### Conhecimento Adicionado:

**📄 PI - Pedido de Inserção**
- O que é: Documento base que autoriza veiculação de mídia
- Campos principais: Número do PI, Cliente, Produto, Veículo, Período, Valor Total, Formato, Praça, Agência
- Importância: É o documento MESTRE contra o qual todos os outros são validados

**📋 Nota Fiscal**
- O que é: Documento fiscal que comprova prestação de serviço
- Campos principais: Número NF, Emitente, Tomador, Valor Total, Descrição, Período, Impostos
- Validações: Valor deve bater com PI, Período dentro do PI, Descrição compatível

**📸 Comprovante de Veiculação**
- O que é: Prova de que a mídia foi ao ar
- Campos: Data/Hora, Veículo, Formato, Programa, Evidência
- Validações: Data no período do PI, Veículo igual ao PI

**🗺️ Mapa de Mídia**
- O que é: Planejamento detalhado da campanha
- Campos: Cronograma, Veículos, Formatos, Valores, Métricas
- Validações: Total bate com PI, Período dentro do PI

### 2. 🎯 Regras de Validação Inteligentes

**Tolerância de Valores:**
- Aceita diferença de até 1% (arredondamentos)
- Exemplo: R$ 150.000,00 vs R$ 148.500,00 = CRÍTICO (>1%)
- Exemplo: R$ 150.000,00 vs R$ 149.800,00 = ATENÇÃO (<1%)

**Classificação de Severidade:**

⛔ **CRÍTICO** (Impede aprovação):
- Valor divergente acima de 1%
- Período fora do aprovado
- Veículo diferente
- Cliente/CNPJ incorreto

⚠️ **ATENÇÃO** (Requer revisão):
- Valor com diferença <1%
- Descrição incompleta
- Formato similar mas não idêntico
- Campos opcionais faltando

ℹ️ **INFO** (Apenas informativo):
- Informações adicionais
- Formatação diferente
- Observações gerais

### 3. 🖼️ Suporte a Imagens com GPT-4 Vision

Agora você pode fazer upload de **fotos de documentos**!

**Formatos aceitos:**
- ✅ JPG / JPEG
- ✅ PNG
- ✅ WEBP
- ✅ GIF

**Processamento automático:**
1. Valida formato e tamanho (max 10MB)
2. Redimensiona se necessário (max 2048px)
3. Converte para base64
4. Envia para GPT-4 Vision
5. IA lê o texto da imagem (OCR)
6. Compara com o PI

**Casos de uso:**
- Foto de nota fiscal tirada com celular
- Print de tela de sistema
- Documento escaneado
- PDF convertido para imagem

### 4. 📝 Prompts Estruturados e Detalhados

**Antes:**
```
"Compare estes documentos e identifique divergências"
```

**Agora:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 DOCUMENTO BASE (PI - Pedido de Inserção)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Texto do PI]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DOCUMENTO PARA VALIDAÇÃO (Nota Fiscal)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Texto da NF]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 CAMPOS A COMPARAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Número da Nota Fiscal
✓ CNPJ do Emitente (Veículo)
✓ Razão Social do Emitente
✓ Valor Total da NF
✓ Data de Emissão
✓ Descrição do Serviço
✓ Período de Veiculação
✓ ISS, PIS, COFINS

[Instruções detalhadas de análise...]
```

### 5. 🧠 Contexto Especializado

A IA agora recebe um **prompt de sistema** completo com:

- Definições de cada tipo de documento
- Regras de validação específicas
- Níveis de severidade com exemplos
- Tolerâncias e exceções
- Conhecimento do domínio de mídia/publicidade

**Resultado:** Análises muito mais precisas e contextualizadas!

---

## 🚀 Como Usar

### Upload de Documentos de Texto

1. Faça upload do PI (TXT, PDF, DOC)
2. Faça upload dos documentos para validar
3. Clique em "Iniciar Checagem"
4. A IA analisa com os prompts especializados

### Upload de Imagens

1. Faça upload do PI (texto)
2. **Tire uma foto** da Nota Fiscal com seu celular
3. Faça upload da foto (JPG, PNG)
4. Clique em "Iniciar Checagem"
5. GPT-4 Vision **lê automaticamente** o texto da imagem
6. Compara com o PI

---

## 📊 Comparação: Antes vs Agora

| Aspecto | Antes | Agora |
|---------|-------|-------|
| **Conhecimento** | Genérico | Especializado em PI/NF |
| **Formatos** | TXT, PDF, DOC | + JPG, PNG, WEBP, GIF |
| **OCR** | ❌ Não | ✅ GPT-4 Vision |
| **Prompts** | Simples | Estruturados e detalhados |
| **Validações** | Básicas | Regras específicas por campo |
| **Severidade** | Genérica | 3 níveis com critérios claros |
| **Tolerância** | Nenhuma | 1% para valores monetários |
| **Contexto** | Pouco | Conhecimento profundo do domínio |

---

## 💰 Custos

### GPT-3.5-turbo (Documentos de Texto)
- **Custo por análise:** ~$0.01 - $0.02
- **Uso recomendado:** Documentos digitais (TXT, PDF)

### GPT-4 Vision (Imagens)
- **Custo por análise:** ~$0.05 - $0.10
- **Uso recomendado:** Fotos, prints, documentos escaneados

**Estimativa mensal:**
- 100 análises/mês (50 texto + 50 imagem): ~$3 - $6
- 500 análises/mês (250 texto + 250 imagem): ~$15 - $30

---

## 🧪 Exemplos de Análise

### Exemplo 1: Divergência de Valor

**PI:**
```
Valor Total: R$ 150.000,00
```

**Nota Fiscal:**
```
Valor Total: R$ 148.500,00
```

**Resultado da IA:**
```json
{
  "field": "Valor Total",
  "piValue": "R$ 150.000,00",
  "documentValue": "R$ 148.500,00",
  "match": false,
  "confidence": 0.95,
  "severity": "critical",
  "explanation": "Divergência de R$ 1.500,00 (1%). Valor da NF está abaixo do aprovado no PI."
}
```

### Exemplo 2: Período Correto

**PI:**
```
Período: 15/11/2025 a 30/11/2025
```

**Nota Fiscal:**
```
Período de Veiculação: 15/11/2025 a 30/11/2025
```

**Resultado da IA:**
```json
{
  "field": "Período de Veiculação",
  "piValue": "15/11/2025 a 30/11/2025",
  "documentValue": "15/11/2025 a 30/11/2025",
  "match": true,
  "confidence": 1.0,
  "severity": "info",
  "explanation": "Período está correto e dentro do aprovado no PI."
}
```

### Exemplo 3: Análise de Imagem

**Upload:** Foto de Nota Fiscal tirada com celular

**Processo:**
1. IA detecta que é imagem
2. Processa e redimensiona
3. Envia para GPT-4 Vision
4. Vision lê: "Número NF: 12345, Valor: R$ 148.500,00..."
5. Compara com PI
6. Retorna análise detalhada

---

## 🔄 Próximas Melhorias Sugeridas

### Curto Prazo
1. ✅ **Feito:** Prompts especializados
2. ✅ **Feito:** Suporte a imagens
3. 🔜 **Próximo:** Extração real de PDFs (pdf-parse)
4. 🔜 **Próximo:** Melhorar OCR para documentos de baixa qualidade

### Médio Prazo
1. Cache de análises (evitar reprocessar)
2. Histórico de análises
3. Relatórios em PDF
4. Integração com APIs de veículos

### Longo Prazo
1. Machine Learning para aprender com correções
2. Detecção automática de tipo de documento
3. Sugestões de correção
4. Dashboard de métricas

---

## 📚 Arquivos Criados/Modificados

### Novos Arquivos:
- `src/services/documentDefinitions.ts` - Definições de documentos
- `src/services/imageProcessor.ts` - Processamento de imagens

### Arquivos Modificados:
- `src/services/openaiAnalyzer.ts` - Prompts especializados + Vision
- `src/services/documentExtractor.ts` - Suporte a imagens
- `src/components/DocumentCheckView.tsx` - Interface para imagens

---

## ✅ Status

| Item | Status |
|------|--------|
| Prompts especializados | ✅ Implementado |
| Conhecimento de PI/NF | ✅ Implementado |
| Regras de validação | ✅ Implementado |
| Suporte a imagens | ✅ Implementado |
| GPT-4 Vision | ✅ Implementado |
| Interface atualizada | ✅ Implementado |
| Build funcionando | ✅ Testado |
| Commit no GitHub | ✅ Feito |
| Documentação | ✅ Completa |

---

## 🎯 Como Atualizar no Seu Mac

```bash
cd ~/Downloads/CalixFlow-checagem
git pull
pnpm install
pnpm dev
```

Acesse: http://localhost:3000

**Agora você pode:**
- ✅ Fazer upload de imagens
- ✅ Análise muito mais precisa
- ✅ IA entende PI e Nota Fiscal
- ✅ Validações inteligentes

---

**Tudo pronto para uso! 🚀**
