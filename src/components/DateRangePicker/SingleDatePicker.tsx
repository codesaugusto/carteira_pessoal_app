import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SingleDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  onClose?: () => void;
}

const SingleDatePicker = ({
  value,
  onChange,
  onClose,
}: SingleDatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) {
      return new Date(value);
    }
    return new Date();
  });
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [tempYear, setTempYear] = useState(currentMonth.getFullYear());
  const [yearOffset, setYearOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const handleYearSelection = (year: number) => {
    setTempYear(year);
    setShowYearSelector(false);
    setShowMonthSelector(true);
  };

  const handleMonthSelection = (month: number) => {
    setCurrentMonth(new Date(tempYear, month));
    setShowMonthSelector(false);
  };

  const handleResetToYearSelector = () => {
    setShowMonthSelector(false);
    setShowYearSelector(true);
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    const dateString = selectedDate.toISOString().split("T")[0];
    onChange(dateString);
    onClose?.();
  };

  const MIN_YEAR = 1900;
  const MAX_YEAR = 2100;

  const getYearRange = () => {
    const currentYear = currentMonth.getFullYear();
    const startYear = currentYear - 6 + yearOffset * 12;
    const years = [];
    for (let i = 0; i < 12; i++) {
      years.push(startYear + i);
    }
    return years;
  };

  const days = [];
  const monthDays = daysInMonth(currentMonth);
  const firstDay = firstDayOfMonth(currentMonth);

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= monthDays; i++) {
    days.push(i);
  }

  const isDateSelected = (day: number) => {
    if (!value) return false;
    const selectedDate = new Date(value);
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <div
      ref={containerRef}
      className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden scrollbar-hide"
    >
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4 relative">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-700 rounded transition"
          disabled={showYearSelector || showMonthSelector}
        >
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={() => setShowYearSelector(true)}
          className="text-gray-300 font-semibold capitalize text-sm hover:text-green-400 transition cursor-pointer"
        >
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </button>

        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-700 rounded transition"
          disabled={showYearSelector || showMonthSelector}
        >
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        {/* Year Selector Dropdown */}
        {showYearSelector && (
          <div className="absolute top-12 left-0 right-0 bg-gray-700 rounded-lg p-3 z-10 shadow-lg">
            <div className="flex gap-2 mb-3">
              <button
                onClick={() =>
                  setYearOffset(
                    Math.max(yearOffset - 1, -(MAX_YEAR - MIN_YEAR) / 12),
                  )
                }
                className="p-1 hover:bg-gray-600 rounded transition flex-shrink-0"
              >
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
              <div className="grid grid-cols-3 gap-2 flex-1">
                {getYearRange().map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearSelection(year)}
                    className={`py-1 px-2 rounded text-xs font-semibold transition ${
                      currentMonth.getFullYear() === year
                        ? "bg-green-500 text-white"
                        : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  setYearOffset(
                    Math.min(yearOffset + 1, (MAX_YEAR - MIN_YEAR) / 12),
                  )
                }
                className="p-1 hover:bg-gray-600 rounded transition flex-shrink-0"
              >
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        )}

        {/* Month Selector Dropdown */}
        {showMonthSelector && (
          <div className="absolute top-12 left-0 right-0 bg-gray-700 rounded-lg p-3 z-10 shadow-lg">
            <div className="text-gray-400 text-xs font-semibold mb-2 flex items-center justify-between">
              <span>Selecione o Mês</span>
              <button
                onClick={handleResetToYearSelector}
                className="text-green-400 hover:text-green-300 transition cursor-pointer font-semibold"
              >
                {tempYear}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {monthNames.map((month, index) => (
                <button
                  key={month}
                  onClick={() => handleMonthSelection(index)}
                  className={`py-2 px-2 rounded text-xs font-semibold transition ${
                    currentMonth.getMonth() === index
                      ? "bg-green-500 text-white"
                      : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                  }`}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day && handleDateClick(day)}
            disabled={!day}
            className={`py-2 rounded text-sm font-medium transition ${
              !day
                ? "text-transparent"
                : isDateSelected(day)
                  ? "bg-green-500 text-white font-bold"
                  : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SingleDatePicker;
