import { createContext } from "react";
import type { LoginPayload, RegisterPayload } from "../services/authService";
import type {
  FeatureFlags,
  Organization,
  User,
  UserRole,
} from "../types/models";

export interface AuthContextValue {
  token: string | null;
  user: User | null;
  organization: Organization | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  setOrganizationState: (organization: Organization) => void;
  hasRole: (...roles: UserRole[]) => boolean;
  isFeatureEnabled: (featureKey: keyof FeatureFlags) => boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
