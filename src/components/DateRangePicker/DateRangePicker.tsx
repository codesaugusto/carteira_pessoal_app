import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Info, X } from "lucide-react";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [tempYear, setTempYear] = useState(currentMonth.getFullYear());
  const [yearOffset, setYearOffset] = useState(0);
  const [showHint, setShowHint] = useState(() => {
    const saved = localStorage.getItem("dateRangePickerHint");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [selectedRange, setSelectedRange] = useState<{
    start?: Date;
    end?: Date;
  }>({
    start: startDate ? new Date(startDate) : undefined,
    end: endDate ? new Date(endDate) : undefined,
  });

  // Salvar estado da dica no localStorage
  useEffect(() => {
    localStorage.setItem("dateRangePickerHint", JSON.stringify(showHint));
  }, [showHint]);

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateInputChange = (dateString: string, isStart: boolean) => {
    if (!dateString) return;

    const newDate = new Date(dateString);
    if (isStart) {
      setSelectedRange({ ...selectedRange, start: newDate });
      onStartDateChange(dateString);
    } else {
      setSelectedRange({ ...selectedRange, end: newDate });
      onEndDateChange(dateString);
    }
  };

  const formatDateForInput = (date?: Date): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
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

  const canGoToPrevYears = () => {
    const yearRange = getYearRange();
    return yearRange[0] > MIN_YEAR;
  };

  const canGoToNextYears = () => {
    const yearRange = getYearRange();
    return yearRange[11] < MAX_YEAR;
  };

  const handlePrevYears = () => {
    if (canGoToPrevYears()) {
      setYearOffset((prev) => prev - 1);
    }
  };

  const handleNextYears = () => {
    if (canGoToNextYears()) {
      setYearOffset((prev) => prev + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    const clickedDateStr = clickedDate.toISOString().split("T")[0];

    if (!selectedRange.start) {
      setSelectedRange({ start: clickedDate });
      onStartDateChange(clickedDateStr);
    } else if (!selectedRange.end) {
      if (clickedDate >= selectedRange.start) {
        setSelectedRange({ ...selectedRange, end: clickedDate });
        onEndDateChange(clickedDateStr);
      } else {
        setSelectedRange({ start: clickedDate });
        onStartDateChange(clickedDateStr);
      }
    } else {
      setSelectedRange({ start: clickedDate });
      onStartDateChange(clickedDateStr);
    }
  };

  const isDateInRange = (day: number) => {
    if (!selectedRange.start || !selectedRange.end) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    return date >= selectedRange.start && date <= selectedRange.end;
  };

  const isDateStart = (day: number) => {
    if (!selectedRange.start) return false;
    return (
      selectedRange.start.getDate() === day &&
      selectedRange.start.getMonth() === currentMonth.getMonth() &&
      selectedRange.start.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isDateEnd = (day: number) => {
    if (!selectedRange.end) return false;
    return (
      selectedRange.end.getDate() === day &&
      selectedRange.end.getMonth() === currentMonth.getMonth() &&
      selectedRange.end.getFullYear() === currentMonth.getFullYear()
    );
  };

  const days = [];
  const blanks = firstDayOfMonth(currentMonth);
  const daysCount = daysInMonth(currentMonth);

  for (let i = 0; i < blanks; i++) {
    days.push(<div key={`blank-${i}`}></div>);
  }

  for (let day = 1; day <= daysCount; day++) {
    days.push(day);
  }

  const monthName = currentMonth.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none;
        }
        input[type="date"]::-moz-calendar-picker-indicator {
          display: none;
        }
      `}</style>
      <div className="p-4 bg-gray-800/50 rounded-lg">
        {/* Instructions */}
        {showHint && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex gap-2 items-start justify-between">
              <div className="flex gap-2 items-start flex-1">
                <Info className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-green-300 space-y-1">
                  <p className="font-semibold">Como usar:</p>
                  <ol className="list-decimal list-inside space-y-0.5">
                    <li>
                      Clique na data de{" "}
                      <span className="text-green-200 font-semibold">
                        início
                      </span>
                    </li>
                    <li>
                      Clique na data de{" "}
                      <span className="text-green-200 font-semibold">fim</span>
                    </li>
                  </ol>
                </div>
              </div>
              <button
                onClick={() => setShowHint(false)}
                className="text-green-400 hover:text-green-300 transition flex-shrink-0"
                aria-label="Fechar dica"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

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
            {monthName}
          </button>

          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-700 rounded transition"
            disabled={showYearSelector || showMonthSelector}
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          {/* Year Selector */}
          {showYearSelector && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-20 p-3">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={handlePrevYears}
                  disabled={!canGoToPrevYears()}
                  className={`p-1 rounded transition ${
                    canGoToPrevYears()
                      ? "hover:bg-gray-700 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                <p className="text-gray-400 text-xs font-semibold">
                  {getYearRange()[0]} - {getYearRange()[11]}
                </p>
                <button
                  onClick={handleNextYears}
                  disabled={!canGoToNextYears()}
                  className={`p-1 rounded transition ${
                    canGoToNextYears()
                      ? "hover:bg-gray-700 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {getYearRange().map((year) => {
                  const isOutOfRange = year < MIN_YEAR || year > MAX_YEAR;
                  return (
                    <button
                      key={year}
                      onClick={() => handleYearSelection(year)}
                      disabled={isOutOfRange}
                      className={`px-2 py-1 text-sm rounded transition ${
                        isOutOfRange
                          ? "opacity-30 cursor-not-allowed text-gray-500"
                          : year === tempYear
                            ? "bg-green-500 text-white font-semibold"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Month Selector */}
          {showMonthSelector && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-20 p-3">
              <p className="text-gray-400 text-xs font-semibold mb-2">
                Selecione o Mês - {tempYear}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "Jan",
                  "Fev",
                  "Mar",
                  "Abr",
                  "Mai",
                  "Jun",
                  "Jul",
                  "Ago",
                  "Set",
                  "Out",
                  "Nov",
                  "Dez",
                ].map((month, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleMonthSelection(idx)}
                    className={`px-2 py-1.5 text-sm rounded transition ${
                      idx === currentMonth.getMonth() &&
                      tempYear === currentMonth.getFullYear()
                        ? "bg-green-500 text-white font-semibold"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            if (!day) {
              return <div key={`empty-${idx}`}></div>;
            }

            const dayNum = day as number;
            const isStart = isDateStart(dayNum);
            const isEnd = isDateEnd(dayNum);
            const isInRange = isDateInRange(dayNum);

            return (
              <button
                key={dayNum}
                onClick={() => handleDateClick(dayNum)}
                className={`
                p-2 text-xs rounded transition text-center
                ${
                  isStart || isEnd
                    ? "bg-green-500 text-white font-semibold"
                    : isInRange
                      ? "bg-green-500/30 text-green-400"
                      : "text-gray-400 hover:bg-gray-700"
                }
              `}
              >
                {dayNum}
              </button>
            );
          })}
        </div>

        {/* Selected Range Display - Editable */}
        <div className="mt-4 p-3 bg-gray-700/50 rounded space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-gray-400 text-xs font-semibold min-w-fit">
              De:
            </label>
            <input
              type="date"
              value={formatDateForInput(selectedRange.start)}
              onChange={(e) => handleDateInputChange(e.target.value, true)}
              className="flex-1 px-2 py-1.5 bg-gray-600 text-white text-sm rounded border border-gray-500 focus:border-green-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-gray-400 text-xs font-semibold min-w-fit">
              Até:
            </label>
            <input
              type="date"
              value={formatDateForInput(selectedRange.end)}
              onChange={(e) => handleDateInputChange(e.target.value, false)}
              className="flex-1 px-2 py-1.5 bg-gray-600 text-white text-sm rounded border border-gray-500 focus:border-green-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DateRangePicker;
