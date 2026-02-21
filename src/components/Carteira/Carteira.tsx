import { Wallet, CreditCard, Building, PiggyBank } from "lucide-react";

const Carteira = () => {
  const wallets = [
    {
      id: 1,
      name: "Carteira Física",
      description: "Dinheiro Espécie",
      amount: 450.0,
      icon: <Wallet className="text-green-500 w-7 h-7" />,
    },
    {
      id: 2,
      name: "Cartão",
      description: "Limite disponível",
      amount: 5000.0,
      icon: <CreditCard className="text-green-500 w-7 h-7" />,
    },
    {
      id: 3,
      name: "Banco Digital",
      description: "Conta Corrente",
      amount: 3800.0,
      icon: <Building className="text-green-500 w-7 h-7" />,
    },
    {
      id: 4,
      name: "Reserva Emergência",
      description: "Investimentos",
      amount: 15000.0,
      icon: <PiggyBank className="text-green-500 w-7 h-7" />,
    },
  ];

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.amount, 0);

  return (
    <div className="pb-25">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-6 border-b border-gray-800">
        <div>
          <h1 className="text-white text-3xl font-bold">Carteira</h1>
          <p className="text-gray-400 text-sm mt-1">Saldo Total Líquido</p>
        </div>
        <button className="w-10 h-10 flex items-center justify-center">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Total Balance */}
      <div className="px-6 py-8">
        <p className="text-gray-400 text-sm font-poppins mb-2">
          Saldo Total Líquido
        </p>
        <p className="text-white text-4xl font-bold font-poppins">
          R$ {totalBalance.toFixed(2).replace(".", ",")}
        </p>
      </div>

      {/* Wallets List */}
      <div className="px-6 py-4 pb-25">
        <div className="space-y-3 font-poppins">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              className="w-full text-left bg-gray-800/50 rounded-2xl p-3 flex items-center justify-between transition-all duration-150 active:scale-95 active:brightness-120"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 bg-green-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  {wallet.icon}
                </div>

                <div className="flex-1 min-w-0 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm">
                      {wallet.name}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {wallet.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <p className="text-white font-bold text-md">
                      R$ {wallet.amount.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Button */}
      <button className="fixed bottom-24 right-6 w-13 h-13 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
        <svg
          className="w-8 h-8 text-white"
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
      </button>
    </div>
  );
};

export default Carteira;
