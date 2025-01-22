import { useState, ChangeEvent, FormEvent } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Expense } from "@/features/expenses/expensesSlice";

interface ExpenseFormProps {
  expense?: Expense;
  onSubmit: (expense: Expense) => void;
}

export default function ExpenseForm({ expense, onSubmit }: ExpenseFormProps) {
  const [description, setDescription] = useState(expense?.description || "");
  const [note, setNote] = useState(expense?.note || "");
  const [amount, setAmount] = useState(
    expense ? (expense.amount / 100).toString() : ""
  );
  const [date, setDate] = useState(
    expense?.createdAt ? new Date(expense.createdAt) : new Date()
  );
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description || !amount) {
      setError("Please provide description and amount.");
      return;
    }

    setError("");
    onSubmit({
      id: expense?.id || "",
      description,
      amount: parseFloat(amount) * 100,
      createdAt: date.getTime(),
      note,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        className="w-full"
      />

      <Input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          if (!value || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setAmount(value);
          }
        }}
        className="w-full"
      />

      <Calendar
        mode="single"
        selected={date}
        onSelect={(date: Date | undefined) => date && setDate(date)}
        className="rounded-md border"
      />

      <Textarea
        placeholder="Add a note for your expense (optional)"
        value={note}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setNote(e.target.value)
        }
        className="w-full"
      />

      <Button type="submit" className="w-full">
        Save Expense
      </Button>
    </form>
  );
}
