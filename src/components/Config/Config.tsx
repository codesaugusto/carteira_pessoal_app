import { useState } from "react";
import ConfigMenu from "./ConfigMenu";
import MeuPerfil from "../../pages/MeuPerfil";
import EditProfile from "../../pages/EditProfile";
import { ChevronLeft } from "lucide-react";

type ConfigPage =
  | "menu"
  | "perfil"
  | "editar-perfil"
  | "notificacoes"
  | "idioma"
  | "tema"
  | "privacidade";

// Placeholder components
const PlaceholderPage = ({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) => (
  <div className="p-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-green-500 mb-6 hover:opacity-80 transition"
    >
      <ChevronLeft className="w-5 h-5" />
      <span className="text-sm font-medium">Voltar</span>
    </button>
    <h1 className="text-3xl font-bold text-white">{title}</h1>
    <p className="text-gray-400 mt-4">Em desenvolvimento...</p>
  </div>
);

interface ConfigProps {
  initialPage?: ConfigPage;
}

const Config = ({ initialPage = "menu" }: ConfigProps) => {
  const [currentPage, setCurrentPage] = useState<ConfigPage>(initialPage);
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
    purchases: true,
    limits: true,
    subscriptions: true,
    sound: true,
    vibration: true,
  });

  const renderPage = () => {
    switch (currentPage) {
      case "perfil":
        return (
          <MeuPerfil
            onBack={() => setCurrentPage("menu")}
            onEdit={() => setCurrentPage("editar-perfil")}
          />
        );
      case "editar-perfil":
        return <EditProfile onBack={() => setCurrentPage("perfil")} />;
      case "notificacoes":
        return (
          <div className="p-6 pb-26">
            <button
              onClick={() => setCurrentPage("menu")}
              className="flex items-center gap-2 text-green-500 mb-6 hover:opacity-80 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Voltar</span>
            </button>
            <h1 className="text-3xl font-bold text-white mb-2">Notificações</h1>
            <p className="text-gray-400 text-sm mb-6">
              Configure como deseja receber notificações
            </p>

            <div className="space-y-4">
              {/* Ativar/Desativar Notificações */}
              <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">
                    Todas as Notificações
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Ativar ou desativar todas as notificações
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotificationSettings({
                      ...notificationSettings,
                      enabled: !notificationSettings.enabled,
                    })
                  }
                  className={`w-12 h-8 rounded-full transition ${
                    notificationSettings.enabled
                      ? "bg-green-500"
                      : "bg-gray-600"
                  } flex items-center ${
                    notificationSettings.enabled
                      ? "justify-end"
                      : "justify-start"
                  } p-1`}
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </button>
              </div>

              {/* Notificações de Compras */}
              <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Compras</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Notificações de novas compras
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotificationSettings({
                      ...notificationSettings,
                      purchases: !notificationSettings.purchases,
                    })
                  }
                  className={`w-12 h-8 rounded-full transition ${
                    notificationSettings.purchases
                      ? "bg-green-500"
                      : "bg-gray-600"
                  } flex items-center ${
                    notificationSettings.purchases
                      ? "justify-end"
                      : "justify-start"
                  } p-1`}
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </button>
              </div>

              {/* Notificações de Limites */}
              <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">
                    Limites de Gastos
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Alertas ao atingir limites de categoria
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotificationSettings({
                      ...notificationSettings,
                      limits: !notificationSettings.limits,
                    })
                  }
                  className={`w-12 h-8 rounded-full transition ${
                    notificationSettings.limits ? "bg-green-500" : "bg-gray-600"
                  } flex items-center ${
                    notificationSettings.limits
                      ? "justify-end"
                      : "justify-start"
                  } p-1`}
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </button>
              </div>

              {/* Notificações de Assinaturas */}
              <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Assinaturas</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Lembretes de assinaturas vencendo
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotificationSettings({
                      ...notificationSettings,
                      subscriptions: !notificationSettings.subscriptions,
                    })
                  }
                  className={`w-12 h-8 rounded-full transition ${
                    notificationSettings.subscriptions
                      ? "bg-green-500"
                      : "bg-gray-600"
                  } flex items-center ${
                    notificationSettings.subscriptions
                      ? "justify-end"
                      : "justify-start"
                  } p-1`}
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </button>
              </div>

              {/* Som */}
              <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Som</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Reproduzir som nas notificações
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotificationSettings({
                      ...notificationSettings,
                      sound: !notificationSettings.sound,
                    })
                  }
                  className={`w-12 h-8 rounded-full transition ${
                    notificationSettings.sound ? "bg-green-500" : "bg-gray-600"
                  } flex items-center ${
                    notificationSettings.sound ? "justify-end" : "justify-start"
                  } p-1`}
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </button>
              </div>

              {/* Vibração */}
              <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Vibração</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Vibração nas notificações
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotificationSettings({
                      ...notificationSettings,
                      vibration: !notificationSettings.vibration,
                    })
                  }
                  className={`w-12 h-8 rounded-full transition ${
                    notificationSettings.vibration
                      ? "bg-green-500"
                      : "bg-gray-600"
                  } flex items-center ${
                    notificationSettings.vibration
                      ? "justify-end"
                      : "justify-start"
                  } p-1`}
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </button>
              </div>
            </div>
          </div>
        );
      case "idioma":
        return (
          <PlaceholderPage
            title="Idioma e Moeda"
            onBack={() => setCurrentPage("menu")}
          />
        );
      case "tema":
        return (
          <PlaceholderPage title="Tema" onBack={() => setCurrentPage("menu")} />
        );
      case "privacidade":
        return (
          <PlaceholderPage
            title="Privacidade"
            onBack={() => setCurrentPage("menu")}
          />
        );
      default:
        return (
          <ConfigMenu
            onNavigate={(page) => setCurrentPage(page as ConfigPage)}
          />
        );
    }
  };

  return <div className="min-h-screen bg-gray-950">{renderPage()}</div>;
};

export default Config;
