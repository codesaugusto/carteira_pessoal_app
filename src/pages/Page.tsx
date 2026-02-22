import { ChevronLeft } from "lucide-react";

interface PageProps {
  onBack: () => void;
}

const Page = ({ onBack }: PageProps) => {
  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-green-500 mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Voltar</span>
      </button>
      <h1 className="text-3xl font-bold text-white">Página</h1>
      <p className="text-gray-400 mt-4">Em desenvolvimento...</p>
    </div>
  );
};

export default Page;
