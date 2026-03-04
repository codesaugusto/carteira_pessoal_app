// Categorias de despesas
export const EXPENSE_CATEGORIES = {
  coffee: { label: "Café", icon: "coffee" },
  shopping: { label: "Compras", icon: "shopping" },
  entertainment: { label: "Entretenimento", icon: "entertainment" },
  food: { label: "Alimentação", icon: "food" },
  transport: { label: "Transporte", icon: "transport" },
  health: { label: "Saúde", icon: "health" },
  education: { label: "Educação", icon: "education" },
  utilities: { label: "Utilidades", icon: "utilities" },
  other: { label: "Outros", icon: "other" },
} as const;

// Status de despesas
export const EXPENSE_STATUS = {
  pending: {
    label: "Pendente",
    value: "pendente",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  paid: {
    label: "Pago",
    value: "pago",
    color: "bg-green-500/10 text-green-500",
  },
  cancelled: {
    label: "Cancelado",
    value: "cancelado",
    color: "bg-red-500/10 text-red-500",
  },
} as const;

// Tipos de recorrência
export const EXPENSE_RECURRENCE = {
  once: { label: "Única", value: "unica" },
  weekly: { label: "Semanal", value: "semanal" },
  monthly: { label: "Mensal", value: "mensal" },
} as const;

// Opções de filtros de data
export const DATE_FILTER_OPTIONS = {
  all: "Todos",
  "7days": "Últimos 7 dias",
  "30days": "Últimos 30 dias",
  custom: "Intervalo Personalizado",
} as const;

// Opções de ordenação
export const SORT_OPTIONS = {
  recent: "Mais Recentes",
  oldest: "Mais Antigos",
  highest: "Maior Valor",
  lowest: "Menor Valor",
} as const;

// Categorias de importação em lote
export const BULK_IMPORT_CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Compras",
  "Lazer",
  "Saúde",
  "Educação",
  "Utilidades",
  "Outros",
] as const;

// Carteiras para importação em lote
export const BULK_IMPORT_WALLETS = [
  "Principal/Débito",
  "Nubank/Crédito",
] as const;

// Estilos CSS reutilizáveis
export const STYLES = {
  expenseItem:
    "w-full bg-gray-700/50 hover:bg-gray-700 rounded-lg p-2.5 flex items-center justify-between transition-all active:scale-98 hover:scale-102 active:duration-50 active:opacity-90 hover:duration-150 cursor-pointer",
  card: "bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm",
  button: {
    primary:
      "bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-1.5 text-sm rounded-lg transition-colors flex items-center justify-center gap-2 active:scale-95 duration-150",
    secondary:
      "bg-blue-600/70 hover:bg-blue-600 text-white font-semibold px-4 py-1.5 text-sm rounded-lg transition-colors flex items-center justify-center gap-2 active:scale-95 duration-150",
    tertiary:
      "text-green-500 text-sm font-semibold active:scale-95 transition-all duration-150",
  },
  input:
    "w-full bg-gray-700/50 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all",
  select:
    "w-full bg-gray-700/50 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all",
} as const;
