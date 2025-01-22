import { Link } from "react-router-dom";
import { format } from "date-fns";

interface ExpenseListItemProps {
  id: string;
  description: string;
  amount: number;
  createdAt: Date | number;
}

export const ExpenseListItem = ({
  id,
  description,
  amount,
  createdAt: createdAtInput,
}: ExpenseListItemProps) => {
  const createdAt = new Date(createdAtInput);

  return (
    <Link
      className="flex justify-between items-center p-4 hover:bg-accent transition-colors"
      to={`/edit/${id}`}
    >
      <div className="space-y-1">
        <h3 className="text-base font-medium">{description}</h3>
        <span className="text-sm text-muted-foreground">
          {format(createdAt, "MMMM do, yyyy")}
        </span>
      </div>
      <span className="text-base font-medium">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount / 100)}
      </span>
    </Link>
  );
};
