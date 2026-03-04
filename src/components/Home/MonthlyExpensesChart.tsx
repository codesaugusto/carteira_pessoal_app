import { type JSX } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import type { Expense } from "../../types/expense";

interface MonthlyExpensesChartProps {
  expenses?: Expense[];
}

interface MonthData {
  month: string;
  total: number;
  count: number;
  date: Date;
  year: string;
}

// Processar despesas com datas para gráfico
const processExpensesData = (expenses: Expense[]): MonthData[] => {
  const monthlyMap: Map<string, MonthData> = new Map<string, MonthData>();

  expenses.forEach((expense: Expense): void => {
    // Se a despesa tiver data, usar; caso contrário, usar data atual
    const date: Date = expense.date ? new Date(expense.date) : new Date();
    const monthKey: string = date.toLocaleString("pt-BR", {
      month: "short",
      year: "numeric",
    });

    if (monthlyMap.has(monthKey)) {
      const month: MonthData = monthlyMap.get(monthKey)!;
      month.total += expense.amount;
      month.count += 1;
    } else {
      monthlyMap.set(monthKey, {
        month: `${date.toLocaleString("pt-BR", { month: "short" })}/${date.getFullYear().toString().slice(-2)}`,
        total: expense.amount,
        count: 1,
        date: new Date(date.getFullYear(), date.getMonth(), 1),
        year: date.getFullYear().toString(),
      });
    }
  });

  // Converter para array e ordenar
  const result: MonthData[] = Array.from(monthlyMap.values());
  result.sort(
    (a: MonthData, b: MonthData): number => a.date.getTime() - b.date.getTime(),
  );
  return result;
};

export const MonthlyExpensesChart = ({
  expenses = [],
}: MonthlyExpensesChartProps): JSX.Element => {
  const allMonthlyData: MonthData[] =
    expenses.length > 0
      ? processExpensesData(expenses)
      : getExampleMonthlyData();

  // Extrair anos únicos
  const uniqueYears: number[] = Array.from(
    new Set(allMonthlyData.map((m: MonthData): number => m.date.getFullYear())),
  ).sort((a: number, b: number): number => a - b);

  const minYear: number = uniqueYears[0] || new Date().getFullYear();
  const maxYear: number =
    uniqueYears[uniqueYears.length - 1] || new Date().getFullYear();

  // Estados para filtro de anos
  const [startYear, setStartYear] = useState<number>(minYear);
  const [endYear, setEndYear] = useState<number>(maxYear);

  // Filtrar dados por intervalo de anos
  const monthlyData: MonthData[] = allMonthlyData.filter(
    (month): month is MonthData => {
      const year: number = month.date.getFullYear();
      return year >= startYear && year <= endYear;
    },
  );

  const totalExpenses: number = monthlyData.reduce(
    (sum: number, month: MonthData): number => sum + month.total,
    0,
  );
  const averageMonthly: number =
    monthlyData.length > 0 ? totalExpenses / monthlyData.length : 0;
  const totalCount: number = monthlyData.reduce(
    (sum: number, month: MonthData): number => sum + month.count,
    0,
  );
  const highestMonth: MonthData = monthlyData.reduce(
    (max: MonthData, month: MonthData): MonthData =>
      month.total > max.total ? month : max,
  );

  return (
    <div className="w-full bg-gradient-to-br bg-gray-800/50 rounded-2xl p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Gastos Mensais</h2>
        <p className="text-sm text-slate-400">
          Acompanhe seus gastos ao longo dos meses
        </p>

        {/* Filtro de Anos */}
        <div className="flex gap-4 mt-4 items-end">
          <div>
            <label className="block text-xs text-slate-400 mb-2">
              De (ano):
            </label>
            <div className="relative">
              <select
                value={startYear as number}
                onChange={(e) => setStartYear(parseInt(e.target.value))}
                className="appearance-none bg-gray-700 text-white px-3 pr-10 py-2 rounded-lg border border-gray-600 text-sm focus:outline-none focus:border-green-500"
              >
                {uniqueYears.map((year) => (
                  <option key={year as number} value={year as number}>
                    {year as number}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-200"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M6 8l4 4 4-4"
                  strokeWidth={1.85}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-2">
              Até (ano):
            </label>
            <div className="relative">
              <select
                value={endYear as number}
                onChange={(e) => setEndYear(parseInt(e.target.value))}
                className="appearance-none bg-gray-700 text-white px-3 pr-10 py-2 rounded-lg border border-gray-600 text-sm focus:outline-none focus:border-green-500"
              >
                {uniqueYears.map((year) => (
                  <option key={year as number} value={year as number}>
                    {year as number}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-200"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M6 8l4 4 4-4"
                  strokeWidth={1.85}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={monthlyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#94a3b8" }}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#94a3b8" }}
              domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}
              label={{ value: "R$", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              formatter={(value) => `R$ ${(value as number).toFixed(2)}`}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
              labelStyle={{ color: "#94a3b8" }}
              cursor={{ fill: "rgba(34, 197, 94, 0.1)" }}
            />
            <Bar
              dataKey="total"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4">
          <p className="text-xs text-slate-400 mb-1">Total no período</p>
          <p className="text-lg font-bold text-white">
            R$ {totalExpenses.toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4">
          <p className="text-xs text-slate-400 mb-1">Média mensal</p>
          <p className="text-lg font-bold text-white">
            R$ {averageMonthly.toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4">
          <p className="text-xs text-slate-400 mb-1">Total de despesas</p>
          <p className="text-lg font-bold text-white">{totalCount}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4">
          <p className="text-xs text-slate-400 mb-1">Mês com maior gasto</p>
          <p className="text-lg font-bold text-white">
            R$ {highestMonth.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpensesChart;
function getExampleMonthlyData(): MonthData[] {
  throw new Error("Function not implemented.");
}
