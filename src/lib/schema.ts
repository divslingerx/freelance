export interface User {
  id: string;
  email: string;
  createdAt: number;
}

export interface Expense {
  id: string;
  userId: string;
  description: string;
  note?: string;
  amount: number;
  createdAt: number;
}
