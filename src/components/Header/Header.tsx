const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 py-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-300 to-orange-200 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-orange-400/40"></div>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Olá,</p>

          {/* NOME DA PESSOA AQUI */}
          <p className="text-white text-xl font-semibold">Carlos Augusto</p>
        </div>
      </div>
      <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center">
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
        </svg>
      </div>
    </div>
  );
};

export default Header;
