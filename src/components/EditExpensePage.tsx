import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../features/expenses/expensesSlice";
import type { AppDispatch, RootState } from "../store/store";
import type { Expense } from "../features/expenses/expensesSlice";
import { Button } from "./ui/button";

const EditExpensePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const expense = useSelector((state: RootState) =>
    state.expenses.expenses.find((expense) => expense.id === id)
  );

  if (!expense) {
    return <div>Expense not found</div>;
  }

  const handleSubmit = (updatedExpense: Expense) => {
    dispatch(editExpense({ id: expense.id, updates: updatedExpense }));
    navigate("/");
  };

  const handleRemove = () => {
    dispatch(removeExpense(expense.id));
    navigate("/");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Edit Expense</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <ExpenseForm expense={expense} onSubmit={handleSubmit} />
        <Button variant="destructive" onClick={handleRemove}>
          Remove Expense
        </Button>
      </div>
    </div>
  );
};

export default EditExpensePage;
