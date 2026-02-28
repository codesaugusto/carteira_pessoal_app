export interface Meta {
  id: number;
  title: string;
  category: string;
  description?: string;
  targetDate: string;
  currentAmount: number;
  targetAmount: number;
  image: string;
  badge: string;
  badgeColor: string;
}

export const DEFAULT_METAS: Meta[] = [
  {
    id: 1,
    title: "Viagem para o Japão",
    category: "Viagem",
    description: "Minha tão sonhada viagem para o Japão",
    targetDate: "Dezembro 2025",
    currentAmount: 15000,
    targetAmount: 20000,
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&h=300&fit=crop",
    badge: "VIAGEM",
    badgeColor: "bg-emerald-500",
  },
  {
    id: 2,
    title: "Reserva de Emergência",
    category: "Segurança",
    description: "Fundo de emergência para imprevistos",
    targetDate: "Agosto 2024",
    currentAmount: 6000,
    targetAmount: 15000,
    image:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=300&fit=crop",
    badge: "SEGURANÇA",
    badgeColor: "bg-cyan-500",
  },
  {
    id: 3,
    title: "Novo Notebook",
    category: "Tech",
    description: "Investir em um novo notebook para trabalho",
    targetDate: "Outubro 2024",
    currentAmount: 6800,
    targetAmount: 8000,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    badge: "TECH",
    badgeColor: "bg-blue-500",
  },
  {
    id: 4,
    title: "Aposentadoria",
    category: "Futuro",
    description: "Planejar e investir para o futuro",
    targetDate: "Março 2046",
    currentAmount: 60000,
    targetAmount: 500000,
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=500&h=300&fit=crop",
    badge: "FUTURO",
    badgeColor: "bg-indigo-500",
  },
];
