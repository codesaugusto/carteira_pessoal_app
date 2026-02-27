import type { ReactNode } from "react";

export interface Wallet {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
  amount: number;
  type: "cash" | "card" | "bank" | "savings";
}

export const WALLETS_CONFIG = [
  {
    id: 1,
    name: "Carteira Física",
    description: "Dinheiro Espécie",
    iconName: "cash",
    amount: 450.0,
    type: "cash" as const,
  },
  {
    id: 2,
    name: "Cartão Principal",
    description: "Limite disponível",
    amount: 5000.0,
    iconName: "card",
    type: "card" as const,
  },
  {
    id: 3,
    name: "Banco Digital",
    description: "Conta Corrente",
    amount: 3800.0,
    iconName: "bank",
    type: "bank" as const,
  },
  {
    id: 4,
    name: "Reserva Emergência",
    description: "Investimentos",
    amount: 15000.0,
    iconName: "savings",
    type: "savings" as const,
  },
] as const;
