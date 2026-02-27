import { X, Edit2, Trash2 } from "lucide-react";
import type { Expense } from "../../types/expense";

interface ExpenseDetailModalProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isFromAllExpenses?: boolean;
}

const ExpenseDetailModal = ({
  expense,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  isFromAllExpenses,
}: ExpenseDetailModalProps) => {
  if (!isOpen || !expense) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60"
        style={{ zIndex: isFromAllExpenses ? 41 : 40 }}
        onClick={() => {
          // Só fecha ao clicar no overlay se não vem de "Ver todos"
          if (!isFromAllExpenses) {
            onClose();
          }
        }}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-end"
        style={{ zIndex: isFromAllExpenses ? 60 : 50 }}
      >
        <div className="w-full md:w-1/3 md:mx-auto bg-gray-950 rounded-t-3xl p-6 animate-in slide-in-from-bottom-4 shadow-2xl font-poppins">
          {/* Header com Icon e Nome */}
          <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 ${expense.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                {expense.icon}
              </div>
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Estabelecimento
                </p>
                <p className="text-white font-bold text-lg">{expense.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 hover:bg-gray-800 rounded-full flex items-center justify-center transition flex-shrink-0"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Lista de Detalhes */}
          <div className="space-y-4 mb-6">
            {/* Valor */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Valor</span>
              <span className="text-red-500 font-bold text-lg">
                -R${expense.amount.toFixed(2).replace(".", ",")}
              </span>
            </div>

            {/* Data e Hora */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Data e Hora</span>
              <span className="text-white font-semibold text-sm">
                {expense.description}
              </span>
            </div>

            {/* Status */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-white font-semibold text-sm">
                  Concluído
                </span>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Pagamento</span>
              <span className="text-white font-semibold text-sm">Cartão</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="flex-1 bg-gray-800/60 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm"
            >
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
            <button
              onClick={onDelete}
              className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Deletar
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-semibold py-2 rounded-lg transition text-sm"
            >
              {isFromAllExpenses ? "Voltar" : "Fechar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseDetailModal;
