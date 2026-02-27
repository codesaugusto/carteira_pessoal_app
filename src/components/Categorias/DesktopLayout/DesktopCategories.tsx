import { useState } from "react";
import { getCategoriesWithIcons } from "../../../utils/getCategoriesWithIcons";
import { CategoryCard } from "../../CategoryCard";
import { STYLES } from "../../../constants/expenses";

const DesktopCategories = () => {
  const [categories] = useState(() => getCategoriesWithIcons());

  const totalSpent = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const averagePercentage = Math.round(
    categories.reduce((sum, cat) => sum + cat.percentage, 0) /
      categories.length,
  );

  return (
    <div className="flex-1 h-screen overflow-y-auto font-poppins hide-scrollbar">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Categorias</h1>
            <p className="text-gray-400 text-xs">
              Gerencie seus gastos por centros de custo.
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
            Nova Categoria
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Total Spent */}
          <div className={`${STYLES.card}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs mb-1">Gasto Total</p>
                <h2 className="text-2xl font-bold text-white">
                  R${totalSpent.toFixed(2).replace(".", ",")}
                </h2>
                <p className="text-red-500 text-xs mt-1">mês atual</p>
              </div>
              <div className="w-9 h-9 bg-red-500/10 rounded-lg flex items-center justify-center border border-red-500/20">
                <svg
                  className="w-5 h-5 text-red-500"
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

          {/* Categories Count */}
          <div className={`${STYLES.card}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs mb-1">Categorias Ativas</p>
                <h2 className="text-2xl font-bold text-white">
                  {categories.length}
                </h2>
                <p className="text-blue-500 text-xs mt-1">todas visíveis</p>
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
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Average Usage */}
          <div className={`${STYLES.card}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs mb-1">Uso Médio</p>
                <h2 className="text-2xl font-bold text-white">
                  {averagePercentage}%
                </h2>
                <p className="text-green-500 text-xs mt-1">média de uso</p>
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div>
          <h2 className="text-white text-base font-semibold mb-3">
            Suas Categorias
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => {
                  console.log("Categoria clicada:", category.name);
                  // TODO: Abrir modal de detalhes ou edição
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopCategories;
