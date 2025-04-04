// Este arquivo contém as traduções dos textos do dicionário Strong
// para diferentes idiomas

import { Strong, strongDictionaryEN, strongDictionaryPT } from "@/data/strong-dictionary";
  
  export type StrongTranslations = Record<string, Record<string, Strong>>;
  
  // Inicialmente apenas alguns exemplos, na prática seria um arquivo muito maior
  export const strongTranslations: StrongTranslations = {
    "en-US": strongDictionaryEN,
    "pt-BR": strongDictionaryPT,
  };
  
  export function getStrongTranslation(code: string, language: string): Strong | null {
    // Tenta encontrar a tradução no idioma especificado
    if (strongTranslations[language] && strongTranslations[language][code]) {
      return strongTranslations[language][code];
    }
    const strongData = strongTranslations["en-US"][code]
    if (strongData) return strongData;
  
    // Se não encontrou no idioma especificado, retorna null
    // Na prática, seria melhor retornar uma tradução de fallback
    return null;
  }
  