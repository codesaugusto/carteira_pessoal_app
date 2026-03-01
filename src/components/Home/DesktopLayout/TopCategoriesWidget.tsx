import { FaCheck } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { IoCarSport } from "react-icons/io5";
import { IoGameController } from "react-icons/io5";
import { useOnNavigate } from "../../../contexts/navigate";

interface TopCategoriesWidgetProps {
  categories?: Array<{
    name: string;
    icon: React.ReactNode;
    percentage?: number;
  }>;
  onClick?: () => void;
}

export const TopCategoriesWidget = ({
  categories = [
    {
      name: "Alimentação",
      icon: <IoFastFood className="text-green-600 w-5 h-5" />,
      percentage: 45,
    },
    {
      name: "Transporte",
      icon: <IoCarSport className="text-green-600 w-5 h-5" />,
      percentage: 28,
    },
    {
      name: "Lazer",
      icon: <IoGameController className="text-green-600 w-5 h-5" />,
      percentage: 27,
    },
  ],
  onClick,
}: TopCategoriesWidgetProps) => {
  const onNavigate = useOnNavigate();

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm hover:scale-101 cursor-pointer active:scale-100 duration-75 transition-normal">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center">
            <FaCheck className="text-green-500 w-4 h-4" />
          </div>
          <h3 className="text-white font-semibold text-sm">
            Categorias Principais
          </h3>
        </div>
        <button
          onClick={onClick}
          className="text-green-500 cursor-pointer hover:text-white text-xs font-semibold transition-colors"
        >
          Gerenciar
        </button>
      </div>

      <button
        onClick={() => onNavigate?.(1)}
        className="space-y-5 w-full cursor-pointer"
      >
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
              <span className="text-white font-semibold flex items-end justify-end text-xs">
                {category.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div
                className="bg-green-500 rounded-full h-1 transition-all animate-progress"
                style={
                  {
                    "--progress-width": `${category.percentage}%`,
                  } as React.CSSProperties
                }
              ></div>
            </div>
          </div>
        ))}
      </button>
    </div>
  );
};
