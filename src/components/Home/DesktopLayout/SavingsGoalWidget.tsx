interface SavingsGoalWidgetProps {
  goalName?: string;
  current?: number;
  goal?: number;
  percentage?: number;
  onClick?: () => void;
}

export const SavingsGoalWidget = ({
  goalName = "Playstation 5",
  current = 2400,
  goal = 3500,
  percentage = 68,
  onClick,
}: SavingsGoalWidgetProps) => {
  return (
    <div className="bg-gradient-to-br from-green-600 to-green-700 md:!bg-gray-800/30 md:!from-gray-800/30 md:!to-gray-800/30 md:rounded-xl rounded-3xl px-5 py-8 md:p-6 relative overflow-hidden">
      <div className="absolute top-2 right-7 md:hidden">
        <div className="w-12 h-12 bg-green-800/40 rounded-2xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
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

      <p className="text-white text-sm md:text-sm font-bold md:py mb-2 md:mb-3 font-poppins">
        Meta de Economia
      </p>
      <h3 className="hidden md:flex text-white font-semibold text-base md:text-sm md:mb-2 font-poppins">
        {goalName}
      </h3>
      <p className="text-white text-4xl md:text-lg font-bold mb-6 md:mb-1 font-poppins">
        R${current.toLocaleString()}{" "}
        <span className="text-green-100 text-sm md:text-sm">
          / R${goal.toLocaleString()}
        </span>
      </p>

      <div className="w-full bg-green-800/30 rounded-full h-2 md:h-1.5 mb-4 md:mb-2">
        <div
          className="md:bg-green-500 bg-white rounded-full h-2 md:h-1.5 transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center font-poppins">
        <p className="text-green-100 text-sm md:text-xs font-medium">
          {percentage}% ALCANÇADO
        </p>
        <button
          onClick={onClick}
          className="hidden md:flex text-green-500 cursor-pointer hover:text-white text-sm md:text-xs font-semibold transition-colors"
        >
          Gerenciar
        </button>
      </div>
    </div>
  );
};
