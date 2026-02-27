import type { Category } from "../data/categoriesData";

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-800/50 hover:bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-between transition-all duration-150 active:scale-95 cursor-pointer h-full group"
    >
      {/* Menu Button */}
      <div className="w-full flex justify-end mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-700/50 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      {/* Icon */}
      <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-3 border border-green-500/20">
        {category.icon}
      </div>

      {/* Category Name */}
      <h3 className="text-white font-semibold text-sm mb-1 text-center">
        {category.name}
      </h3>

      {/* Transactions Count */}
      <p className="text-gray-400 text-xs mb-4">
        {category.transactions} transações este mês
      </p>

      {/* Amount */}
      <p className="text-white font-bold text-lg mb-3">
        R${category.amount.toFixed(2).replace(".", ",")}
      </p>

      {/* Progress Bar */}
      <div className="w-full">
        <div className="w-full bg-gray-700/50 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all"
            style={{ width: `${category.percentage}%` }}
          ></div>
        </div>
        <p className="text-gray-400 text-xs mt-2 text-center">
          {category.percentage}% de limite
        </p>
      </div>
    </button>
  );
};
