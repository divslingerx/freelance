import { useAppSelector } from "@/store/hooks";
import { selectFilteredExpenses, selectExpensesTotal } from "@/selectors";
import { Link } from "react-router-dom";

export const ExpensesSummary = () => {
  const visibleExpenses = useAppSelector(selectFilteredExpenses);
  const expenseCount = visibleExpenses.length;
  const expensesTotal = useAppSelector(selectExpensesTotal);
  const expenseWord = expenseCount === 1 ? "expense" : "expenses";
  const formattedExpensesTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(expensesTotal / 100);

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> {expenseWord} totalling{" "}
          <span>{formattedExpensesTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExpensesSummary;
