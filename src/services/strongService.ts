
import { Strong, strongDictionary } from "@/data/strong-dictionary";

export async function searchStrong(code: string): Promise<{ number: string; strong: Strong } | null> {
  // Normaliza o código Strong (maiúsculas, sem espaços)
  const normalizedCode = code.trim().toUpperCase();
  
  try {
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
        return null;
      }
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar código Strong:", error);
    return null;
  }
}
