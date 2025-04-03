
import { toast } from "@/hooks/use-toast";

interface StrongResult {
  number: string;
  definition: string;
}

export async function searchStrong(code: string): Promise<StrongResult | null> {
  try {
    // Formatar o código Strong para o formato adequado (G#### ou H####)
    let formattedCode = code.trim().toUpperCase();
    
    // Verificar se começa com G ou H, caso contrário, assumir H (hebraico) se for apenas número
    if (!formattedCode.startsWith("G") && !formattedCode.startsWith("H")) {
      // Tentar determinar se é grego ou hebraico com base no número
      const numericPart = parseInt(formattedCode, 10);
      if (numericPart > 0 && numericPart < 10000) {
        if (numericPart <= 8674) {
          formattedCode = `H${formattedCode.padStart(4, '0')}`;
        } else {
          formattedCode = `G${formattedCode.padStart(4, '0')}`;
        }
      }
    } else {
      // Já tem H ou G, apenas formatar o número para ter 4 dígitos
      const prefix = formattedCode.charAt(0);
      const numPart = formattedCode.substring(1);
      formattedCode = `${prefix}${numPart.padStart(4, '0')}`;
    }
    
    // Fazer a requisição para a API
    const response = await fetch(`/api/strong/${formattedCode}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.definition) {
      return null;
    }
    
    return {
      number: formattedCode,
      definition: data.definition
    };
  } catch (error) {
    console.error("Erro ao buscar código Strong:", error);
    toast({
      title: "Erro",
      description: "Não foi possível conectar ao banco de dados.",
      variant: "destructive",
    });
    return null;
  }
}
