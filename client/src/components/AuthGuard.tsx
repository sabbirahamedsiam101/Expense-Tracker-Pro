// src/components/AuthGuard.tsx
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const auth = localStorage.getItem("auth");
  if (!auth) return false;

  try {
    const parsed = JSON.parse(auth);
    const expiresAt = new Date(parsed.expiresAt);
    return new Date() < expiresAt;
  } catch {
    return false;
  }
};

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

export default AuthGuard;
