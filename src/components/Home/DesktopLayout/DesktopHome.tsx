import { useState } from "react";
import { type Expense } from "../../../types/expense";
import ExpenseDetailModal from "../ExpenseDetailModal";
import NewExpenseModal from "../NewExpenseModal";
import { BulkImportModal } from "../BulkImportModal";
import NewExpensePage from "./NewExpensePage";
import AllExpenses from "../AllExpenses";
import { TopCategoriesWidget } from "./TopCategoriesWidget";
import { SavingsGoalWidget } from "./SavingsGoalWidget";
import { ExpenseItem } from "../../ExpenseItem";
import { STYLES } from "../../../constants/expenses";
import { DEFAULT_EXPENSES } from "../../../data/defaultExpenses";

interface DesktopHomeProps {
  recentExpenses?: Expense[];
}

const DesktopHome = ({ recentExpenses = [] }: DesktopHomeProps) => {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllExpensesOpen, setIsAllExpensesOpen] = useState(false);
  const [isFromAllExpenses, setIsFromAllExpenses] = useState(false);
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false);
  const [isNewExpensePageOpen, setIsNewExpensePageOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);

  const expenses = recentExpenses.length > 0 ? recentExpenses : DEFAULT_EXPENSES;

  return (
    <>
      {isNewExpensePageOpen ? (
        <NewExpensePage
          onBack={() => setIsNewExpensePageOpen(false)}
          onSave={(expense) => {
            console.log("Nova despesa salva:", expense);
            // TODO: Integrar com backend para salvar a despesa
            setIsNewExpensePageOpen(false);
          }}
        />
      ) : (
        <div className="flex-1 h-screen overflow-y-auto font-poppins hide-scrollbar">
          <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 text-xs">
                  Bem vindo de Volta, Carlos
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsBulkImportOpen(true)}
                  className={STYLES.button.secondary}
                  title="Importar despesas em lote via CSV"
                >
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
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  Importar
                </button>
                <button
                  onClick={() => setIsNewExpensePageOpen(true)}
                  className={STYLES.button.primary}
                >
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
                  Adicionar
                </button>
              </div>
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
                      <h2 className="text-3xl font-bold text-white">
                        R$12,450.00
                      </h2>
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
                      <span className="text-white font-semibold">
                        R$1100,00
                      </span>{" "}
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
                      Ver todos
                    </button>
                  </div>

                  <div className="space-y-2 cursor-pointer">
                    {expenses.slice(0, 5).map((expense) => (
                      <ExpenseItem
                        key={expense.id}
                        expense={expense}
                        onClick={() => {
                          setSelectedExpense(expense);
                          setIsModalOpen(true);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - 1/3 width */}
              <div className="sticky top-0 h-fit flex flex-col items-center justify-start gap-4">
                <div className="w-full">
                  <SavingsGoalWidget />
                </div>
                <div className="w-full">
                  <TopCategoriesWidget />
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

          {/* New Expense Modal */}
          <NewExpenseModal
            isOpen={isNewExpenseOpen}
            onClose={() => setIsNewExpenseOpen(false)}
            onSave={(expense) => {
              console.log("Nova despesa:", expense);
              // Implementar salvamento da despesa
              // TODO: Integrar com backend para salvar a despesa
            }}
          />

          {/* Bulk Import Modal */}
          <BulkImportModal
            isOpen={isBulkImportOpen}
            onClose={() => setIsBulkImportOpen(false)}
            onImport={(expenses) => {
              expenses.forEach((exp) => {
                console.log("Despesa importada:", exp);
                // TODO: Integrar com backend para salvar as despesas em lote
              });
              setIsBulkImportOpen(false);
              // Mostrar mensagem de sucesso
              alert(`${expenses.length} despesa(s) importada(s) com sucesso!`);
            }}
          />
        </div>
      )}
    </>
  );
};

export default DesktopHome;
