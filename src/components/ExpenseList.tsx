import { ExpenseListItem } from "./ExpenseListItem";
import { useEffect, useState } from "react";
import { getExpenses } from "@/lib/api";
import { Loader } from "./ui/loader";
import type { Expense } from "@/types/expenses";

export const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error loading expenses: {error.message}</p>;
  }

  if (expenses.length === 0) {
    return <p>No expenses found</p>;
  }

  return (
    <div className="content-container">
      <div className="list-header">
        <div className="show-for-mobile">Expenses</div>
        <div className="show-for-desktop">Expense</div>
        <div className="show-for-desktop">Amount</div>
      </div>
      {expenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseListItem key={expense.id} {...expense} />
        ))
      )}
    </div>
  );
};

export default ExpenseList;
