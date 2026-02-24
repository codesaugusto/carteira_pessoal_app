import { ChevronLeft, Edit2 } from "lucide-react";
import Avatar from "../components/Avatar/Avatar";

interface PageProps {
  onBack: () => void;
  onEdit: () => void;
}

const MeuPerfil = ({ onBack, onEdit }: PageProps) => {
  return (
    <div className="pb-24 font-poppins">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-green-500 mb-6 hover:opacity-80 transition"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Voltar</span>
        </button>
        <h1 className="text-3xl font-bold text-white">Meu Perfil</h1>
      </div>

      {/* Profile Card */}
      <div className="px-6 py-8">
        <div className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700/50">
          {/* Avatar and Name */}
          <div className="flex items-center gap-4 mb-6">
            <Avatar alt="Carlos Augusto" fallback="CA" size="xl" />
            <div>
              <p className="text-gray-400 text-sm">Usuário</p>
              <p className="text-white text-2xl font-bold">Carlos Augusto</p>
              <p className="text-gray-400 text-sm mt-1">
                carlos.augusto@email.com
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-700/50 mb-6" />

          {/* Info Section */}
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-2">
                Nome Completo
              </p>
              <p className="text-white font-medium">Carlos Augusto Silva</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-2">
                Email
              </p>
              <p className="text-white font-medium">carlos.augusto@email.com</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-2">
                Telefone
              </p>
              <p className="text-white font-medium">(11) 9 9999-9999</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-2">
                Membro desde
              </p>
              <p className="text-white font-medium">24 de Fevereiro de 2026</p>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={onEdit}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeuPerfil;
