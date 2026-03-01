import { useState } from "react";
import { getWalletsWithIcons } from "../../../utils/getWalletsWithIcons";
import { WalletCard } from "../../WalletCard";
import { STYLES } from "../../../constants/expenses";
import { useOnNavigate } from "../../../contexts/navigate";

const DesktopCarteira = () => {
  const [wallets] = useState(() => getWalletsWithIcons());
  const onNavigate = useOnNavigate();

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.amount, 0);
  const averageBalance = Math.round(totalBalance / wallets.length);

  return (
    <div className="flex-1 h-screen overflow-y-auto font-poppins hide-scrollbar">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Minhas Carteiras
            </h1>
            <p className="text-gray-400 text-xs">
              Acompanhe todos os seus saldos e movimentações em tempo real
            </p>
          </div>
          <button className={STYLES.button.primary}>
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
            Adicionar Carteira
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Total Balance */}
          <button
            className={`${STYLES.card} flex flex-col justify-between hover:scale-102 active:scale-99 duration-75 transition-normal cursor-pointer`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs mb-1 flex items-start">
                  Saldo Total
                </p>
                <h2 className="text-2xl font-bold text-white flex items-start">
                  R${totalBalance.toFixed(2).replace(".", ",")}
                </h2>
                <p className="text-green-500 text-xs mt-1 flex items-start">
                  ↑ 12% este mês
                </p>
              </div>
              <div className="w-9 h-9 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </button>

          {/* Average Balance */}
          <button
            className={`${STYLES.card} flex flex-col justify-between hover:scale-102 active:scale-99 duration-75 transition-normal cursor-pointer`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs mb-1 flex items-start">
                  Saldo Médio
                </p>
                <h2 className="text-2xl font-bold text-white">
                  R${averageBalance.toFixed(2).replace(".", ",")}
                </h2>
                <p className="text-blue-500 text-xs mt-1 flex items-start">
                  {wallets.length} carteiras
                </p>
              </div>
              <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </button>

          {/* Wallets Count */}
          <button
            className={`${STYLES.card} flex flex-col justify-between hover:scale-102 active:scale-99 duration-75 transition-normal cursor-pointer`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs mb-1 flex items-start">
                  Carteiras Ativas
                </p>
                <h2 className="text-2xl font-bold text-white flex items-start">
                  {wallets.length}
                </h2>
                <p className="text-purple-500 text-xs mt-1 flex items-start">
                  Todas atualizadas
                </p>
              </div>
              <div className="w-9 h-9 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Wallets Grid */}
        <div className="mb-6">
          <h2 className="text-white text-base font-semibold mb-3">
            Suas Carteiras
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {wallets.map((wallet) => (
              <WalletCard
                key={wallet.id}
                wallet={wallet}
                onClick={() => {
                  console.log("Carteira clicada:", wallet.name);
                  onNavigate?.(wallet.id);
                }}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <p className="text-blue-400 text-xs font-medium mb-1">💡 Dica</p>
          <p className="text-gray-400 text-xs">
            Monitore regularmente suas carteiras para manter o controle total
            das suas finanças e identificar oportunidades de otimização.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DesktopCarteira;
