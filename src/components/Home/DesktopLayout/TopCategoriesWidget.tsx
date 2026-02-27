import { FaCheck } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { IoCarSport } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";

interface TopCategoriesWidgetProps {
  categories?: Array<{
    name: string;
    percentage: number;
    icon: React.ReactNode;
  }>;
}

export const TopCategoriesWidget = ({
  categories = [
    {
      name: "Alimentação",
      percentage: 32,
      icon: <IoFastFood className="text-green-600 w-5 h-5" />,
    },
    {
      name: "Transporte",
      percentage: 18,
      icon: <IoCarSport className="text-green-600 w-5 h-5" />,
    },
    {
      name: "Lazer",
      percentage: 12,
      icon: <IoGameController className="text-green-600 w-5 h-5" />,
    },
  ],
}: TopCategoriesWidgetProps) => {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center">
            <FaCheck className="text-green-500 w-4 h-4" />
          </div>
          <h3 className="text-white font-semibold text-sm">
            Categorias Principais
          </h3>
        </div>
        <button className="text-green-500 hover:text-green-400 text-xs font-semibold transition-colors">
          Gerenciar
        </button>
      </div>

      <div className="space-y-5">
        {categories.map((category, index) => (
          <div key={index} className="space-y-2.5 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  {category.icon}
                </div>
                <span className="text-gray-300 text-xs font-medium">
                  {category.name}
                </span>
              </div>
              <span className="text-white font-semibold text-xs">
                {category.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div
                className="bg-green-500 rounded-full h-1 transition-all"
                style={{ width: `${category.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
