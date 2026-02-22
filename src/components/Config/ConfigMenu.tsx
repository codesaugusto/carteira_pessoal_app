import { User, Bell, Globe, Moon, Lock, LogOut } from "lucide-react";

interface ConfigMenuProps {
  onNavigate: (page: string) => void;
}

const ConfigMenu = ({ onNavigate }: ConfigMenuProps) => {
  const menuItems = [
    { icon: User, label: "Meu Perfil", id: "perfil" },
    { icon: Bell, label: "Notificações", id: "notificacoes" },
    { icon: Globe, label: "Idioma e Moeda", id: "idioma" },
    { icon: Moon, label: "Tema", id: "tema" },
    { icon: Lock, label: "Privacidade", id: "privacidade" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Configurações</h1>

      {/* Perfil do usuário */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-orange-300 rounded-3xl mx-auto mb-4 flex items-center justify-center">
          <span className="text-4xl">👤</span>
        </div>
        <h2 className="text-2xl font-bold text-white">Alex Johnson</h2>
        <p className="text-gray-400">alex.johnson@example.com</p>
      </div>

      {/* Menu de opções */}
      <div className="space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="w-full flex items-center gap-4 p-4 bg-gray-900 rounded-2xl text-white hover:bg-gray-800 transition"
          >
            <item.icon className="w-6 h-6 text-green-500" />
            <span className="text-lg font-semibold flex-1 text-left">
              {item.label}
            </span>
            <span className="text-gray-500">›</span>
          </button>
        ))}

        {/* Botão Sair */}
        <button className="w-full flex items-center gap-4 p-4 bg-gray-900 rounded-2xl text-red-500 hover:bg-gray-800 transition mt-8">
          <LogOut className="w-6 h-6" />
          <span className="text-lg font-semibold flex-1 text-left">Sair</span>
          <span className="text-gray-500">›</span>
        </button>
      </div>

      <p className="text-center text-gray-600 mt-12 text-sm">
        MY WALLET V2.4.0
      </p>
    </div>
  );
};

export default ConfigMenu;
