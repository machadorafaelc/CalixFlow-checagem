# Guia de Integração com OpenAI

Este documento descreve como implementar a integração real com OpenAI para análise de documentos no sistema CalixFlow.

## 📋 Visão Geral

A integração com OpenAI permitirá que o sistema:
1. Extraia texto de documentos PDF, DOC e DOCX
2. Analise e compare campos específicos entre o PI e outros documentos
3. Identifique divergências automaticamente
4. Classifique a severidade das divergências

## 🛠️ Pré-requisitos

### Dependências Necessárias

```bash
# Extração de texto de PDFs
pnpm add pdf-parse pdf.js

# Extração de texto de DOC/DOCX
pnpm add mammoth

# Cliente OpenAI
pnpm add openai

# Processamento de arquivos
pnpm add file-type
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_OPENAI_API_KEY=sua_chave_api_aqui
```

## 🏗️ Arquitetura Proposta

### 1. Serviço de Extração de Texto

Crie `src/services/documentExtractor.ts`:

```typescript
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export class DocumentExtractor {
  async extractText(file: File): Promise<string> {
    const fileType = file.type;
    
    if (fileType === 'application/pdf') {
      return await this.extractFromPDF(file);
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword'
    ) {
      return await this.extractFromWord(file);
    }
    
    throw new Error(`Tipo de arquivo não suportado: ${fileType}`);
  }
  
  private async extractFromPDF(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const data = await pdfParse(Buffer.from(arrayBuffer));
    return data.text;
  }
  
  private async extractFromWord(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }
}
```

### 2. Serviço de Análise com OpenAI

Crie `src/services/openaiAnalyzer.ts`:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Apenas para desenvolvimento
});

export interface DocumentComparison {
  field: string;
  piValue: string;
  documentValue: string;
  match: boolean;
  confidence: number;
  severity: 'critical' | 'warning' | 'info';
}

export class OpenAIAnalyzer {
  async compareDocuments(
    piText: string,
    documentText: string,
    documentType: string
  ): Promise<DocumentComparison[]> {
    const prompt = this.buildComparisonPrompt(piText, documentText, documentType);
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em análise de documentos fiscais e comerciais brasileiros.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1, // Baixa temperatura para respostas mais consistentes
      response_format: { type: 'json_object' }
    });
    
    const result = JSON.parse(response.choices[0].message.content || '{}');
    return this.parseComparisonResult(result);
  }
  
  private buildComparisonPrompt(
    piText: string,
    documentText: string,
    documentType: string
  ): string {
    const fieldsToCompare = this.getFieldsForDocumentType(documentType);
    
    return `
Analise e compare os seguintes documentos:

**Documento Base (PI):**
${piText}

**Documento para Validação (${documentType}):**
${documentText}

**Campos a serem comparados:**
${fieldsToCompare.join(', ')}

**Instruções:**
1. Extraia os valores dos campos especificados de ambos os documentos
2. Compare cada campo e identifique divergências
3. Classifique cada divergência como:
   - "critical": Valores completamente diferentes que impedem aprovação
   - "warning": Pequenas diferenças que precisam revisão
   - "info": Informações complementares ou formatação diferente
4. Atribua um nível de confiança (0-1) para cada comparação

**Formato de Resposta (JSON):**
{
  "comparisons": [
    {
      "field": "nome_do_campo",
      "piValue": "valor_no_pi",
      "documentValue": "valor_no_documento",
      "match": true/false,
      "confidence": 0.95,
      "severity": "critical/warning/info",
      "explanation": "breve explicação da divergência"
    }
  ]
}
`;
  }
  
  private getFieldsForDocumentType(documentType: string): string[] {
    const fieldsMap: Record<string, string[]> = {
      'notaFiscal': [
        'CNPJ do Fornecedor',
        'Razão Social',
        'Valor Total',
        'Número da Nota',
        'Data de Emissão',
        'Descrição dos Serviços'
      ],
      'artigo299': [
        'CNPJ',
        'Razão Social',
        'Período de Vigência',
        'Data de Emissão',
        'Número do Documento'
      ],
      'relatorios': [
        'Período de Veiculação',
        'Cliente',
        'Campanha',
        'Valores Investidos',
        'Métricas de Performance'
      ],
      'simplesNacional': [
        'CNPJ',
        'Razão Social',
        'Período de Validade',
        'Situação Cadastral'
      ]
    };
    
    return fieldsMap[documentType] || [];
  }
  
  private parseComparisonResult(result: any): DocumentComparison[] {
    if (!result.comparisons || !Array.isArray(result.comparisons)) {
      return [];
    }
    
    return result.comparisons.map((comp: any) => ({
      field: comp.field || '',
      piValue: comp.piValue || '',
      documentValue: comp.documentValue || '',
      match: comp.match === true,
      confidence: comp.confidence || 0,
      severity: comp.severity || 'info'
    }));
  }
}
```

### 3. Atualização do DocumentCheckView

Modifique `src/components/DocumentCheckView.tsx`:

```typescript
import { DocumentExtractor } from '../services/documentExtractor';
import { OpenAIAnalyzer } from '../services/openaiAnalyzer';

// Adicione no início do componente
const documentExtractor = new DocumentExtractor();
const openaiAnalyzer = new OpenAIAnalyzer();

// Substitua a função simulateAnalysis por:
const performRealAnalysis = async () => {
  if (!piDocument?.file) return;

  try {
    setCheckResult({
      status: 'analyzing',
      progress: 0,
      results: [],
      overallStatus: null,
    });

    // Extrai texto do PI
    setCheckResult(prev => prev ? { ...prev, progress: 10 } : null);
    const piText = await documentExtractor.extractText(piDocument.file);

    const results: AnalysisResult[] = [];
    let currentProgress = 20;
    const progressIncrement = 80 / Object.keys(documents).filter(
      key => documents[key as keyof typeof documents]
    ).length;

    // Analisa cada documento
    for (const [key, doc] of Object.entries(documents)) {
      if (!doc || (Array.isArray(doc) && doc.length === 0)) continue;

      const docsToAnalyze = Array.isArray(doc) ? doc : [doc];

      for (const document of docsToAnalyze) {
        if (!document.file) continue;

        // Extrai texto do documento
        const docText = await documentExtractor.extractText(document.file);

        // Analisa com OpenAI
        const comparisons = await openaiAnalyzer.compareDocuments(
          piText,
          docText,
          key
        );

        // Converte para formato de resultado
        const issues = comparisons
          .filter(comp => !comp.match)
          .map(comp => ({
            field: comp.field,
            piValue: comp.piValue,
            documentValue: comp.documentValue,
            severity: comp.severity
          }));

        const hasCritical = issues.some(i => i.severity === 'critical');
        const hasWarning = issues.some(i => i.severity === 'warning');

        results.push({
          documentType: document.name,
          status: hasCritical ? 'rejected' : (hasWarning ? 'warning' : 'approved'),
          issues,
          summary: issues.length === 0
            ? 'Documento em conformidade com o PI.'
            : `${issues.length} divergência(s) identificada(s).`
        });

        currentProgress += progressIncrement;
        setCheckResult(prev => prev ? { ...prev, progress: Math.min(currentProgress, 90) } : null);
      }
    }

    // Determina status geral
    const hasRejection = results.some(r => r.status === 'rejected');
    const hasWarning = results.some(r => r.status === 'warning');
    const overallStatus = hasRejection ? 'rejected' : (hasWarning ? 'warning' : 'approved');

    setCheckResult({
      status: 'completed',
      progress: 100,
      results,
      overallStatus
    });

  } catch (error) {
    console.error('Erro na análise:', error);
    // Adicionar tratamento de erro adequado
    alert('Erro ao analisar documentos. Verifique o console para detalhes.');
  }
};
```

## 🔒 Considerações de Segurança

### ⚠️ IMPORTANTE: Não use API keys no frontend em produção!

A configuração acima é apenas para **desenvolvimento e testes**. Para produção:

1. **Crie um Backend**:
   - API REST em Node.js, Python ou outra linguagem
   - Endpoint para upload de documentos
   - Processamento no servidor

2. **Armazenamento Seguro**:
   - Use variáveis de ambiente no servidor
   - Nunca exponha a API key no código cliente
   - Implemente autenticação (JWT, OAuth)

3. **Exemplo de Backend (Node.js/Express)**:

```javascript
// server.js
import express from 'express';
import multer from 'multer';
import OpenAI from 'openai';

const app = express();
const upload = multer({ dest: 'uploads/' });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Variável de ambiente no servidor
});

app.post('/api/analyze-documents', upload.array('documents'), async (req, res) => {
  try {
    // Processar arquivos
    // Extrair texto
    // Chamar OpenAI
    // Retornar resultados
    res.json({ results: [...] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('API rodando na porta 3001'));
```

## 💰 Custos Estimados

### Preços OpenAI (GPT-4 Turbo)
- Input: $0.01 / 1K tokens
- Output: $0.03 / 1K tokens

### Estimativa por Análise
- Documento PI: ~2000 tokens
- Documento para validação: ~1500 tokens
- Resposta: ~500 tokens
- **Custo por análise**: ~$0.05 - $0.10

### Otimizações de Custo
1. Use GPT-3.5-turbo para análises mais simples ($0.0005/1K tokens)
2. Implemente cache de análises repetidas
3. Extraia apenas seções relevantes dos documentos
4. Use fine-tuning para modelos mais eficientes

## 🧪 Testes

### Teste Manual
1. Prepare documentos de teste (PI e Nota Fiscal)
2. Execute a análise
3. Verifique se os campos são corretamente identificados
4. Valide a classificação de severidade

### Teste Automatizado
```typescript
describe('OpenAI Analyzer', () => {
  it('deve identificar divergências críticas', async () => {
    const analyzer = new OpenAIAnalyzer();
    const piText = 'CNPJ: 12.345.678/0001-90, Valor: R$ 150.000,00';
    const docText = 'CNPJ: 12.345.678/0001-91, Valor: R$ 150.000,00';
    
    const results = await analyzer.compareDocuments(piText, docText, 'notaFiscal');
    
    expect(results).toHaveLength(1);
    expect(results[0].severity).toBe('critical');
  });
});
```

## 📚 Recursos Adicionais

- [Documentação OpenAI](https://platform.openai.com/docs)
- [pdf-parse no npm](https://www.npmjs.com/package/pdf-parse)
- [mammoth.js](https://www.npmjs.com/package/mammoth)
- [Best Practices para Prompts](https://platform.openai.com/docs/guides/prompt-engineering)

## 🚀 Próximos Passos

1. Implementar extração de texto
2. Criar serviço de análise com OpenAI
3. Atualizar componente DocumentCheckView
4. Adicionar tratamento de erros robusto
5. Implementar backend para produção
6. Adicionar testes automatizados
7. Otimizar custos e performance

---

**Nota**: Este guia será atualizado conforme a implementação avança.
