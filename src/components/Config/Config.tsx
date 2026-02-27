import { useEffect, useState } from "react";
import MobileConfig from "./MobileConfig";
import { DesktopConfig } from "./DesktopLayout";

type ConfigPage =
  | "menu"
  | "perfil"
  | "editar-perfil"
  | "notificacoes"
  | "idioma"
  | "tema"
  | "privacidade";

interface ConfigProps {
  initialPage?: ConfigPage;
}

const Config = ({ initialPage = "menu" }: ConfigProps) => {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  useEffect(() => {
    // Detectar tamanho da tela
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop) {
    return <DesktopConfig initialPage={initialPage} />;
  }

  return <MobileConfig initialPage={initialPage} />;
};

export default Config;
