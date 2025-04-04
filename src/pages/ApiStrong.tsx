
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Strong } from "@/data/strong-dictionary";

// Esta página simula uma API de backend, em produção você teria um endpoint real
export default function ApiStrong() {
  const { code } = useParams<{ code: string }>();
  const [data, setData] = useState<{ number: string; strong: Strong } | null>(null);

  useEffect(() => {
    if (code && code == "LL2210") {
      const strong: Strong = {
        lemma: "nóix",
        xlit: "brabo",
        pron: "bra-bo",
        derivation: "a nice word;",
        strongs_def: "ihuuuuuuuuuu",
        kjv_def: "ihuuuuw"
      }

      if (strong) {
        setData({
          number: code,
          strong: strong,
        });
      } else {
        setData(null);
      }
    }
  }, [code]);

  // // Retornar dados como JSON puro
  useEffect(() => {
    if (document) {
      // Remove todo o conteúdo HTML existente
      document.head.innerHTML = '';
      document.body.innerHTML = '';
      
      // Define o tipo de conteúdo como JSON
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Type';
      meta.content = 'application/json';
      document.head.appendChild(meta);
      
      // Adiciona os dados JSON como texto sem formatação HTML
      document.body.textContent = JSON.stringify(data);
      
      // Remove estilos para garantir que seja apenas texto puro
      document.body.style.all = 'unset';
      document.body.style.fontFamily = 'monospace';
      document.body.style.whiteSpace = 'pre';
    }
  }, [data]);

  return null;
}
