
import { strongDictionary } from "@/data/strong-data";

export async function searchStrong(code: string): Promise<{ number: string; definition: string } | null> {
  // Normaliza o código Strong (maiúsculas, sem espaços)
  const normalizedCode = code.trim().toUpperCase();
  
  try {
    // Primeira tentativa: buscar diretamente do dicionário local
    if (strongDictionary[normalizedCode]) {
      console.log("Código Strong encontrado no dicionário local:", normalizedCode);
      return {
        number: normalizedCode,
        definition: strongDictionary[normalizedCode]
      };
    }
    
    // Se não encontrado no dicionário local, tenta a "API"
    // Em produção, você teria uma API real conectada ao PostgreSQL
    console.log("Código Strong não encontrado no dicionário local, tentando API:", normalizedCode);
    
    const response = await fetch(`/api/strong/${normalizedCode}`);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    // Verifica se o tipo de conteúdo é JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") === -1) {
      // Se não for JSON, tenta obter o texto e fazer parse manual
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        return data;
      } catch (parseError) {
        console.error("Erro ao parsear resposta:", text);
        // Fallback para o dicionário local
        if (strongDictionary[normalizedCode]) {
          return {
            number: normalizedCode,
            definition: strongDictionary[normalizedCode]
          };
        }
        return null;
      }
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar código Strong:", error);
    
    // Fallback para o dicionário local em caso de erro
    if (strongDictionary[normalizedCode]) {
      console.log("Usando fallback do dicionário local para:", normalizedCode);
      return {
        number: normalizedCode,
        definition: strongDictionary[normalizedCode]
      };
    }
    
    return null;
  }
}
