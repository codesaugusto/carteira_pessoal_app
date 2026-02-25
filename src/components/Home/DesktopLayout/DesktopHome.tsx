import { VscCoffee } from "react-icons/vsc";
import { RiShoppingBag2Line } from "react-icons/ri";
import { MdAirplay } from "react-icons/md";
import { useState } from "react";
import ExpenseDetailModal from "../ExpenseDetailModal";
import AllExpenses from "../AllExpenses";
import { TopCategoriesWidget } from "./TopCategoriesWidget";
import { SavingsGoalWidget } from "./SavingsGoalWidget";

interface Expense {
  id: number;
  name: string;
  description: string;
  amount: number;
  category?: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

interface DesktopHomeProps {
  recentExpenses?: Expense[];
}

const DesktopHome = ({ recentExpenses = [] }: DesktopHomeProps) => {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllExpensesOpen, setIsAllExpensesOpen] = useState(false);
  const [isFromAllExpenses, setIsFromAllExpenses] = useState(false);

  const defaultExpenses = [
    {
      id: 1,
      name: "Dolce Café",
      description: "Hoje, 09:41",
      amount: 4.5,
      category: "coffee",
      icon: <VscCoffee className="text-amber-600 w-6 h-6" />,
      bgColor: "bg-amber-900/50",
      iconColor: "text-amber-600",
    },
    {
      id: 2,
      name: "Lojas Hitech",
      description: "Ontem, 06:20",
      amount: 42.0,
      category: "shopping",
      icon: <RiShoppingBag2Line className="text-blue-500 w-6 h-6" />,
      bgColor: "bg-blue-900/50",
      iconColor: "text-blue-500",
    },
    {
      id: 3,
      name: "Netflix",
      description: "23 de Out, 2023",
      amount: 15.99,
      category: "entertainment",
      icon: <MdAirplay className="text-red-500 w-6 h-6" />,
      bgColor: "bg-red-900/50",
      iconColor: "text-red-500",
    },
  ];

  const expenses = recentExpenses.length > 0 ? recentExpenses : defaultExpenses;

  return (
    <div className="flex-1 h-screen overflow-y-auto font-poppins hide-scrollbar">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 text-xs">Bem vindo de Volta, Carlos</p>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-1.5 text-sm rounded-lg transition-colors flex items-center justify-baseline gap-2 active:scale-95 duration-150">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="flex items-center justify-center">Adicionar</p>
          </button>
        </div>

        {/* Main Grid - 2 columns */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column - 2/3 width */}
          <div className="col-span-2 space-y-4">
            {/* Total Balance Card */}
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-md font-medium mb-1">
                    Saldo Total
                  </p>
                  <h2 className="text-3xl font-bold text-white">R$12,450.00</h2>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                    Receitas
                  </p>
                  <p className="text-green-500 text-base font-semibold">
                    +R$4,250.00
                  </p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                    Despesas
                  </p>
                  <p className="text-red-500 text-base font-semibold">
                    -R$2,100.00
                  </p>
                </div>
              </div>
            </div>

            {/* Monthly Spend */}
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white text-base font-semibold">
                    Gastos Mensais
                  </h3>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Meta: R$3,200.00
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-500 text-lg font-bold">65%</p>
                  <p className="text-gray-400 text-xs">Usado</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-full h-2 w-[65%]"></div>
                </div>
                <p className="text-gray-400 text-xs">
                  Você ainda tem{" "}
                  <span className="text-white font-semibold">R$1100,00</span>{" "}
                  restantes para gastar neste mês.
                </p>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-base font-semibold">
                  Compras Recentes
                </h3>
                <button
                  onClick={() => setIsAllExpensesOpen(true)}
                  className="text-green-500 hover:text-green-400 text-xs font-semibold transition-colors"
                >
                  Ver Todos
                </button>
              </div>

              <div className="space-y-2 cursor-pointer">
                {expenses.slice(0, 5).map((expense) => (
                  <button
                    key={expense.id}
                    onClick={() => {
                      setSelectedExpense(expense);
                      setIsModalOpen(true);
                    }}
                    className="w-full bg-gray-700/50 hover:bg-gray-700 rounded-lg p-2.5 flex items-center justify-between transition-all duration-50 active:scale-85 active:opacity-90"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${expense.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        {expense.icon}
                      </div>
                      <div className="text-left min-w-0">
                        <p className="text-white font-medium text-sm truncate">
                          {expense.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {expense.description}
                        </p>
                      </div>
                    </div>
                    <p className="text-red-500 font-bold text-sm flex-shrink-0">
                      -R${expense.amount.toFixed(2)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className=" h-fit flex flex-col items-center justify-start gap-4">
            <div className="w-full">
              <TopCategoriesWidget />
            </div>
            <div className="w-full">
              <SavingsGoalWidget />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ExpenseDetailModal
        expense={selectedExpense}
        isOpen={isModalOpen}
        isFromAllExpenses={isFromAllExpenses}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExpense(null);
          // Não fecha AllExpenses se estamos vindo de lá
          if (!isFromAllExpenses) {
            setIsAllExpensesOpen(false);
          }
          setIsFromAllExpenses(false);
        }}
        onEdit={() => {
          console.log("Editar compra:", selectedExpense?.id);
        }}
        onDelete={() => {
          console.log("Deletar compra:", selectedExpense?.id);
          setIsModalOpen(false);
          setSelectedExpense(null);
          setIsFromAllExpenses(false);
        }}
      />

      {/* All Expenses Modal */}
      <AllExpenses
        expenses={expenses}
        isOpen={isAllExpensesOpen}
        onClose={() => setIsAllExpensesOpen(false)}
        onSelectExpense={(expense) => {
          setSelectedExpense(expense);
          setIsModalOpen(true);
          setIsFromAllExpenses(true);
        }}
      />
    </div>
  );
};

export default DesktopHome;
