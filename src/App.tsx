import "./index.css";
import { useState } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import BottomNav from "./components/BottomNav/BottomNav";
import Categorias from "./components/Categorias/Categoria";
import Carteira from "./components/Carteira/Carteira";
import Config from "./components/Config/Config";
import Metas from "./components/Metas/Metas";
import { DesktopSidebar } from "./components/Sidebar/DesktopSidebar";
import { NotificationProvider } from "./providers/notifications";
import { OnNavigateProvider } from "./contexts/navigate";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [configInitialPage] = useState<"menu" | "perfil" | "editar-perfil">(
    "menu",
  );

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <Home />;
      case 1:
        return <Categorias />;
      case 2:
        return <Carteira />;
      case 3:
        return <Metas />;
      case 4:
        return <Config initialPage={configInitialPage} />;
      default:
        return <Home />;
    }
  };

  return (
    <NotificationProvider>
      <OnNavigateProvider onNavigate={setCurrentPage}>
        <div className="min-h-screen bg-gray-950">
          {/* Desktop Sidebar */}
          <DesktopSidebar currentPage={currentPage} />

          {/* Main Content */}
          <div className="md:ml-64">
            <Header />
            {renderPage()}
          </div>

          {/* Mobile Bottom Nav - Hidden on md and above */}
          <div className="md:hidden">
            <BottomNav />
          </div>
        </div>
      </OnNavigateProvider>
    </NotificationProvider>
  );
}

export default App;
