import type { ReactNode } from "react";

export interface Category {
  id: number;
  name: string;
  icon: ReactNode;
  amount: number;
  transactions: number;
  percentage: number;
}

export const CATEGORIES_CONFIG = [
  {
    id: 1,
    name: "Alimentação",
    iconName: "food",
    amount: 1250.0,
    transactions: 24,
    percentage: 65,
  },
  {
    id: 2,
    name: "Transporte",
    iconName: "transport",
    amount: 420.5,
    transactions: 12,
    percentage: 42,
  },
  {
    id: 3,
    name: "Lazer",
    iconName: "games",
    amount: 290.0,
    transactions: 8,
    percentage: 29,
  },
  {
    id: 4,
    name: "Saúde",
    iconName: "health",
    amount: 850.0,
    transactions: 2,
    percentage: 85,
  },
  {
    id: 5,
    name: "Educação",
    iconName: "education",
    amount: 450.0,
    transactions: 1,
    percentage: 45,
  },
  {
    id: 6,
    name: "Compras",
    iconName: "shopping",
    amount: 1050.0,
    transactions: 15,
    percentage: 52,
  },
] as const;
