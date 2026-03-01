import { useEffect } from "react";
import { animateNavIcon, initializeNavAnimation } from "../../utils/util";
import { useOnNavigate } from "../../contexts/navigate";

const BottomNav = () => {
  const onNavigate = useOnNavigate();

  useEffect(() => {
    initializeNavAnimation();
  }, []);

  const handleNavClick = (index: number) => {
    animateNavIcon(index);
    onNavigate?.(index);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <div className="grid grid-cols-4 h-20">
        {/* Home */}
        <button
          className="nav-button flex flex-col items-center justify-center gap-1"
          onClick={() => handleNavClick(0)}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="text-xs font-medium">HOME</span>
        </button>

        {/* Categorias */}
        <button
          className="nav-button flex flex-col items-center justify-center gap-1"
          onClick={() => handleNavClick(1)}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
          </svg>
          <span className="text-xs font-medium">CATEGORIAS</span>
        </button>

        {/* Carteira */}
        <button
          className="nav-button flex flex-col items-center justify-center gap-1"
          onClick={() => handleNavClick(2)}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
          <span className="text-xs font-medium">CARTEIRA</span>
        </button>

        {/* Configurações */}
        <button
          className="nav-button flex flex-col items-center justify-center gap-1"
          onClick={() => handleNavClick(3)}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
          <span className="text-xs font-medium">CONFIG</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
