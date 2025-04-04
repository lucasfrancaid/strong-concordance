import { Strong } from "@/data/strong-dictionary";
import { getStrongTranslation } from "@/i18n/strongTranslations";
import { i18n } from "i18next";

export async function searchStrong(code: string, i18n: i18n): Promise<{ number: string; strong: Strong } | null> {

  // Normaliza o código Strong (maiúsculas, sem espaços)
  const normalizedCode = code.trim().toUpperCase();
  
  try {
    // Primeira tentativa: buscar diretamente do dicionário local
    const strongData: Strong = getStrongTranslation(normalizedCode, i18n.language);
    
    if (strongData) {
      return {
        number: normalizedCode,
        strong: strongData,
      };
    }
    
    // Se não encontrado no dicionário local, tenta a "API"
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
