import type { Expense } from "../types/expense";

export const DEFAULT_EXPENSES: Expense[] = [
  {
    id: 1,
    name: "Dolce Café",
    description: "Hoje, 09:41",
    amount: 4.5,
    category: "coffee",
    icon: null,
    bgColor: "bg-amber-900/50",
    iconColor: "text-amber-600",
  },
  {
    id: 2,
    name: "Lojas Hitech",
    description: "Ontem, 06:20",
    amount: 42.0,
    category: "shopping",
    icon: null,
    bgColor: "bg-blue-900/50",
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    name: "Netflix",
    description: "23 de Out, 2023",
    amount: 15.99,
    category: "entertainment",
    icon: null,
    bgColor: "bg-red-900/50",
    iconColor: "text-red-500",
  },
];
