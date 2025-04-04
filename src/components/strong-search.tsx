import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { searchStrong } from "@/services/strongService";
import { Loader2 } from "lucide-react";
import { Strong } from "@/data/strong-dictionary";
import { useTranslation } from "react-i18next";

export function StrongSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ number: string; strong: Strong } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: t("search.empty"),
        description: t("search.emptyMessage"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const strongResult = await searchStrong(query, i18n);
      
      if (strongResult) {
          setResult(strongResult);
      } else {
        toast({
          title: t("search.notFound"),
          description: t("search.notFoundMessage", { code: query.toUpperCase() }),
          variant: "destructive",
        });
        setResult(null);
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      toast({
        title: t("search.error"),
        description: t("search.errorMessage"),
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
          placeholder={t("search.placeholder")}
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
              {t("search.loading")}
            </>
          ) : (
            t("search.button")
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
          {(result.strong.lemma || result.strong.xlit) && <p className="text-lg whitespace-pre-line">{result.strong.lemma} {result.strong.xlit}</p>}
          {result.strong.pron && <p className="text-lg whitespace-pre-line"><b>{t("strong.pronunciation")}</b>: {result.strong.pron}</p>}
          {result.strong.strongs_def && <p className="text-lg whitespace-pre-line"><b>{t("strong.strongDefinition")}</b>: {result.strong.strongs_def}</p>}
          {result.strong.kjv_def && <p className="text-lg whitespace-pre-line"><b>{t("strong.kjvDefinition")}</b>: {result.strong.kjv_def}</p>}
          {result.strong.derivation && <p className="text-lg whitespace-pre-line"><b>{t("strong.derivation")}</b>: {result.strong.derivation}</p>}
        </div>
      )}
    </div>
  );
}
