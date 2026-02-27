import { useState } from "react";
import { X, Calendar, Plus } from "lucide-react";
import { IoFastFood } from "react-icons/io5";
import { IoCarSport } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

interface NewExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (expense: NewExpenseData) => void;
}

export interface NewExpenseData {
  value: string;
  category: string;
  wallet: string;
  date: string;
  description: string;
}

const categories = [
  {
    id: "food",
    name: "Alimentação",
    icon: <IoFastFood className="w-6 h-6" />,
    color: "text-green-500",
    bgColor: "bg-green-500/20",
  },
  {
    id: "transport",
    name: "Transporte",
    icon: <IoCarSport className="w-6 h-6" />,
    color: "text-gray-400",
    bgColor: "bg-gray-700/50",
  },
  {
    id: "shopping",
    name: "Compras",
    icon: <IoCart className="w-6 h-6" />,
    color: "text-gray-400",
    bgColor: "bg-gray-700/50",
  },
  {
    id: "entertainment",
    name: "Lazer",
    icon: <IoGameController className="w-6 h-6" />,
    color: "text-gray-400",
    bgColor: "bg-gray-700/50",
  },
  {
    id: "health",
    name: "Saúde",
    icon: <IoHeart className="w-6 h-6" />,
    color: "text-gray-400",
    bgColor: "bg-gray-700/50",
  },
];

const wallets = [
  {
    id: "main",
    name: "Principal",
    type: "Débito",
    icon: "💳",
    selected: true,
  },
  {
    id: "nubank",
    name: "Nubank",
    type: "Crédito",
    icon: "💳",
    selected: false,
  },
];

const NewExpenseModal = ({ isOpen, onClose, onSave }: NewExpenseModalProps) => {
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [selectedWallet, setSelectedWallet] = useState("main");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!value || !selectedCategory || !selectedWallet || !date) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    onSave?.({
      value,
      category: selectedCategory,
      wallet: selectedWallet,
      date,
      description,
    });

    // Reset form
    setValue("");
    setSelectedCategory("food");
    setSelectedWallet("main");
    setDate("");
    setDescription("");
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-30" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-end z-40">
        <div className="w-full bg-gray-950 rounded-t-3xl p-6 animate-in slide-in-from-bottom-4 shadow-2xl font-poppins max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
            <h2 className="text-white text-2xl font-bold">Nova Compra</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 hover:bg-gray-800 rounded-full flex items-center justify-center transition"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Valor Total */}
          <div className="mb-6">
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-3">
              Valor Total
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 text-2xl font-bold">
                R$
              </span>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0,00"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-14 pr-4 py-4 text-white text-xl placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition"
              />
            </div>
          </div>

          {/* Categorias */}
          <div className="mb-6">
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-3">
              Categorias
            </label>
            <div className="grid grid-cols-5 gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                      isSelected
                        ? "bg-green-500/30 border-2 border-green-500"
                        : "bg-gray-800/50 border-2 border-transparent hover:border-gray-700"
                    }`}
                  >
                    <div
                      className={`text-xl ${isSelected ? "text-green-400" : "text-gray-400"}`}
                    >
                      {cat.icon}
                    </div>
                    <span
                      className={`text-xs text-center font-medium ${
                        isSelected ? "text-green-400" : "text-gray-400"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carteira */}
          <div className="mb-6">
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-3">
              Carteira
            </label>
            <div className="grid grid-cols-2 gap-3">
              {wallets.map((wallet) => {
                const isSelected = selectedWallet === wallet.id;
                return (
                  <button
                    key={wallet.id}
                    onClick={() => setSelectedWallet(wallet.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-green-500 bg-green-500/10"
                        : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{wallet.icon}</span>
                      <div className="text-left">
                        <p
                          className={`font-semibold ${
                            isSelected ? "text-white" : "text-gray-300"
                          }`}
                        >
                          {wallet.name}
                        </p>
                        <p className="text-xs text-gray-500">{wallet.type}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Data */}
          <div className="mb-6">
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-3">
              Data
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="mb-6">
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-3">
              Descrição
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-gray-500 text-lg">
                ✏️
              </span>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Almoço com amigos"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition"
              />
            </div>
          </div>

          {/* Anexos */}
          <div className="mb-8">
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-3">
              Anexos
            </label>
            <button className="w-full border-2 border-dashed border-gray-700 rounded-lg py-6 hover:border-green-500/50 hover:bg-gray-800/30 transition flex items-center justify-center gap-2">
              <Plus className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 font-medium">
                Adicionar recibo
              </span>
            </button>
          </div>

          {/* Botão Salvar */}
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            Salvar Gasto
          </button>
        </div>
      </div>
    </>
  );
};

export default NewExpenseModal;
