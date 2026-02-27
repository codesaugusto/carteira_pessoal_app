export interface Expense {
  id: number;
  name: string;
  description: string;
  amount: number;
  category?: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  date?: Date;
}
