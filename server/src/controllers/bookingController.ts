import type { Request, Response } from "express";
import {
  createBooking,
  deleteBooking,
  getBookingById,
  listBookings,
  updateBooking,
} from "../services/bookingService";
import { sendSuccess } from "../utils/apiResponse";

export const listBookingsController = async (req: Request, res: Response) => {
  const bookings = await listBookings(req.auth!.organizationId);
  return sendSuccess(res, bookings);
};

export const createBookingController = async (
  req: Request<Record<string, string>, unknown, Record<string, unknown>>,
  res: Response,
) => {
  const booking = await createBooking(req.auth!, req.body);
  return sendSuccess(res, booking, 201);
};

export const getBookingController = async (req: Request, res: Response) => {
  const booking = await getBookingById(req.auth!.organizationId, req.params.id);
  return sendSuccess(res, booking);
};

export const updateBookingController = async (
  req: Request<Record<string, string>, unknown, Record<string, unknown>>,
  res: Response,
) => {
  const booking = await updateBooking(req.auth!, req.params.id, req.body);
  return sendSuccess(res, booking);
};

export const deleteBookingController = async (req: Request, res: Response) => {
  const result = await deleteBooking(req.auth!, req.params.id);
  return sendSuccess(res, result);
};
