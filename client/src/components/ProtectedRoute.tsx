import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { StatusPanel } from "./StatusPanel";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <StatusPanel title="Loading session" message="Checking your account." />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
