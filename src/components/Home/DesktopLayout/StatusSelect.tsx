import { useState, useRef, useEffect } from "react";
import { ChevronDown, CheckCircle } from "lucide-react";

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    id: string;
    name: string;
  }>;
}

const getStatusColor = (statusId: string) => {
  switch (statusId) {
    case "paid":
      return "text-green-400";
    case "pending":
      return "text-yellow-400";
    case "cancelled":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

const getStatusBgColor = (statusId: string) => {
  switch (statusId) {
    case "paid":
      return "bg-green-500/10";
    case "pending":
      return "bg-yellow-500/10";
    case "cancelled":
      return "bg-red-500/10";
    default:
      return "bg-gray-500/10";
  }
};

const StatusSelect = ({ value, onChange, options }: StatusSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedStatus = options.find((opt) => opt.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-800/50 border border-green-500/30 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition cursor-pointer flex items-center justify-between hover:border-green-500/60"
      >
        <span className="flex items-center gap-2">
          <CheckCircle className={`w-4 h-4 ${getStatusColor(value)}`} />
          {selectedStatus ? (
            <span className={getStatusColor(value)}>{selectedStatus.name}</span>
          ) : (
            <span className="text-gray-400">Selecione o status</span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-green-500/30 rounded-lg shadow-2xl z-50 overflow-hidden">
          <div className="max-h-auto overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-sm text-left flex items-center gap-3 justify-between transition-colors border-b border-gray-800/50 last:border-b-0 ${
                  value === option.id
                    ? `${getStatusBgColor(
                        option.id,
                      )} ${getStatusColor(option.id)} border-l-2 border-l-green-500`
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <span className="font-medium">{option.name}</span>
                {value === option.id && (
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusSelect;
