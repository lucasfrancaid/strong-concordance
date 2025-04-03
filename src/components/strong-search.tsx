
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { searchStrong } from "@/services/strongService";
import { Loader2 } from "lucide-react";
import { Strong } from "@/data/strong-dictionary";

export function StrongSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ number: string; strong: Strong } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Campo vazio",
        description: "Por favor, digite um número Strong para pesquisar",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const strongResult = await searchStrong(query);
      
      if (strongResult) {
        setResult(strongResult);
      } else {
        toast({
          title: "Não encontrado",
          description: `Nenhum resultado encontrado para o número Strong "${query.toUpperCase()}"`,
          variant: "destructive",
        });
        setResult(null);
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro durante a busca. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          className="bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Buscando...
            </>
          ) : (
            "Pesquisar"
          )}
        </Button>
      </form>

      {result && (
        <div className="strong-result p-6 rounded-lg bg-card text-card-foreground shadow-md border">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium mr-2">
              {result.number}
            </span>
          </div>
          <p className="text-lg whitespace-pre-line">{result.strong.strongs_def}</p>
          <p className="text-lg whitespace-pre-line">{result.strong.derivation}</p>
        </div>
      )}
    </div>
  );
}
