import { useState, useRef } from "react";
import { ChevronLeft, Download, Upload } from "lucide-react";
import * as XLSX from "xlsx";
import {
  BULK_IMPORT_CATEGORIES,
  BULK_IMPORT_WALLETS,
} from "../../constants/expenses";

interface BulkImportData {
  nome: string;
  valor: number;
  categoria: string;
  carteira: string;
  descricao?: string;
  data?: string;
}

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (expenses: BulkImportData[]) => void;
}

interface XLSXRow {
  nome?: string;
  valor?: number;
  categoria?: string;
  carteira?: string;
  descricao?: string;
  data?: string;
}

const categoriesList: string[] = [...BULK_IMPORT_CATEGORIES];
const walletsList: string[] = [...BULK_IMPORT_WALLETS];

const generateXLSXTemplate = () => {
  const exampleData = [
    {
      nome: "Café",
      valor: 4.5,
      categoria: "Alimentação",
      carteira: "Principal/Débito",
      descricao: "Dolce Café",
      data: "2026-02-26",
    },
    {
      nome: "Uber",
      valor: 35.0,
      categoria: "Transporte",
      carteira: "Nubank/Crédito",
      descricao: "Ida para o trabalho",
      data: "2026-02-26",
    },
    {
      nome: "Supermercado",
      valor: 150.0,
      categoria: "Compras",
      carteira: "Principal/Débito",
      descricao: "Compras semanais",
      data: "2026-02-25",
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(exampleData);
  worksheet["!cols"] = [
    { wch: 20 },
    { wch: 12 },
    { wch: 15 },
    { wch: 20 },
    { wch: 20 },
    { wch: 12 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Despesas");
  return workbook;
};

const downloadXLSXTemplate = () => {
  const workbook = generateXLSXTemplate();
  XLSX.writeFile(workbook, "modelo_importacao_despesas.xlsx");
};

const parseXLSX = (arrayBuffer: ArrayBuffer): BulkImportData[] => {
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<XLSXRow>(firstSheet);
  const data: BulkImportData[] = [];

  rows.forEach((row: XLSXRow) => {
    const expense: BulkImportData = {
      nome: row.nome?.toString().trim() || "",
      valor: parseFloat(row.valor?.toString() || "0") || 0,
      categoria: row.categoria?.toString().trim() || "",
      carteira: row.carteira?.toString().trim() || "",
      descricao: row.descricao?.toString().trim() || "",
      data: row.data?.toString().trim() || "",
    };

    if (
      expense.nome &&
      expense.valor > 0 &&
      expense.categoria &&
      expense.carteira
    ) {
      data.push(expense);
    }
  });

  return data;
};

export const BulkImportModal = ({
  isOpen,
  onClose,
  onImport,
}: BulkImportModalProps) => {
  const [importedData, setImportedData] = useState<BulkImportData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const data = parseXLSX(arrayBuffer);

        if (data.length === 0) {
          setErrors([
            "Nenhuma linha válida encontrada no arquivo. Verifique o formato.",
          ]);
          setImportedData([]);
          return;
        }

        setImportedData(data);
        setErrors([]);
        setSuccessMessage(`${data.length} despesa(s) pronta(s) para importar`);
      } catch {
        setErrors([
          "Erro ao processar o arquivo. Verifique se é um XLSX válido.",
        ]);
        setImportedData([]);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleImport = () => {
    if (importedData.length === 0) {
      setErrors(["Nenhuma despesa para importar."]);
      return;
    }

    const invalidRows: string[] = [];

    importedData.forEach((item, index) => {
      if (!categoriesList.includes(item.categoria)) {
        invalidRows.push(
          `Linha ${index + 2}: categoria inválida "${item.categoria}"`,
        );
      }
      if (!walletsList.includes(item.carteira)) {
        invalidRows.push(
          `Linha ${index + 2}: carteira inválida "${item.carteira}"`,
        );
      }
    });

    if (invalidRows.length > 0) {
      setErrors(invalidRows);
      return;
    }

    onImport(importedData);
    setImportedData([]);
    setErrors([]);
    setSuccessMessage("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end lg:items-center justify-center z-50">
      <div className="bg-gray-900 w-full lg:w-2/3 lg:max-w-2xl rounded-t-3xl lg:rounded-3xl p-6 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 lg:slide-in-from-center">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">
            Importar Despesas em Lote
          </h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-blue-400 text-sm">
            <strong>Como funciona:</strong> Prepare um arquivo XLSX com as
            colunas:
            <span className="block mt-2 font-mono text-xs">
              nome, valor, categoria, carteira, descricao (opcional), data
              (opcional)
            </span>
          </p>
        </div>

        <button
          onClick={downloadXLSXTemplate}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mb-6"
        >
          <Download className="w-5 h-5" />
          Baixar Modelo
        </button>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            Selecione seu arquivo XLSX
          </label>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-green-500/40 rounded-lg p-8 text-center hover:border-green-500/70 hover:bg-green-500/5 transition cursor-pointer"
          >
            <Upload className="w-10 h-10 text-green-500/60 mx-auto mb-3" />
            <p className="text-gray-300 font-medium mb-1">
              Clique para selecionar
            </p>
            <p className="text-gray-500 text-sm">ou arraste o arquivo aqui</p>
            <p className="text-gray-600 text-xs mt-2">
              Máximo 10MB • Formato XLSX
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {importedData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Pré-visualização ({importedData.length} registros)
            </h3>

            <div className="bg-gray-800/50 rounded-lg overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-800 text-gray-300 border-b border-gray-700">
                  <tr>
                    <th className="p-3">Nome</th>
                    <th className="p-3">Valor</th>
                    <th className="p-3">Categoria</th>
                    <th className="p-3">Carteira</th>
                  </tr>
                </thead>
                <tbody>
                  {importedData.slice(0, 5).map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="p-3 text-gray-300">{item.nome}</td>
                      <td className="p-3 text-green-400 font-semibold">
                        R$ {item.valor.toFixed(2)}
                      </td>
                      <td className="p-3 text-gray-300">{item.categoria}</td>
                      <td className="p-3 text-gray-300">{item.carteira}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {importedData.length > 5 && (
              <p className="text-gray-500 text-sm mt-2">
                ... e mais {importedData.length - 5} registros
              </p>
            )}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
            <p className="text-green-400 text-sm">{successMessage}</p>
          </div>
        )}

        {errors.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
            <p className="text-red-400 font-semibold mb-2">
              Erros encontrados:
            </p>
            <ul className="list-disc list-inside text-red-400 text-sm space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleImport}
            disabled={importedData.length === 0}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all"
          >
            Importar ({importedData.length})
          </button>
        </div>
      </div>
    </div>
  );
};
