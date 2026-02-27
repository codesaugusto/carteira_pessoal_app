import { useState } from "react";
import { ChevronLeft, Upload } from "lucide-react";
import { IoFastFood } from "react-icons/io5";
import { IoCarSport } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import SingleDatePicker from "../../DateRangePicker/SingleDatePicker";

interface NewExpensePageProps {
  onBack: () => void;
  onSave?: (expense: NewExpensePageData) => void;
}

export interface NewExpensePageData {
  title: string;
  value: string;
  date: string;
  category: string;
  paymentSource: string;
  status?: string;
  recurrence?: string;
  notes?: string;
}

const categories = [
  {
    id: "food",
    name: "Alimentação",
    icon: <IoFastFood className="w-5 h-5" />,
  },
  {
    id: "transport",
    name: "Transporte",
    icon: <IoCarSport className="w-5 h-5" />,
  },
  {
    id: "shopping",
    name: "Compras",
    icon: <IoCart className="w-5 h-5" />,
  },
  {
    id: "entertainment",
    name: "Lazer",
    icon: <IoGameController className="w-5 h-5" />,
  },
  {
    id: "health",
    name: "Saúde",
    icon: <IoHeart className="w-5 h-5" />,
  },
];

const paymentSources = [
  { id: "main", name: "Principal", type: "Débito" },
  { id: "nubank", name: "Nubank", type: "Crédito" },
];

const statusOptions = [
  { id: "pending", name: "Pendente" },
  { id: "paid", name: "Pago" },
  { id: "cancelled", name: "Cancelado" },
];

const recurrenceOptions = [
  { id: "unique", name: "Única" },
  { id: "monthly", name: "Mensal" },
  { id: "weekly", name: "Semanal" },
];

const NewExpensePage = ({ onBack, onSave }: NewExpensePageProps) => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPaymentSource, setSelectedPaymentSource] = useState("");
  const [status, setStatus] = useState("pending");
  const [recurrence, setRecurrence] = useState("unique");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (
      !title ||
      !value ||
      !date ||
      !selectedCategory ||
      !selectedPaymentSource
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    onSave?.({
      title,
      value,
      date,
      category: selectedCategory,
      paymentSource: selectedPaymentSource,
      status,
      recurrence,
      notes,
    });

    setTitle("");
    setValue("");
    setDate("");
    setSelectedCategory("");
    setSelectedPaymentSource("");
    setStatus("pending");
    setRecurrence("unique");
    setNotes("");
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto font-poppins hide-scrollbar bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-green-950/30 to-gray-950 sticky top-0 z-10 border-b border-green-500/30 backdrop-blur-sm">
        <div className="p-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-green-500 hover:text-green-400 transition mb-3 font-semibold text-sm"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar para Home
          </button>

          <h1 className="text-2xl font-bold text-white mb-1">
            Registrar nova compra
          </h1>
          <p className="text-gray-400 text-sm">
            Preencha os detalhes abaixo para adicionar uma nova despesa ao seu
            histórico.
          </p>
        </div>
      </div>

      {/* Content - 2 Column Layout */}
      <div className="p-6 grid grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Left Column - Formulário */}
        <div className="col-span-2 space-y-6">
          {/* Detalhes Principais */}
          <div className="bg-gray-800/50 border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500/30 rounded flex items-center justify-center">
                <span className="text-green-400 text-lg">💳</span>
              </div>
              <h2 className="text-lg font-bold text-white">
                Detalhes Principais
              </h2>
            </div>

            <div className="space-y-4">
              {/* Título */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm">
                  Título da despesa
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Almoço de domingo no shopping"
                  className="w-full bg-gray-800/50 border border-green-500/30 rounded px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition"
                />
              </div>

              {/* Valor e Data */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 text-sm">
                    Valor (R$)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-sm">
                      R$
                    </span>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="0,00"
                      step="0.01"
                      className="w-full bg-gray-800/50 border border-green-500/30 rounded pl-10 pr-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2 text-sm">
                    Data da compra
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                      className="w-full bg-gray-800/50 border border-green-500/30 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition text-left"
                    >
                      {date
                        ? new Date(date).toLocaleDateString("pt-BR")
                        : "Selecione uma data"}
                    </button>

                    {isDatePickerOpen && (
                      <div className="absolute top-full left-0 mt-1 z-50 bg-gray-950 rounded-lg shadow-2xl border border-green-500/30">
                        <SingleDatePicker
                          value={date}
                          onChange={(selectedDate) => {
                            setDate(selectedDate);
                            setIsDatePickerOpen(false);
                          }}
                          onClose={() => setIsDatePickerOpen(false)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Classificação */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500/30 rounded flex items-center justify-center">
                <span className="text-green-400 text-lg">💚</span>
              </div>
              <h2 className="text-lg font-bold text-white">Classificação</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm">
                  Categoria
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-800/50 border border-green-500/30 rounded px-3 py-2 text-sm text-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition cursor-pointer"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm">
                  Fonte de Pagamento
                </label>
                <select
                  value={selectedPaymentSource}
                  onChange={(e) => setSelectedPaymentSource(e.target.value)}
                  className="w-full bg-gray-800/50 border border-green-500/30 rounded px-3 py-2 text-sm text-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition cursor-pointer"
                >
                  <option value="">Selecione a carteira</option>
                  {paymentSources.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name} ({source.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notas Adicionais */}
          <div className="bg-gray-800/50 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500/30 rounded flex items-center justify-center">
                <span className="text-green-400 text-lg">📝</span>
              </div>
              <h2 className="text-lg font-bold text-white">Notas Adicionais</h2>
            </div>

            <div className="space-y-4">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Adicione observações sobre esta compra, como 'Dividido com amigos' ou 'Reembolsável'"
                className="w-full bg-gray-800/50 border border-green-500/30 rounded px-3 py-2 text-sm text-gray-400 placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition resize-none min-h-[80px]"
              />

              {/* Status e Recorrência */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 text-sm">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-gray-800/50 border border-green-500/30 rounded px-3 py-2 text-sm text-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition cursor-pointer"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2 text-sm">
                    Recorrência
                  </label>
                  <select
                    value={recurrence}
                    onChange={(e) => setRecurrence(e.target.value)}
                    className="w-full bg-gray-800/50 border border-green-500/30 rounded px-3 py-2 text-sm text-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition cursor-pointer"
                  >
                    {recurrenceOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Comprovante e Resumo */}
        <div className="col-span-1 space-y-4">
          {/* Comprovante */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500/30 rounded flex items-center justify-center">
                <span className="text-green-400 text-lg">📸</span>
              </div>
              <h2 className="text-lg font-bold text-white">Comprovante</h2>
            </div>

            <div className="border-2 border-dashed border-green-500/30 rounded px-4 py-6 text-center hover:border-green-500/60 hover:bg-green-500/5 transition cursor-pointer">
              <Upload className="w-8 h-8 text-green-500/60 mx-auto mb-2" />
              <p className="text-gray-400 font-medium mb-1 text-sm">
                Clique para fazer upload
              </p>
              <p className="text-gray-600 text-xs">ou arraste a imagem aqui</p>
              <p className="text-gray-700 text-xs mt-2">
                Máximo 5MB • JPEG, PNG, PDF
              </p>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-white mb-4">Resumo</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                <span className="text-gray-400">Status</span>
                <span className="text-green-500 font-bold">
                  {statusOptions
                    .find((opt) => opt.id === status)
                    ?.name?.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                <span className="text-gray-400">Recorrência</span>
                <span className="text-gray-300 font-semibold">
                  {recurrenceOptions.find((opt) => opt.id === recurrence)?.name}
                </span>
              </div>

              <div className="pt-2">
                <div className="text-gray-400 text-xs mb-1">Valor Total</div>
                <div className="text-2xl font-bold text-green-500">
                  {value ? `R$ ${parseFloat(value).toFixed(2)}` : "R$ 0,00"}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              Registrar Compra
            </button>

            <button
              onClick={onBack}
              className="w-full bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold py-2 rounded-lg transition border border-gray-700 text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExpensePage;
