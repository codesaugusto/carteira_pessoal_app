import type { Meta } from "../../data/metasData";

interface MetaCardProps {
  meta: Meta;
  onClick?: () => void;
}

export const MetaCard = ({ meta, onClick }: MetaCardProps) => {
  const percentage = Math.round((meta.currentAmount / meta.targetAmount) * 100);

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden cursor-pointer rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
    >
      {/* Image Background */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={meta.image}
          alt={meta.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />

        {/* Badge */}
        <div
          className={`absolute top-3 right-3 ${meta.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}
        >
          {meta.badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-base mb-1 truncate">
          {meta.title}
        </h3>
        <p className="text-gray-400 text-xs mb-3">
          Previsão: {meta.targetDate}
        </p>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-green-500 to-green-400 rounded-full h-2 transition-all duration-500"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-500 font-bold text-sm">
              {percentage}%
            </span>
            <span className="text-gray-400 text-xs">
              R${meta.currentAmount.toLocaleString()} / R$
              {meta.targetAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};
