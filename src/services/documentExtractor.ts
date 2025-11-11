/**
 * Serviço de Extração de Texto de Documentos
 * 
 * Extrai texto de arquivos PDF, DOC, DOCX e TXT
 * Para produção, considere usar bibliotecas como pdf-parse ou mammoth
 */

export class DocumentExtractor {
  /**
   * Extrai texto de um arquivo
   * Versão simplificada que lê apenas arquivos de texto
   * Para PDFs e DOCs, seria necessário adicionar bibliotecas específicas
   */
  async extractText(file: File): Promise<string> {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    
    // Para esta versão, vamos simular a extração
    // Em produção, use pdf-parse para PDFs e mammoth para DOCs
    
    if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      return await this.readTextFile(file);
    }
    
    // Para PDFs e DOCs, vamos retornar um texto simulado baseado no nome do arquivo
    // Isso permite testar a integração com OpenAI
    return this.generateMockText(file);
  }
  
  /**
   * Lê arquivo de texto puro
   */
  private async readTextFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };
      
      reader.onerror = () => {
        reject(new Error('Erro ao ler arquivo'));
      };
      
      reader.readAsText(file);
    });
  }
  
  /**
   * Gera texto mockado baseado no tipo de documento
   * Em produção, isso seria substituído por extração real
   */
  private generateMockText(file: File): string {
    const fileName = file.name.toLowerCase();
    
    // Detecta tipo de documento pelo nome
    if (fileName.includes('pi') || fileName.includes('pedido')) {
      return this.generatePIMock();
    } else if (fileName.includes('nota') || fileName.includes('fiscal') || fileName.includes('nf')) {
      return this.generateNotaFiscalMock();
    } else if (fileName.includes('299') || fileName.includes('artigo')) {
      return this.generateArtigo299Mock();
    } else if (fileName.includes('relatorio') || fileName.includes('report')) {
      return this.generateRelatorioMock();
    } else if (fileName.includes('simples')) {
      return this.generateSimplesNacionalMock();
    }
    
    return `Documento: ${file.name}\nConteúdo extraído para análise.`;
  }
  
  private generatePIMock(): string {
    return `
PEDIDO DE INSERÇÃO (PI)
Número: PI-2025-001
Data de Emissão: 10/11/2025

DADOS DO FORNECEDOR:
CNPJ: 12.345.678/0001-90
Razão Social: Empresa Exemplo Ltda
Endereço: Rua Exemplo, 123 - São Paulo/SP

DADOS DO SERVIÇO:
Descrição: Serviços de publicidade e marketing digital
Período de Veiculação: Novembro/2025
Campanha: Black Friday 2025

VALORES:
Valor Total: R$ 150.000,00
Forma de Pagamento: Boleto bancário
Vencimento: 30/11/2025

OBSERVAÇÕES:
Serviço sujeito a retenção de impostos conforme legislação vigente.
    `.trim();
  }
  
  private generateNotaFiscalMock(): string {
    return `
NOTA FISCAL DE SERVIÇOS ELETRÔNICA
Número: 12345
Data de Emissão: 11/11/2025

PRESTADOR:
CNPJ: 12.345.678/0001-90
Razão Social: Empresa Exemplo Ltda
Endereço: Rua Exemplo, 123 - São Paulo/SP

TOMADOR:
CNPJ: 98.765.432/0001-10
Razão Social: Cliente ABC S.A.

DISCRIMINAÇÃO DOS SERVIÇOS:
Serviços de publicidade e marketing digital conforme PI-2025-001
Período: Novembro/2025

VALORES:
Valor dos Serviços: R$ 150.000,00
(-) Deduções: R$ 0,00
Valor Total da Nota: R$ 150.000,00

TRIBUTOS:
ISS: R$ 3.000,00
    `.trim();
  }
  
  private generateArtigo299Mock(): string {
    return `
DECLARAÇÃO - ARTIGO 299 DO RIR/2018

CNPJ: 12.345.678/0001-90
Razão Social: Empresa Exemplo Ltda

Declaramos para os devidos fins que a empresa acima qualificada
está enquadrada no regime de tributação do Simples Nacional.

Período de Vigência: 01/01/2025 a 31/12/2025
Data de Emissão: 10/11/2025

Esta declaração é válida para fins de não retenção de tributos
federais na fonte.
    `.trim();
  }
  
  private generateRelatorioMock(): string {
    return `
RELATÓRIO DE VEICULAÇÃO
Campanha: Black Friday 2025
Cliente: Cliente ABC S.A.
Período: Novembro/2025

RESUMO DA CAMPANHA:
- Investimento Total: R$ 150.000,00
- Plataformas: Google Ads, Meta Ads, LinkedIn
- Impressões: 2.500.000
- Cliques: 125.000
- Conversões: 3.750

MÉTRICAS DE PERFORMANCE:
- CTR: 5,0%
- CPC: R$ 1,20
- CPA: R$ 40,00
- ROAS: 450%

Relatório gerado em: 30/11/2025
    `.trim();
  }
  
  private generateSimplesNacionalMock(): string {
    return `
COMPROVANTE DE OPÇÃO PELO SIMPLES NACIONAL

CNPJ: 12.345.678/0001-90
Razão Social: Empresa Exemplo Ltda

Situação: ATIVA no Simples Nacional
Data de Opção: 01/01/2024
Período de Validade: 01/01/2025 a 31/12/2025

Anexo de Tributação: Anexo III - Serviços

Este documento comprova que a empresa está regularmente
inscrita no Regime Especial Unificado de Arrecadação de
Tributos e Contribuições - Simples Nacional.

Emitido em: 10/11/2025
    `.trim();
  }
}
