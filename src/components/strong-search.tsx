
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { strongDictionary } from "@/data/strong-data";

export function StrongSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ number: string; definition: string } | null>(null);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Campo vazio",
        description: "Por favor, digite um número Strong para pesquisar",
        variant: "destructive",
      });
      return;
    }

    // Processar o número Strong (formatar para G#### ou H####)
    let formattedQuery = query.trim().toUpperCase();
    
    // Verificar se começa com G ou H, caso contrário, assumir H (hebraico) se for apenas número
    if (!formattedQuery.startsWith("G") && !formattedQuery.startsWith("H")) {
      // Tentar determinar se é grego ou hebraico com base no número
      const numericPart = parseInt(formattedQuery, 10);
      if (numericPart > 0 && numericPart < 10000) {
        if (numericPart <= 8674) {
          formattedQuery = `H${formattedQuery.padStart(4, '0')}`;
        } else {
          formattedQuery = `G${formattedQuery.padStart(4, '0')}`;
        }
      }
    } else {
      // Já tem H ou G, apenas formatar o número para ter 4 dígitos
      const prefix = formattedQuery.charAt(0);
      const numPart = formattedQuery.substring(1);
      formattedQuery = `${prefix}${numPart.padStart(4, '0')}`;
    }

    // Buscar no dicionário
    const strongResult = strongDictionary[formattedQuery];
    
    if (strongResult) {
      setResult({
        number: formattedQuery,
        definition: strongResult,
      });
    } else {
      toast({
        title: "Não encontrado",
        description: `Nenhum resultado encontrado para o número Strong "${formattedQuery}"`,
        variant: "destructive",
      });
      setResult(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-8">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o número Strong (ex: H1254 ou G3056)"
          className="flex-1 text-lg"
        />
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Pesquisar
        </Button>
      </form>

      {result && (
        <div className="strong-result p-6 rounded-lg bg-card text-card-foreground shadow-md border">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium mr-2">
              {result.number}
            </span>
          </div>
          <p className="text-lg whitespace-pre-line">{result.definition}</p>
        </div>
      )}
    </div>
  );
}
