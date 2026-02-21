import { Utensils } from "lucide-react";
import { Car } from "lucide-react";
import { Gamepad2 } from "lucide-react";
import { Heart } from "lucide-react";
import { GraduationCap } from "lucide-react";

const Categorias = () => {
  const categories = [
    {
      id: 1,
      name: "Alimentação",
      icon: <Utensils className="text-green-600 w-7 h-7" />,
      amount: 850.0,
      transactions: 12,
      percentage: 70,
    },
    {
      id: 2,
      name: "Transporte",
      icon: <Car className="text-green-600 w-7 h-7" />,
      amount: 420.5,
      transactions: 24,
      percentage: 60,
    },
    {
      id: 3,
      name: "Lazer",
      icon: <Gamepad2 className="text-green-600 w-7 h-7" />,
      amount: 310.0,
      transactions: 5,
      percentage: 40,
    },
    {
      id: 4,
      name: "Saúde",
      icon: <Heart className="text-green-600 w-7 h-7" />,
      amount: 620.3,
      transactions: 2,
      percentage: 65,
    },
    {
      id: 5,
      name: "Educação",
      icon: <GraduationCap className="text-green-600 w-7 h-7" />,
      amount: 250.0,
      transactions: 1,
      percentage: 35,
    },
  ];

  const totalSpent = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-6 border-b border-gray-800">
        <h1 className="text-white text-3xl font-bold">Categorias</h1>
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

      {/* Gastos Section */}
      <div className="px-6 py-6 border-b border-gray-800">
        <p className="text-gray-400 text-sm font-poppins mb-2">
          Gastos de Outubro
        </p>
        <p className="text-white text-4xl font-bold font-poppins">
          R$ {totalSpent.toFixed(2).replace(".", ",")}
        </p>
      </div>

      {/* Categories List */}
      <div className="px-6 py-4 pb-25">
        <div className="space-y-3 text-sm font-poppins">
          {categories.map((category) => (
            <button
              key={category.id}
              className="w-full text-left bg-gray-800/50 rounded-2xl p-3 flex items-center justify-between transition-all duration-150 active:scale-95 active:brightness-120"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 bg-green-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  {category.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold">{category.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {category.transactions} transações
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 ml-4">
                <p className="text-white font-bold text-lg">
                  R$ {category.amount.toFixed(2).replace(".", ",")}
                </p>
                <div className="w-14 h-2 bg-gray-700 rounded-full">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
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

export default Categorias;
