
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Strong, strongDictionary } from "@/data/strong-dictionary";

// Esta página simula uma API de backend, em produção você teria um endpoint real
export default function ApiStrong() {
  const { code } = useParams<{ code: string }>();
  const [data, setData] = useState<{ number: string; strong: Strong } | null>(null);

  useEffect(() => {
    if (code && code == "LL2210") {
      // Simula consulta ao PostgreSQL usando o dicionário expandido
      // const strong: Strong = strongDictionary[code];
      
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

  useEffect(() => {
    if (data !== null) {
      // Simulating an API response as JSON
      const response = new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });

      // Log the simulated response for debugging purposes
      console.log('Simulated API Response:', response);

      // Optionally, you can do something with the response, like sending it to another part of your app
      return response
    } else {
      console.log('No data found for the code.');
    }
  }, [data]);

  // // Retornar dados como JSON puro
  // useEffect(() => {
  //   if (document) {
  //     // Remove todo o conteúdo HTML existente
  //     document.head.innerHTML = '';
  //     document.body.innerHTML = '';
      
  //     // Define o tipo de conteúdo como JSON
  //     const meta = document.createElement('meta');
  //     meta.httpEquiv = 'Content-Type';
  //     meta.content = 'application/json';
  //     document.head.appendChild(meta);
      
  //     // Adiciona os dados JSON como texto sem formatação HTML
  //     document.body.textContent = JSON.stringify(data);
      
  //     // Remove estilos para garantir que seja apenas texto puro
  //     document.body.style.all = 'unset';
  //     document.body.style.fontFamily = 'monospace';
  //     document.body.style.whiteSpace = 'pre';
  //   }
  // }, [data]);

  return null;
}
