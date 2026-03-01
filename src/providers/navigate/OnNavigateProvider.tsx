import type { ReactNode } from "react";
import {
  OnNavigateContext,
  type OnNavigateContextType,
} from "../../contexts/navigate/onNavigate";

interface OnNavigateProviderProps {
  children: ReactNode;
  onNavigate: OnNavigateContextType;
}

/**
 * Provider que disponibiliza a função de navegação para toda a árvore de componentes
 * Evita prop drilling - não precisa passar a função através de múltiplas props
 */
export const OnNavigateProvider: React.FC<OnNavigateProviderProps> = ({
  children,
  onNavigate,
}) => (
  <OnNavigateContext.Provider value={onNavigate}>
    {children}
  </OnNavigateContext.Provider>
);
