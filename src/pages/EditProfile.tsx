import { useState, useRef } from "react";
import { Upload, Save, Camera } from "lucide-react";
import Avatar from "../components/Avatar/Avatar";
import { useNotifications } from "../hooks/notifications";

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  fallback: string;
}

interface EditProfileProps {
  onBack: () => void;
}

const EditProfile = ({ onBack }: EditProfileProps) => {
  const { addNotification } = useNotifications();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado do usuário - inicialmente com dados padrão
  const [profile, setProfile] = useState<UserProfile>({
    name: "Carlos Augusto",
    email: "carlos.augusto@email.com",
    avatar: undefined,
    fallback: "CA",
  });

  // Rastrear mudanças não salvas
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>();

  // Manipular upload de imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      addNotification(
        "Arquivo muito grande",
        "A imagem não pode ter mais de 5MB",
        "error",
      );
      return;
    }

    // Validar tipo
    if (!file.type.startsWith("image/")) {
      addNotification("Tipo inválido", "Selecione uma imagem válida", "error");
      return;
    }

    // Criar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setPreviewImage(imageUrl);
      setProfile((prev) => ({ ...prev, avatar: imageUrl }));
      setUnsavedChanges(true);
    };
    reader.readAsDataURL(file);

    addNotification(
      "Imagem selecionada",
      "Clique em Salvar para confirmar",
      "info",
    );
  };

  // Manipular mudança de nome
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setProfile((prev) => ({
      ...prev,
      name: newName,
      fallback: newName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    }));
    setUnsavedChanges(true);
  };

  // Salvar perfil
  const handleSaveProfile = async () => {
    if (!profile.name.trim()) {
      addNotification("Nome vazio", "Digite um nome para continuar", "warning");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Integrar com backend
      // Exemplo de estrutura para o backend:
      // const formData = new FormData();
      // formData.append('name', profile.name);
      // if (previewImage) formData.append('avatar', previewImage);
      // const response = await fetch('/api/profile/update', {
      //   method: 'PUT',
      //   body: formData
      // });

      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addNotification(
        "Perfil atualizado!",
        "Suas alterações foram salvas com sucesso",
        "success",
      );
      setUnsavedChanges(false);
      setPreviewImage(undefined);

      // TODO: Enviar para backend aqui
      console.log("Dados a salvar:", {
        name: profile.name,
        email: profile.email,
        avatar: previewImage || profile.avatar,
      });
    } catch (error) {
      addNotification(
        "Erro ao salvar",
        "Ocorreu um erro ao salvar o perfil",
        "error",
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Descartar mudanças
  const handleDiscard = () => {
    setProfile({
      name: "Carlos Augusto",
      email: "carlos.augusto@email.com",
      avatar: undefined,
      fallback: "CA",
    });
    setPreviewImage(undefined);
    setUnsavedChanges(false);
    addNotification(
      "Alterações descartadas",
      "Voltando ao perfil original",
      "info",
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-gray-950 border-b border-gray-800 px-6 py-4 z-10">
        <h1 className="text-2xl font-bold text-white">Editar Perfil</h1>
        <p className="text-gray-400 text-sm mt-1">
          {unsavedChanges
            ? "Você tem alterações não salvas"
            : "Gerencie suas informações"}
        </p>
      </div>

      {/* Conteúdo */}
      <div className="px-6 py-8 space-y-8">
        {/* Seção de Avatar */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Foto de Perfil</h2>
          <div className="flex flex-col items-center gap-6">
            {/* Avatar atual ou preview */}
            <div className="relative">
              <Avatar
                src={previewImage || profile.avatar}
                alt={profile.name}
                fallback={profile.fallback}
                size="xxl"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-600 rounded-full p-3 transition shadow-lg"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Input invisível */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Botão para upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
            >
              <Upload className="w-4 h-4" />
              <span>Escolher Imagem</span>
            </button>

            <p className="text-gray-400 text-xs text-center">
              Formatos aceitos: JPG, PNG, GIF (máx. 5MB)
            </p>

            {previewImage && (
              <button
                onClick={() => {
                  setPreviewImage(undefined);
                  setProfile((prev) => ({ ...prev, avatar: undefined }));
                }}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remover imagem selecionada
              </button>
            )}
          </div>
        </div>

        {/* Divisor */}
        <div className="h-px bg-gray-800" />

        {/* Seção de Informações */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-white">
            Informações Pessoais
          </h2>

          {/* Nome */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Nome Completo
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={handleNameChange}
              placeholder="Digite seu nome"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <p className="text-xs text-gray-500">
              Seu nome será exibido na aplicação
            </p>
          </div>

          {/* Email (apenas leitura por enquanto) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500">
              Email não pode ser alterado por enquanto
            </p>
          </div>
        </div>

        {/* Divisor */}
        <div className="h-px bg-gray-800" />

        {/* Botões de Ação */}
        <div className="flex gap-3 pt-4">
          {unsavedChanges ? (
            <>
              <button
                onClick={handleDiscard}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition disabled:opacity-50"
              >
                Descartar
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </>
          ) : (
            <button
              onClick={onBack}
              className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition"
            >
              Voltar
            </button>
          )}
        </div>

        {/* Info do backend */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-blue-400 text-xs">
            <strong>Nota:</strong> O formulário está pronto para integração com
            backend. Os dados estão estruturados para serem enviados via API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
