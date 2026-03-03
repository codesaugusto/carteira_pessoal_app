import { useState, useRef, useEffect } from "react";
import { ChevronDown, Wallet } from "lucide-react";

interface PaymentSourceSelectProps {
  value: string;
  onChange: (value: string) => void;
  sources: Array<{
    id: string;
    name: string;
    type: string;
  }>;
}

const PaymentSourceSelect = ({
  value,
  onChange,
  sources,
}: PaymentSourceSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedSource = sources.find((source) => source.id === value);

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
          <Wallet className="w-4 h-4 text-green-400" />
          {selectedSource ? (
            <>
              <span>{selectedSource.name}</span>
              <span className="text-xs text-gray-400">
                ({selectedSource.type})
              </span>
            </>
          ) : (
            <span className="text-gray-400">Selecione a carteira</span>
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
            {sources.map((source) => (
              <button
                key={source.id}
                onClick={() => {
                  onChange(source.id);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-sm text-left flex items-center gap-3 justify-between transition-colors border-b border-gray-800/50 last:border-b-0 ${
                  value === source.id
                    ? "bg-green-500/20 text-green-400 border-l-2 border-l-green-500"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <span>
                  <div className="font-medium">{source.name}</div>
                  <div className="text-xs text-gray-400">{source.type}</div>
                </span>
                {value === source.id && (
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

export default PaymentSourceSelect;
