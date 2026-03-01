import { useState } from "react";
import type { Meta } from "../../data/metasData";
import { DEFAULT_METAS } from "../../data/metasData";
import { MetaCard } from "./MetaCard";

// interface MetasProps {
//   onNavigate?: (index: number) => void;
// }

const Metas = () => {
  const [metas] = useState<Meta[]>(DEFAULT_METAS);
  const [selectedMeta, setSelectedMeta] = useState<Meta | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const totalGoal = metas.reduce((acc, meta) => acc + meta.targetAmount, 0);
  const totalSaved = metas.reduce((acc, meta) => acc + meta.currentAmount, 0);
  const overallPercentage = Math.round((totalSaved / totalGoal) * 100);

  return (
    <div className="min-h-screen bg-gray-950 font-poppins">
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="p-6 md:p-5">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl md:text-2xl font-bold text-white mb-2">
                Metas Financeiras
              </h1>
              <p className="text-gray-400 text-sm md:text-xs">
                Gerencie e acompanhe seus objetivos de longo prazo
              </p>
            </div>
            <button className="flex items-center cursor-pointer md:active:scale-95 gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nova Meta
            </button>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm">
              <p className="text-gray-400 text-sm mb-2">Total em Metas</p>
              <h2 className="text-2xl font-bold text-white">
                R${totalGoal.toLocaleString()}
              </h2>
              <p className="text-gray-500 text-xs mt-2">
                {metas.length} objetivos ativos
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm">
              <p className="text-gray-400 text-sm mb-2">Valor Acumulado</p>
              <h2 className="text-2xl font-bold text-green-500">
                R${totalSaved.toLocaleString()}
              </h2>
              <p className="text-gray-500 text-xs mt-2">
                {overallPercentage}% do total
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm">
              <p className="text-gray-400 text-sm mb-2">Ainda faltam</p>
              <h2 className="text-2xl font-bold text-orange-500">
                R${(totalGoal - totalSaved).toLocaleString()}
              </h2>
              <p className="text-gray-500 text-xs mt-2">
                Para completar todas as metas
              </p>
            </div>
          </div>

          {/* Metas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Meta Cards */}
            {metas.map((meta) => (
              <MetaCard
                key={meta.id}
                meta={meta}
                onClick={() => {
                  setSelectedMeta(meta);
                  setIsDetailOpen(true);
                }}
              />
            ))}

            {/* Add New Meta Card */}
            <button className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gray-800/30 border-2 border-dashed border-gray-600 hover:border-green-500 transition-all duration-300 hover:bg-gray-800/50 h-72 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-500/20 transition-colors">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold">
                  Criar Novo Objetivo
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  Defina o que é importante para você
                </p>
              </div>
            </button>
          </div>

          {/* Detail Modal - Simple version */}
          {isDetailOpen && selectedMeta && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 rounded-2xl max-w-2xl w-full border border-gray-800 overflow-hidden">
                {/* Modal Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={selectedMeta.image}
                    alt={selectedMeta.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {selectedMeta.title}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Previsão: {selectedMeta.targetDate}
                      </p>
                    </div>
                    <span
                      className={`${selectedMeta.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}
                    >
                      {selectedMeta.badge}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6">
                    {selectedMeta.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Progresso</span>
                      <span className="text-green-500 font-bold">
                        {Math.round(
                          (selectedMeta.currentAmount /
                            selectedMeta.targetAmount) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-400 rounded-full h-3 transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            (selectedMeta.currentAmount /
                              selectedMeta.targetAmount) *
                              100,
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Values */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-gray-400 text-xs mb-1">Acumulado</p>
                      <p className="text-green-500 text-lg font-bold">
                        R${selectedMeta.currentAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-gray-400 text-xs mb-1">Meta</p>
                      <p className="text-white text-lg font-bold">
                        R${selectedMeta.targetAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-gray-400 text-xs mb-1">Faltam</p>
                      <p className="text-orange-500 text-lg font-bold">
                        R$
                        {(
                          selectedMeta.targetAmount - selectedMeta.currentAmount
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors">
                      Adicionar Valor
                    </button>
                    <button
                      onClick={() => setIsDetailOpen(false)}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Metas;
