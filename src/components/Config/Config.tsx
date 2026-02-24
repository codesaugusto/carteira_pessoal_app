import { useState } from "react";
import ConfigMenu from "./ConfigMenu";
import MeuPerfil from "../../pages/MeuPerfil";
import EditProfile from "../../pages/EditProfile";
import { ChevronLeft } from "lucide-react";

type ConfigPage =
  | "menu"
  | "perfil"
  | "editar-perfil"
  | "notificacoes"
  | "idioma"
  | "tema"
  | "privacidade";

// Placeholder components
const PlaceholderPage = ({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) => (
  <div className="p-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-green-500 mb-6 hover:opacity-80 transition"
    >
      <ChevronLeft className="w-5 h-5" />
      <span className="text-sm font-medium">Voltar</span>
    </button>
    <h1 className="text-3xl font-bold text-white">{title}</h1>
    <p className="text-gray-400 mt-4">Em desenvolvimento...</p>
  </div>
);

interface ConfigProps {
  initialPage?: ConfigPage;
}

const Config = ({ initialPage = "menu" }: ConfigProps) => {
  const [currentPage, setCurrentPage] = useState<ConfigPage>(initialPage);

  const renderPage = () => {
    switch (currentPage) {
      case "perfil":
        return (
          <MeuPerfil
            onBack={() => setCurrentPage("menu")}
            onEdit={() => setCurrentPage("editar-perfil")}
          />
        );
      case "editar-perfil":
        return <EditProfile onBack={() => setCurrentPage("perfil")} />;
      case "notificacoes":
        return (
          <PlaceholderPage
            title="Notificações"
            onBack={() => setCurrentPage("menu")}
          />
        );
      case "idioma":
        return (
          <PlaceholderPage
            title="Idioma e Moeda"
            onBack={() => setCurrentPage("menu")}
          />
        );
      case "tema":
        return (
          <PlaceholderPage title="Tema" onBack={() => setCurrentPage("menu")} />
        );
      case "privacidade":
        return (
          <PlaceholderPage
            title="Privacidade"
            onBack={() => setCurrentPage("menu")}
          />
        );
      default:
        return (
          <ConfigMenu
            onNavigate={(page) => setCurrentPage(page as ConfigPage)}
          />
        );
    }
  };

  return <div className="min-h-screen bg-gray-950">{renderPage()}</div>;
};

export default Config;
