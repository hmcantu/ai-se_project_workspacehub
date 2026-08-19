import { api, unwrapResponse } from "./api";
import type { AuthSession, MePayload } from "../types/models";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  firstName: string;
  lastName: string;
  organizationName: string;
  organizationSlug: string;
}

export const authService = {
  login: (payload: LoginPayload) =>
    unwrapResponse<AuthSession>(api.post("/auth/login", payload)),
  register: (payload: RegisterPayload) =>
    unwrapResponse<AuthSession>(api.post("/auth/register", payload)),
  me: () => unwrapResponse<MePayload>(api.get("/auth/me")),
};
