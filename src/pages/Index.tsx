
import { StrongSearch } from "@/components/strong-search";
import { ThemeToggle } from "@/components/theme-toggle";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <header className="py-4 px-6 border-b">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Forte Palavra BR</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">
              Concordância Strong em Português-BR
            </h2>
            <p className="text-muted-foreground mb-6">
              Digite um número Strong para buscar seu significado em português.
            </p>
          </div>

          <StrongSearch />

          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>
              A Concordância Strong é uma ferramenta que numera cada palavra original 
              (hebraico, aramaico e grego) da Bíblia, permitindo o estudo direto 
              dos textos originais mesmo sem conhecimento dessas línguas.
            </p>
            <p className="mt-2">
              Números que começam com "H" (H1-H8674) são palavras em Hebraico ou Aramaico.
              <br />
              Números que começam com "G" (G1-G5624) são palavras em Grego.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Forte Palavra BR. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
