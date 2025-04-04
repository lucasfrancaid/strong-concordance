import { StrongSearch } from "@/components/strong-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <header className="py-4 px-6 border-b">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">{t("app.title")}</h1>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">
              {t("home.title")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("home.subtitle")}
            </p>
          </div>

          <StrongSearch />

          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>
              {t("home.description")}
            </p>
            <p className="mt-2">
              {t("home.hebrew")}
              <br />
              {t("home.greek")}
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {t("app.creator")}. {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
