import { X, Filter, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { DateRangePicker } from "../DateRangePicker";
import { ExpenseItem } from "../ExpenseItem";
import { useExpenseFilters } from "../../hooks/useExpenseFilters";
import { SORT_OPTIONS, DATE_FILTER_OPTIONS } from "../../constants/expenses";

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

const AllExpenses = ({
  expenses,
  isOpen,
  onClose,
  onSelectExpense,
}: AllExpensesProps) => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const {
    sortBy,
    setSortBy,
    filterByCategory,
    setFilterByCategory,
    filterByDate,
    setFilterByDate,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    searchTerm,
    setSearchTerm,
    sortedExpenses,
  } = useExpenseFilters(expenses);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  // DESKTOP LAYOUT
  if (isDesktop) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-950 flex" onClick={onClose}>
        <div
          className="w-full h-full bg-gray-950 font-poppins flex"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Sidebar - Filters */}
          <div className="w-1/4 border-r border-gray-700 overflow-y-auto p-6 scrollbar-hide">
            <h2 className="text-white text-lg font-bold mb-6">Filtros</h2>

            {/* DATE RANGE */}
            <div className="mb-6">
              <h3 className="text-gray-400 text-xs font-bold mb-3 uppercase">
                Intervalo de Datas
              </h3>
              <div className="space-y-2">
                {Object.entries(DATE_FILTER_OPTIONS).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() =>
                      setFilterByDate(value as keyof typeof DATE_FILTER_OPTIONS)
                    }
                    className={`w-full text-left px-3 py-2 text-sm rounded transition ${
                      filterByDate === value
                        ? "bg-green-500/20 text-green-400 font-semibold"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Custom Date Inputs */}
              {filterByDate === "custom" && (
                <div className="mt-4">
                  <DateRangePicker
                    startDate={customStartDate}
                    endDate={customEndDate}
                    onStartDateChange={setCustomStartDate}
                    onEndDateChange={setCustomEndDate}
                  />
                </div>
              )}
            </div>

            {/* CATEGORIES */}
            <div className="mb-6">
              <h3 className="text-gray-400 text-xs font-bold mb-3 uppercase">
                Categorias
              </h3>
              <div className="space-y-2">
                {[
                  { value: "all" as const, label: "Todas" },
                  { value: "coffee" as const, label: "Café" },
                  { value: "shopping" as const, label: "Shopping" },
                  { value: "entertainment" as const, label: "Entretenimento" },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() =>
                      setFilterByCategory(cat.value === "all" ? "" : cat.value)
                    }
                    className={`w-full text-left px-3 py-2 text-sm rounded transition ${
                      (cat.value === "all" && filterByCategory === "") ||
                      (cat.value !== "all" && filterByCategory === cat.value)
                        ? "bg-green-500/20 text-green-400 font-semibold"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SEARCH */}
            <div className="mb-6">
              <h3 className="text-gray-400 text-xs font-bold mb-3 uppercase">
                Buscar Compra
              </h3>
              <input
                type="text"
                placeholder="Digite o nome da compra..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition"
              />
            </div>

            {/* Action Buttons */}
            <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg mb-2 transition">
              Aplicar Filtros
            </button>
            <button
              onClick={() => {
                setFilterByCategory("all");
                setSortBy("recent");
              }}
              className="w-full text-gray-400 hover:text-gray-300 text-sm py-2 transition"
            >
              Resetar Filtros
            </button>
          </div>

          {/* Right Content - Results */}
          <div className="flex-1 flex flex-col relative">
            {/* Close Button - Top Right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 hover:bg-gray-800 rounded-full flex items-center justify-center transition z-10"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>

            {/* Header */}
            <div className="p-6 border-b border-gray-700 flex-shrink-0">
              <div className="mb-4">
                <h1 className="text-white text-2xl font-bold">Resultados</h1>
                <p className="text-gray-400 text-sm">
                  Mostrando {sortedExpenses.length} transações (filtro:{" "}
                  <span className="text-gray-300 font-semibold">
                    {DATE_FILTER_OPTIONS[filterByDate]}
                  </span>
                  )
                </p>
              </div>

              {/* Sort */}
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">
                  Total:{" "}
                  <span className="text-white font-bold">
                    R$
                    {sortedExpenses
                      .reduce((sum, exp) => sum + exp.amount, 0)
                      .toFixed(2)
                      .replace(".", ",")}
                  </span>
                </p>
                <div className="relative">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="flex items-center gap-2 text-green-400 text-sm font-semibold hover:text-green-300"
                  >
                    Ordenar por:{" "}
                    <span className="text-white">{SORT_OPTIONS[sortBy]}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showSortMenu && (
                    <div className="absolute top-full right-0 mt-1 bg-gray-800 rounded-lg shadow-lg z-10 w-48">
                      {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                        <button
                          key={value}
                          onClick={() => {
                            setSortBy(value as keyof typeof SORT_OPTIONS);
                            setShowSortMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition ${
                            sortBy === value
                              ? "bg-green-500/20 text-green-400 font-semibold"
                              : "text-gray-300 hover:bg-gray-700/60"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Expenses List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-hide">
              {sortedExpenses.length > 0 ? (
                sortedExpenses.map((expense) => (
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onClick={() => {
                      onSelectExpense(expense);
                    }}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-32 text-gray-400">
                  <p>Nenhuma compra encontrada</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MOBILE LAYOUT
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
                R$
                {sortedExpenses
                  .reduce((sum, exp) => sum + exp.amount, 0)
                  .toFixed(2)
                  .replace(".", ",")}
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
                    { value: "all", label: "Todas" },
                    { value: "coffee", label: "Café" },
                    { value: "shopping", label: "Shopping" },
                    { value: "entertainment", label: "Entretenimento" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilterByCategory(
                          option.value === "all" ? "" : option.value,
                        );
                        setShowFilterMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition ${
                        (option.value === "all" && filterByCategory === "") ||
                        (option.value !== "all" &&
                          filterByCategory === option.value)
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
                  className="w-full bg-gray-700/50 hover:bg-gray-700 rounded-lg p-2.5 flex items-center justify-between transition-all active:scale-98 hover:scale-102 active:duration-50 active:opacity-90 hover:duration-150"
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
