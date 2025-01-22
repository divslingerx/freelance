import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../features/expenses/expensesSlice";
import type { Expense } from "../features/expenses/expensesSlice";

const AddExpensePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (expense: Expense) => {
    dispatch(addExpense(expense));
    navigate("/");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Add Expense</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExpenseForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddExpensePage;
