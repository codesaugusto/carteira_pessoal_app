import type { Wallet } from "../data/walletsData";

interface WalletCardProps {
  wallet: Wallet;
  onClick?: () => void;
}

export const WalletCard = ({ wallet, onClick }: WalletCardProps) => {
  const getGradientByType = (type: string) => {
    switch (type) {
      case "cash":
        return "from-yellow-500 to-yellow-400";
      case "card":
        return "from-blue-500 to-blue-400";
      case "bank":
        return "from-purple-500 to-purple-400";
      case "savings":
        return "from-emerald-500 to-emerald-400";
      default:
        return "from-green-500 to-green-400";
    }
  };

  return (
    <button
      onClick={onClick}
      className="bg-gray-800/50 hover:bg-gray-800 rounded-lg p-5 flex flex-col justify-between transition-all duration-150 active:scale-95 cursor-pointer h-48 group overflow-hidden relative"
    >
      {/* Menu Button */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-700/50 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      {/* Background Gradient */}
      <div
        className={`absolute inset-0 opacity-5 bg-gradient-to-br ${getGradientByType(
          wallet.type,
        )}`}
      />

      {/* Icon */}
      <div className="relative z-10 flex items-start justify-between mb-auto">
        <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
          {wallet.icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-white font-semibold text-sm mb-1">{wallet.name}</h3>
        <p className="text-gray-400 text-xs mb-3">{wallet.description}</p>
        <p className="text-white font-bold text-xl">
          R${wallet.amount.toFixed(2).replace(".", ",")}
        </p>
      </div>
    </button>
  );
};
