import { X, Filter, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

interface Expense {
  id: number;
  name: string;
  description: string;
  amount: number;
  icon: ReactNode;
  bgColor: string;
  iconColor: string;
  category?: string;
}

interface AllExpensesProps {
  expenses: Expense[];
  isOpen: boolean;
  onClose: () => void;
  onSelectExpense: (expense: Expense) => void;
}

type SortOption = "recent" | "oldest" | "highest" | "lowest";
type FilterCategory = "all" | "coffee" | "shopping" | "entertainment";

const AllExpenses = ({
  expenses,
  isOpen,
  onClose,
  onSelectExpense,
}: AllExpensesProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [filterBy, setFilterBy] = useState<FilterCategory>("all");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const getCategoryFilter = (category: FilterCategory): Expense[] => {
    if (category === "all") return expenses;

    return expenses.filter((exp) => exp.category === category);
  };

  const getSortedExpenses = (expensesToSort: Expense[]): Expense[] => {
    const sorted = [...expensesToSort];

    switch (sortBy) {
      case "recent":
        return sorted;
      case "oldest":
        return sorted.reverse();
      case "highest":
        return sorted.sort((a, b) => b.amount - a.amount);
      case "lowest":
        return sorted.sort((a, b) => a.amount - b.amount);
      default:
        return sorted;
    }
  };

  const filteredExpenses = getCategoryFilter(filterBy);
  const sortedExpenses = getSortedExpenses(filteredExpenses);
  const totalAmount = sortedExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Modal - Full Screen */}
      <div
        className="fixed inset-0 z-50 bg-gray-950 flex flex-col"
        onClick={onClose}
      >
        <div
          className="w-full h-full bg-gray-950 font-poppins flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-gray-700 flex-shrink-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-bold">Todas as Compras</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 hover:bg-gray-800 rounded-full flex items-center justify-center transition"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Total */}
            <div className="text-sm text-white">
              Total:{" "}
              <span className="text-white font-bold">
                R${totalAmount.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="px-6 py-4 border-b border-gray-700 flex gap-2 flex-shrink-0">
            {/* Filter Button */}
            <div className="relative flex-1">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="w-full bg-gray-800/60 hover:bg-gray-700 text-white text-sm font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Categoria
                <ChevronDown className="w-3 h-3" />
              </button>

              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-1 bg-gray-800 rounded-lg shadow-lg z-10 w-full">
                  {[
                    { value: "all" as const, label: "Todas" },
                    { value: "coffee" as const, label: "Café" },
                    { value: "shopping" as const, label: "Shopping" },
                    {
                      value: "entertainment" as const,
                      label: "Entretenimento",
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilterBy(option.value);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition ${
                        filterBy === option.value
                          ? "bg-green-500/20 text-green-400 font-semibold"
                          : "text-gray-300 hover:bg-gray-700/60"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Button */}
            <div className="relative flex-1">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="w-full bg-gray-800/60 hover:bg-gray-700 text-white text-sm font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
              >
                Ordenar
                <ChevronDown className="w-3 h-3" />
              </button>

              {showSortMenu && (
                <div className="absolute top-full right-0 mt-1 bg-gray-800 rounded-lg shadow-lg z-10 w-full">
                  {[
                    { value: "recent" as const, label: "Mais Recente" },
                    { value: "oldest" as const, label: "Mais Antigo" },
                    { value: "highest" as const, label: "Maior Valor" },
                    { value: "lowest" as const, label: "Menor Valor" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition ${
                        sortBy === option.value
                          ? "bg-green-500/20 text-green-400 font-semibold"
                          : "text-gray-300 hover:bg-gray-700/60"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Expenses List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {sortedExpenses.length > 0 ? (
              sortedExpenses.map((expense) => (
                <button
                  key={expense.id}
                  onClick={() => {
                    onSelectExpense(expense);
                  }}
                  className="w-full bg-gray-800/40 hover:bg-gray-800/60 rounded-xl p-3 flex items-center justify-between transition-all duration-150 border border-gray-700/30"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${expense.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      {expense.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">{expense.name}</p>
                      <p className="text-gray-400 text-sm">
                        {expense.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-red-500 font-bold text-lg flex-shrink-0">
                    -R${expense.amount.toFixed(2).replace(".", ",")}
                  </p>
                </button>
              ))
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-400">
                <p>Nenhuma compra encontrada</p>
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="p-6 border-t border-gray-700 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 font-semibold py-3 rounded-lg transition"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllExpenses;
