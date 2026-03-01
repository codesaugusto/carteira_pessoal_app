import { createContext } from "react";

// Tipo para a função de navegação
export type OnNavigateContextType = (page: number) => void;

// Context que armazena a função de navegação
export const OnNavigateContext = createContext<
  OnNavigateContextType | undefined
>(undefined);
