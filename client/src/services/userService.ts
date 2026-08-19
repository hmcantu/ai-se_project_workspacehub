import { api, unwrapResponse } from "./api";
import type { User } from "../types/models";

export const userService = {
  list: () => unwrapResponse<User[]>(api.get("/users")),
  getById: (id: string) => unwrapResponse<User>(api.get(`/users/${id}`)),
  update: (
    id: string,
    payload: Partial<Pick<User, "firstName" | "lastName" | "role">>,
  ) => unwrapResponse<User>(api.patch(`/users/${id}`, payload)),
};
