import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { Button } from "@/components/ui/button";
import { clearCredentials } from "../features/auth/authSlice";
import { logout } from "../lib/api";
import { useToast } from "../components/ui/use-toast";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearCredentials());
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="text-2xl font-bold text-primary">
            Expensify
          </Link>
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
