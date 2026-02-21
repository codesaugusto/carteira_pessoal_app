import "./index.css";
import { useState } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import BottomNav from "./components/BottomNav/BottomNav";
import Categorias from "./components/Categorias/Categoria";
import Carteira from "./components/Carteira/Carteira";

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <Home />;
      case 1:
        return <Categorias />;
      case 2:
        return <Carteira />;
      case 3:
        return <div className="text-white p-6">Configurações</div>;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      {renderPage()}
      <BottomNav onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
