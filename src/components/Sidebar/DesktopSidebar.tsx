import { useState } from "react";
import { useOnNavigate } from "../../contexts/navigate/useOnNavigate";

interface DesktopSidebarProps {
  currentPage: number;
}

export const DesktopSidebar = ({ currentPage }: DesktopSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onNavigate = useOnNavigate();

  const menuItems = [
    {
      id: 0,
      label: "Home",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      id: 1,
      label: "Categorias",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
        </svg>
      ),
    },
    {
      id: 2,
      label: "Carteira",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      ),
    },
    {
      id: 3,
      label: "Metas",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      id: 4,
      label: "Configurações",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`hidden md:flex md:flex-col fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800 transition-all duration-400 overflow-hidden ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="p-5 border-b border-gray-800 flex-shrink-0">
        <button
          onClick={() => onNavigate?.(0)}
          className="flex cursor-pointer items-center gap-3 w-full transition-all duration-400"
        >
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </div>
          <div
            className={`transition-all duration-400 whitespace-nowrap ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            <h1 className="text-white flex items-start font-bold font-poppins text-lg leading-tight">
              Carteira 67
            </h1>
            <p className="text-gray-400 text-xs italic leading-tight">
              Seu App de Gestão Financeira
            </p>
          </div>
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-6 space-y-2 text-sm overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex flex-shrink-0 rounded-lg cursor-pointer py-3 items-center justify-start gap-3 px-4 ${
              currentPage === item.id
                ? "bg-green-500/20 text-green-500 border border-green-500/30"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <div
              className={`flex-shrink-0 ${
                isCollapsed ? "flex-1 flex items-center justify-center" : ""
              }`}
            >
              {item.icon}
            </div>
            <span
              className={`font-medium whitespace-nowrap ${
                isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-400 group"
          title={isCollapsed ? "Expandir" : "Minimizar"}
        >
          {isCollapsed ? (
            <>
              <svg
                className="w-5 h-5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 0l-7 7 7 7"
                />
              </svg>
              <span className="text-xs font-semibold">Minimizar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
