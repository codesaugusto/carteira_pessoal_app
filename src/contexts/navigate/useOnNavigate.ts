import { useContext } from "react";
import { OnNavigateContext, type OnNavigateContextType } from "./onNavigate";

/**
 * Hook customizado para usar a função de navegação em qualquer componente
 * Elimina a necessidade de passar onNavigate como prop
 */
export const useOnNavigate = (): OnNavigateContextType => {
  const context = useContext(OnNavigateContext);

  if (!context) {
    throw new Error(
      "useOnNavigate deve ser usado dentro de um OnNavigateProvider",
    );
  }

  return context;
};
