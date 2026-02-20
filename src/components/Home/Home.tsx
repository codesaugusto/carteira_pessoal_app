import { VscCoffee } from "react-icons/vsc";
import { RiShoppingBag2Line } from "react-icons/ri";
import { MdAirplay } from "react-icons/md";

const Home = () => {
  const recentExpenses = [
    {
      id: 1,
      name: "Dolce Café",
      description: "Hoje, 09:41",
      amount: 4.5,
      icon: <VscCoffee className="text-amber-600 w-7 h-7" />,
      bgColor: "bg-amber-900/50",
      iconColor: "text-amber-600",
    },
    {
      id: 2,
      name: "Lojas Hitech",
      description: "Ontem, 06:20",
      amount: 42.0,
      icon: <RiShoppingBag2Line className="text-blue-500 w-7 h-7" />,
      bgColor: "bg-blue-900/50",
      iconColor: "text-blue-500",
    },
    {
      id: 3,
      name: "Netflix",
      description: "23 de Out, 2023",
      amount: 15.99,
      icon: <MdAirplay className="text-red-500 w-7 h-7" />,
      bgColor: "bg-red-900/50",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="px-6 pb-24">
      {/* Card de Gastos Mensais */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-2 right-7">
          <div className="w-12 h-12 bg-green-800/40 rounded-2xl flex items-center justify-center">
            {/* seta de indicador para aumento ou diminuição */}
            {/* diminuição */}
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
            {/* aumento
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg> */}
          </div>
        </div>

        <p className="text-green-100 text-sm font-medium mb-2">
          GASTOS ESTE MÊS
        </p>
        <p className="text-white text-5xl font-bold mb-6">R$1,890.00</p>

        <div className="w-full bg-green-800/30 rounded-full h-2 mb-4">
          <div className="bg-white rounded-full h-2 w-[65%]"></div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-green-100 text-sm">SALDO: $3,000.00</p>
          <p className="text-green-100 text-sm font-semibold">65% USADOS</p>
        </div>
      </div>

      {/* Grid de Ações */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <button className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-500"
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
          </div>
          <span className="text-gray-300 text-xs text-center">Adicionar</span>
        </button>

        <button className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
            </svg>
          </div>
          <span className="text-gray-300 text-xs text-center">Categorias</span>
        </button>

        <button className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </div>
          <span className="text-gray-300 text-xs text-center">Carteira</span>
        </button>

        <button className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </svg>
          </div>
          <span className="text-gray-300 text-xs text-center">
            Configurações
          </span>
        </button>
      </div>

      {/* Recent Expenses */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-bold">Compras Recentes</h2>
          <button className="text-green-500 text-sm font-semibold">
            Ver todos
          </button>
        </div>

        <div className="space-y-3">
          {recentExpenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-gray-800/50 rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${expense.bgColor} rounded-xl flex items-center justify-center`}
                >
                  <span className="text-3xl">{expense.icon}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">{expense.name}</p>
                  <p className="text-gray-400 text-sm">{expense.description}</p>
                </div>
              </div>
              <p className="text-white font-bold text-lg">
                -R${expense.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
