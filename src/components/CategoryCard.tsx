import type { Category } from "../data/categoriesData";

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-800/50 hover:bg-gray-800 rounded-lg p-5 flex flex-col items-center justify-between active:scale-95 duration-75 transition-transform cursor-pointer h-full group"
    >
      {/* Menu Button */}
      <div className="w-full flex justify-end mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-5 h-5 flex items-center justify-center hover:bg-gray-700/50 rounded-lg transition-colors">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      {/* Icon */}
      <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-2 border border-green-500/20">
        {category.icon}
      </div>

      {/* Category Name */}
      <h3 className="text-white font-semibold text-xs mb-1 text-center">
        {category.name}
      </h3>

      {/* Transactions Count */}
      <p className="text-gray-400 text-xs mb-2">
        {category.transactions} transações
      </p>

      {/* Amount */}
      <p className="text-white font-bold text-base mb-2">
        R${category.amount.toFixed(2).replace(".", ",")}
      </p>

      {/* Progress Bar */}
      <div className="w-full">
        <div className="w-full bg-gray-700/50 rounded-full h-1.5">
          <div
            className="animate-progress bg-gradient-to-r from-green-500 to-green-400 h-1.5 rounded-full transition-all"
            style={
              {
                "--progress-width": `${category.percentage}%`,
              } as React.CSSProperties
            }
          ></div>
        </div>
        <p className="text-gray-400 text-xs mt-1 text-center">
          {category.percentage}% de limite
        </p>
      </div>
    </button>
  );
};
