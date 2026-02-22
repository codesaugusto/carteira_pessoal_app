import { useState } from "react";
import ConfigMenu from "./ConfigMenu";
import MeuPerfil from "../../pages/MeuPerfil";

type ConfigPage =
  | "menu"
  | "perfil"
  | "notificacoes"
  | "idioma"
  | "tema"
  | "privacidade";

const Config = () => {
  const [currentPage, setCurrentPage] = useState<ConfigPage>("menu");

  const renderPage = () => {
    switch (currentPage) {
      case "perfil":
        return <MeuPerfil onBack={() => setCurrentPage("menu")} />;
      case "notificacoes":
        return <Notificacoes onBack={() => setCurrentPage("menu")} />;
      case "idioma":
        return <IdiomaeMoeda onBack={() => setCurrentPage("menu")} />;
      case "tema":
        return <Tema onBack={() => setCurrentPage("menu")} />;
      case "privacidade":
        return <Privacidade onBack={() => setCurrentPage("menu")} />;
      default:
        return <ConfigMenu onNavigate={setCurrentPage} />;
    }
  };

  return <div className="min-h-screen bg-gray-950">{renderPage()}</div>;
};

export default Config;
