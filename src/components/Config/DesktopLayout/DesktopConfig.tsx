import { useState } from "react";
import MeuPerfil from "../../../pages/MeuPerfil";
import EditProfile from "../../../pages/EditProfile";
import {
  ChevronLeft,
  User,
  Bell,
  Globe,
  Moon,
  Lock,
  LogOut,
} from "lucide-react";

type ConfigPage =
  | "menu"
  | "perfil"
  | "editar-perfil"
  | "notificacoes"
  | "idioma"
  | "tema"
  | "privacidade";

const PlaceholderPage = ({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) => (
  <div className="p-8">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-green-500 mb-8 hover:opacity-80 transition"
    >
      <ChevronLeft className="w-5 h-5" />
      <span className="text-sm font-medium">Voltar</span>
    </button>
    <h1 className="text-4xl font-bold text-white">{title}</h1>
    <p className="text-gray-400 mt-4">Em desenvolvimento...</p>
  </div>
);

interface DesktopConfigProps {
  initialPage?: ConfigPage;
}

const DesktopConfig = ({ initialPage = "menu" }: DesktopConfigProps) => {
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
          <div className="p-8 pb-8">
            <button
              onClick={() => setCurrentPage("menu")}
              className="flex items-center gap-2 text-green-500 mb-8 hover:opacity-80 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Voltar</span>
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">Notificações</h1>
            <p className="text-gray-400 text-sm mb-8">
              Configure como deseja receber notificações
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg">
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

              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg">Compras</h3>
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

              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Limites de Gastos
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 pr-2">
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

              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Assinaturas
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 pr-5">
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

              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg">Som</h3>
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

              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg">Vibração</h3>
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
          <div className="px-5 py-8 w-5xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white">Configurações</h1>
                <p className="text-gray-400 text-sm mt-2">
                  Gerencie suas preferências e perfil
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <button
                onClick={() => setCurrentPage("perfil")}
                className="flex items-center gap-3 p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:bg-gray-800/60 transition group"
              >
                <User className="w-6 h-6 text-green-500 group-hover:scale-110 transition" />
                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold text-base">
                    Meu Perfil
                  </h3>
                  <p className="text-gray-400 text-xs">
                    Ver e editar informações pessoais
                  </p>
                </div>
              </button>

              <button
                onClick={() => setCurrentPage("notificacoes")}
                className="flex items-center gap-3 p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:bg-gray-800/60 transition group"
              >
                <Bell className="w-6 h-6 text-green-500 group-hover:scale-110 transition" />
                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold text-base">
                    Notificações
                  </h3>
                  <p className="text-gray-400 text-xs">
                    Controle como recebe alertas
                  </p>
                </div>
              </button>

              <button
                onClick={() => setCurrentPage("idioma")}
                className="flex items-center gap-3 p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:bg-gray-800/60 transition group"
              >
                <Globe className="w-6 h-6 text-green-500 group-hover:scale-110 transition" />
                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold text-base">
                    Idioma e Moeda
                  </h3>
                  <p className="text-gray-400 text-xs">
                    Escolha seu idioma preferido
                  </p>
                </div>
              </button>

              <button
                onClick={() => setCurrentPage("tema")}
                className="flex items-center gap-3 p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:bg-gray-800/60 transition group"
              >
                <Moon className="w-6 h-6 text-green-500 group-hover:scale-110 transition" />
                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold text-base">Tema</h3>
                  <p className="text-gray-400 text-xs">
                    Customize a aparência do app
                  </p>
                </div>
              </button>

              <button
                onClick={() => setCurrentPage("privacidade")}
                className="flex items-center gap-3 p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:bg-gray-800/60 transition group"
              >
                <Lock className="w-6 h-6 text-green-500 group-hover:scale-110 transition" />
                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold text-base">
                    Privacidade
                  </h3>
                  <p className="text-gray-400 text-xs">
                    Controle suas permissões e dados
                  </p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 bg-red-500/10 rounded-xl border border-red-500/30 hover:bg-red-500/20 transition group">
                <LogOut className="w-6 h-6 text-red-500 group-hover:scale-110 transition" />
                <div className="flex-1 text-left">
                  <h3 className="text-red-500 font-semibold text-base">Sair</h3>
                  <p className="text-red-400/70 text-xs">Encerrar sua sessão</p>
                </div>
              </button>
            </div>

            <p className="text-center flex items-start text-gray-600 mt-8 text-xs">
              MY WALLET V2.4.0
            </p>
          </div>
        );
    }
  };

  return <div className="min-h-screen bg-gray-950">{renderPage()}</div>;
};

export default DesktopConfig;
