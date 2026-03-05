import "./index.css";
import { useState } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import BottomNav from "./components/BottomNav/BottomNav";
import Categorias from "./components/Categorias/Categoria";
import Carteira from "./components/Carteira/Carteira";
import Metas from "./components/Metas/Metas";
import Config from "./components/Config/Config";
import { DesktopSidebar } from "./components/Sidebar/DesktopSidebar";
import { NotificationProvider } from "./providers/notifications";
import { OnNavigateProvider } from "./contexts/navigate";
import { SidebarProvider, useSidebar } from "./contexts/sidebar";

interface AppContentProps {
  currentPage: number;
  onNavigate: (page: number) => void;
  configInitialPage: "menu" | "perfil" | "editar-perfil";
}

function AppContent({ currentPage, configInitialPage }: AppContentProps) {
  const { isCollapsed } = useSidebar();

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
    <div className="min-h-screen bg-gray-950">
      {/* Desktop Sidebar */}
      <DesktopSidebar currentPage={currentPage} />

      {/* Main Content */}
      <div
        className={`transition-all duration-400 overflow-y-auto max-h-[calc(100vh-1rem)] custom-scrollbar ${
          isCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <Header />
        <div className="pt-28">{renderPage()}</div>
      </div>

      {/* Mobile Bottom Nav - Hidden on md and above */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [configInitialPage] = useState<"menu" | "perfil" | "editar-perfil">(
    "menu",
  );

  return (
    <NotificationProvider>
      <OnNavigateProvider onNavigate={setCurrentPage}>
        <SidebarProvider>
          <AppContent
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            configInitialPage={configInitialPage}
          />
        </SidebarProvider>
      </OnNavigateProvider>
    </NotificationProvider>
  );
}

export default App;
