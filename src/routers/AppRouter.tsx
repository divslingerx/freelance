import { createBrowserRouter } from "react-router-dom";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import LoginPage from "../components/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <ExpenseDashboardPage />,
      },
    ],
  },
  {
    path: "/create",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <AddExpensePage />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <EditExpensePage />,
      },
    ],
  },
  {
    path: "/help",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <HelpPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default AppRouter;
