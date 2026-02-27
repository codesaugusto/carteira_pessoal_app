import type { Expense } from "../types/expense";
import { STYLES } from "../constants/expenses";

interface ExpenseItemProps {
  expense: Expense;
  onClick: () => void;
}

export const ExpenseItem = ({ expense, onClick }: ExpenseItemProps) => {
  return (
    <button
      onClick={onClick}
      className={STYLES.expenseItem}
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
  );
};
