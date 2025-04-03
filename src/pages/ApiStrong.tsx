
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { strongDictionary } from "@/data/strong-data";

// Esta página simula uma API de backend, em produção você teria um endpoint real
export default function ApiStrong() {
  const { code } = useParams<{ code: string }>();
  const [data, setData] = useState<{ number: string; definition: string } | null>(null);

  useEffect(() => {
    if (code) {
      // Aqui você faria a consulta ao PostgreSQL
      // Por enquanto, usamos o dicionário existente para simulação
      const definition = strongDictionary[code];
      
      if (definition) {
        setData({
          number: code,
          definition: definition
        });
      } else {
        setData(null);
      }
    }
  }, [code]);

  // Retornar dados como JSON
  useEffect(() => {
    if (document) {
      document.body.innerHTML = '';
      document.body.textContent = JSON.stringify(data);
      document.body.style.fontFamily = 'monospace';
      document.body.style.whiteSpace = 'pre';
    }
  }, [data]);

  return null;
}
