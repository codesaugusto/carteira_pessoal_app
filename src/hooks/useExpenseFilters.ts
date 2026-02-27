import { useState, useMemo } from "react";
import type { Expense } from "../types/expense";
import { SORT_OPTIONS, DATE_FILTER_OPTIONS } from "../constants/expenses";

type SortOption = keyof typeof SORT_OPTIONS;
type DateFilter = keyof typeof DATE_FILTER_OPTIONS;

export const useExpenseFilters = (initialExpenses: Expense[]) => {
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [filterByCategory, setFilterByCategory] = useState<string>("all");
  const [filterByDate, setFilterByDate] = useState<DateFilter>("7days");
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtrar por termo de busca
  const searchedExpenses = useMemo(() => {
    if (!searchTerm.trim()) return initialExpenses;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return initialExpenses.filter(
      (exp) =>
        exp.name.toLowerCase().includes(lowerSearchTerm) ||
        exp.description?.toLowerCase().includes(lowerSearchTerm),
    );
  }, [initialExpenses, searchTerm]);

  // Filtrar por categoria
  const filteredByCategory = useMemo(() => {
    if (filterByCategory === "all") return searchedExpenses;
    return searchedExpenses.filter((exp) => exp.category === filterByCategory);
  }, [searchedExpenses, filterByCategory]);

  // Filtrar por data
  const filteredByDate = useMemo(() => {
    if (filteredByCategory.length === 0) return filteredByCategory;

    const hasDate = "date" in filteredByCategory[0];
    if (!hasDate) return filteredByCategory;

    const today = new Date();
    let startDate = new Date();

    switch (filterByDate) {
      case "7days": {
        startDate.setDate(today.getDate() - 7);
        break;
      }
      case "30days": {
        startDate.setDate(today.getDate() - 30);
        break;
      }
      case "custom": {
        if (!customStartDate || !customEndDate) return filteredByCategory;
        startDate = new Date(customStartDate);
        const endDate = new Date(customEndDate);
        return filteredByCategory.filter((exp) => {
          const dateStr = (exp as unknown as Record<string, string>).date;
          const expDate = new Date(dateStr);
          return expDate >= startDate && expDate <= endDate;
        });
      }
      default:
        break;
    }

    return filteredByCategory.filter((exp) => {
      const dateStr = (exp as unknown as Record<string, string>).date;
      const expDate = new Date(dateStr || "");
      return expDate >= startDate && expDate <= today;
    });
  }, [filteredByCategory, filterByDate, customStartDate, customEndDate]);

  // Ordenar
  const sortedExpenses = useMemo(() => {
    const expensesToSort = [...filteredByDate];

    switch (sortBy) {
      case "recent":
        return expensesToSort.sort((a, b) => b.id - a.id);
      case "oldest":
        return expensesToSort.sort((a, b) => a.id - b.id);
      case "highest":
        return expensesToSort.sort((a, b) => b.amount - a.amount);
      case "lowest":
        return expensesToSort.sort((a, b) => a.amount - b.amount);
      default:
        return expensesToSort;
    }
  }, [filteredByDate, sortBy]);

  return {
    // Estado
    sortBy,
    filterByCategory,
    filterByDate,
    customStartDate,
    customEndDate,
    searchTerm,

    // Estado setter
    setSortBy,
    setFilterByCategory,
    setFilterByDate,
    setCustomStartDate,
    setCustomEndDate,
    setSearchTerm,

    // Resultado
    sortedExpenses,
  };
};
