import { api, unwrapResponse } from "./api";
import type { Booking } from "../types/models";

export const bookingService = {
  list: () => unwrapResponse<Booking[]>(api.get("/bookings")),
  getById: (id: string) => unwrapResponse<Booking>(api.get(`/bookings/${id}`)),
  create: (
    payload: Pick<Booking, "title" | "description" | "startsAt" | "endsAt">,
  ) => unwrapResponse<Booking>(api.post("/bookings", payload)),
  update: (
    id: string,
    payload: Partial<
      Pick<Booking, "title" | "description" | "startsAt" | "endsAt">
    >,
  ) => unwrapResponse<Booking>(api.patch(`/bookings/${id}`, payload)),
  delete: (id: string) =>
    unwrapResponse<{ deleted: boolean }>(api.delete(`/bookings/${id}`)),
};
