import { useState } from "react";
import { getWalletsWithIcons } from "../../../utils/getWalletsWithIcons";
import { WalletCard } from "../../WalletCard";
import { STYLES } from "../../../constants/expenses";

const DesktopCarteira = () => {
  const [wallets] = useState(() => getWalletsWithIcons());

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
          <div className={`${STYLES.card}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs mb-1">Saldo Total</p>
                <h2 className="text-2xl font-bold text-white">
                  R${totalBalance.toFixed(2).replace(".", ",")}
                </h2>
                <p className="text-green-500 text-xs mt-1">↑ 12% este mês</p>
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
          </div>

          {/* Average Balance */}
          <div className={`${STYLES.card}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs mb-1">Saldo Médio</p>
                <h2 className="text-2xl font-bold text-white">
                  R${averageBalance.toFixed(2).replace(".", ",")}
                </h2>
                <p className="text-blue-500 text-xs mt-1">
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
          </div>

          {/* Wallets Count */}
          <div className={`${STYLES.card}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs mb-1">Carteiras Ativas</p>
                <h2 className="text-2xl font-bold text-white">
                  {wallets.length}
                </h2>
                <p className="text-purple-500 text-xs mt-1">
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
          </div>
        </div>

        {/* Wallets Grid */}
        <div className="mb-6">
          <h2 className="text-white text-base font-semibold mb-3">
            Suas Carteiras
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {wallets.map((wallet) => (
              <WalletCard
                key={wallet.id}
                wallet={wallet}
                onClick={() => {
                  console.log("Carteira clicada:", wallet.name);
                  // TODO: Abrir modal de detalhes ou movimentações
                }}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-white text-base font-semibold mb-3">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-4 gap-3">
            <button className="flex items-center justify-center gap-2 p-3 bg-gray-800/40 rounded-lg border border-green-500/20 hover:bg-gray-800/60 transition group">
              <svg
                className="w-4 h-4 text-green-500 group-hover:scale-110 transition"
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
              <span className="text-white text-xs font-medium">Adicionar</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 bg-gray-800/40 rounded-lg border border-green-500/20 hover:bg-gray-800/60 transition group">
              <svg
                className="w-4 h-4 text-green-500 group-hover:scale-110 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-white text-xs font-medium">Transferir</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 bg-gray-800/40 rounded-lg border border-green-500/20 hover:bg-gray-800/60 transition group">
              <svg
                className="w-4 h-4 text-green-500 group-hover:scale-110 transition"
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
              <span className="text-white text-xs font-medium">Relatório</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 bg-gray-800/40 rounded-lg border border-green-500/20 hover:bg-gray-800/60 transition group">
              <svg
                className="w-4 h-4 text-green-500 group-hover:scale-110 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-white text-xs font-medium">Configurar</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6">
          <h2 className="text-white text-base font-semibold mb-3">
            Distribuição por Tipo
          </h2>
          <div className="grid grid-cols-4 gap-3">
            <div className={`${STYLES.card} border-green-500/30`}>
              <p className="text-gray-400 text-xs">💵 Carteira Física</p>
              <p className="text-white font-semibold text-lg mt-1">
                {wallets.filter((w) => w.type === "cash").length > 0
                  ? `R$${wallets
                      .filter((w) => w.type === "cash")
                      .reduce((sum, w) => sum + w.amount, 0)
                      .toFixed(2)
                      .replace(".", ",")}`
                  : "R$ 0,00"}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {wallets.filter((w) => w.type === "cash").length} carteira(s)
              </p>
            </div>
            <div className={`${STYLES.card} border-green-500/30`}>
              <p className="text-gray-400 text-xs">💳 Cartões</p>
              <p className="text-white font-semibold text-lg mt-1">
                {wallets.filter((w) => w.type === "card").length > 0
                  ? `R$${wallets
                      .filter((w) => w.type === "card")
                      .reduce((sum, w) => sum + w.amount, 0)
                      .toFixed(2)
                      .replace(".", ",")}`
                  : "R$ 0,00"}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {wallets.filter((w) => w.type === "card").length} carteira(s)
              </p>
            </div>
            <div className={`${STYLES.card} border-green-500/30`}>
              <p className="text-gray-400 text-xs">🏦 Banco</p>
              <p className="text-white font-semibold text-lg mt-1">
                {wallets.filter((w) => w.type === "bank").length > 0
                  ? `R$${wallets
                      .filter((w) => w.type === "bank")
                      .reduce((sum, w) => sum + w.amount, 0)
                      .toFixed(2)
                      .replace(".", ",")}`
                  : "R$ 0,00"}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {wallets.filter((w) => w.type === "bank").length} carteira(s)
              </p>
            </div>
            <div className={`${STYLES.card} border-green-500/30`}>
              <p className="text-gray-400 text-xs">💰 Investimentos</p>
              <p className="text-white font-semibold text-lg mt-1">
                {wallets.filter((w) => w.type === "savings").length > 0
                  ? `R$${wallets
                      .filter((w) => w.type === "savings")
                      .reduce((sum, w) => sum + w.amount, 0)
                      .toFixed(2)
                      .replace(".", ",")}`
                  : "R$ 0,00"}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {wallets.filter((w) => w.type === "savings").length} carteira(s)
              </p>
            </div>
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
