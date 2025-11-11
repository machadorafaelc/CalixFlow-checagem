/**
 * Serviço de Análise de Documentos com OpenAI
 * 
 * Usa GPT-3.5-turbo para comparar documentos e identificar divergências
 */

import OpenAI from 'openai';

export interface DocumentComparison {
  field: string;
  piValue: string;
  documentValue: string;
  match: boolean;
  confidence: number;
  severity: 'critical' | 'warning' | 'info';
  explanation?: string;
}

export interface AnalysisResult {
  comparisons: DocumentComparison[];
  overallStatus: 'approved' | 'rejected' | 'warning';
  summary: string;
}

export class OpenAIAnalyzer {
  private openai: OpenAI;
  
  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('VITE_OPENAI_API_KEY não configurada. Adicione no arquivo .env');
    }
    
    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // Apenas para desenvolvimento/teste
    });
  }
  
  /**
   * Compara dois documentos e identifica divergências
   */
  async compareDocuments(
    piText: string,
    documentText: string,
    documentType: string
  ): Promise<AnalysisResult> {
    try {
      const prompt = this.buildComparisonPrompt(piText, documentText, documentType);
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Usando GPT-3.5 para economia
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em análise de documentos fiscais e comerciais brasileiros. Sua função é comparar documentos e identificar divergências com precisão.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1, // Baixa temperatura para respostas consistentes
        max_tokens: 2000,
      });
      
      const content = response.choices[0].message.content || '{}';
      const result = this.parseAIResponse(content);
      
      return result;
      
    } catch (error) {
      console.error('Erro ao analisar com OpenAI:', error);
      throw new Error(`Falha na análise: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }
  
  /**
   * Constrói o prompt para comparação de documentos
   */
  private buildComparisonPrompt(
    piText: string,
    documentText: string,
    documentType: string
  ): string {
    const fieldsToCompare = this.getFieldsForDocumentType(documentType);
    
    return `
Analise e compare os seguintes documentos brasileiros:

**DOCUMENTO BASE (PI - Pedido de Inserção):**
${piText}

**DOCUMENTO PARA VALIDAÇÃO (${this.getDocumentTypeName(documentType)}):**
${documentText}

**CAMPOS IMPORTANTES A COMPARAR:**
${fieldsToCompare.join('\n')}

**INSTRUÇÕES:**
1. Extraia os valores dos campos especificados de ambos os documentos
2. Compare cada campo e identifique se há divergências
3. Para cada campo, classifique a severidade:
   - "critical": Valores completamente diferentes que impedem aprovação (ex: CNPJ diferente, valor muito discrepante)
   - "warning": Pequenas diferenças que precisam revisão (ex: formatação diferente, valor com pequena diferença)
   - "info": Informações complementares ou campos que não constam em um dos documentos
4. Atribua um nível de confiança (0 a 1) para cada comparação
5. Se um campo não existir em um dos documentos, indique como "info"

**RESPONDA APENAS COM UM JSON NO SEGUINTE FORMATO:**
{
  "comparisons": [
    {
      "field": "Nome do Campo",
      "piValue": "Valor no PI",
      "documentValue": "Valor no Documento",
      "match": true ou false,
      "confidence": 0.95,
      "severity": "critical" ou "warning" ou "info",
      "explanation": "Breve explicação da divergência (se houver)"
    }
  ],
  "overallStatus": "approved" ou "rejected" ou "warning",
  "summary": "Resumo geral da análise"
}

**IMPORTANTE:** Responda APENAS com o JSON, sem texto adicional antes ou depois.
`;
  }
  
  /**
   * Define campos a serem comparados por tipo de documento
   */
  private getFieldsForDocumentType(documentType: string): string[] {
    const fieldsMap: Record<string, string[]> = {
      'notaFiscal': [
        '- CNPJ do Fornecedor/Prestador',
        '- Razão Social',
        '- Valor Total da Nota',
        '- Número da Nota Fiscal',
        '- Data de Emissão',
        '- Descrição dos Serviços'
      ],
      'artigo299': [
        '- CNPJ da Empresa',
        '- Razão Social',
        '- Período de Vigência',
        '- Data de Emissão',
        '- Regime de Tributação (Simples Nacional)'
      ],
      'relatorios': [
        '- Período de Veiculação',
        '- Nome do Cliente',
        '- Nome da Campanha',
        '- Valor Investido',
        '- Métricas de Performance'
      ],
      'simplesNacional': [
        '- CNPJ',
        '- Razão Social',
        '- Período de Validade',
        '- Situação no Simples Nacional (Ativa/Inativa)'
      ]
    };
    
    return fieldsMap[documentType] || [
      '- CNPJ',
      '- Razão Social',
      '- Valores',
      '- Datas'
    ];
  }
  
  /**
   * Retorna nome legível do tipo de documento
   */
  private getDocumentTypeName(documentType: string): string {
    const names: Record<string, string> = {
      'notaFiscal': 'Nota Fiscal',
      'artigo299': 'Artigo 299',
      'relatorios': 'Relatório de Veiculação',
      'simplesNacional': 'Comprovante Simples Nacional'
    };
    
    return names[documentType] || documentType;
  }
  
  /**
   * Faz parsing da resposta da IA
   */
  private parseAIResponse(content: string): AnalysisResult {
    try {
      // Remove possíveis markdown code blocks
      let jsonStr = content.trim();
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```\n?/g, '');
      }
      
      const parsed = JSON.parse(jsonStr);
      
      // Valida estrutura
      if (!parsed.comparisons || !Array.isArray(parsed.comparisons)) {
        throw new Error('Resposta inválida: falta array de comparisons');
      }
      
      return {
        comparisons: parsed.comparisons.map((comp: any) => ({
          field: comp.field || 'Campo não identificado',
          piValue: comp.piValue || 'N/A',
          documentValue: comp.documentValue || 'N/A',
          match: comp.match === true,
          confidence: typeof comp.confidence === 'number' ? comp.confidence : 0.5,
          severity: this.validateSeverity(comp.severity),
          explanation: comp.explanation || ''
        })),
        overallStatus: this.validateStatus(parsed.overallStatus),
        summary: parsed.summary || 'Análise concluída'
      };
      
    } catch (error) {
      console.error('Erro ao fazer parsing da resposta:', error);
      console.error('Conteúdo recebido:', content);
      
      // Retorna resultado de erro
      return {
        comparisons: [],
        overallStatus: 'warning',
        summary: 'Erro ao processar resposta da IA. Verifique os logs.'
      };
    }
  }
  
  /**
   * Valida e normaliza severity
   */
  private validateSeverity(severity: any): 'critical' | 'warning' | 'info' {
    if (severity === 'critical' || severity === 'warning' || severity === 'info') {
      return severity;
    }
    return 'info';
  }
  
  /**
   * Valida e normaliza status
   */
  private validateStatus(status: any): 'approved' | 'rejected' | 'warning' {
    if (status === 'approved' || status === 'rejected' || status === 'warning') {
      return status;
    }
    return 'warning';
  }
}
