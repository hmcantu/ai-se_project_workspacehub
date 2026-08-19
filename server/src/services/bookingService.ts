import { Booking } from "../models/Booking";
import type { AuthPayload } from "../types/domain";
import { AppError } from "../utils/appError";
import { assertFound } from "../utils/scopedQuery";
import {
  optionalString,
  parseDate,
  requireStringLength,
} from "../utils/validators";
import { canDeleteResource, canManageBooking } from "./permissionService";

const validateBookingWindow = (startsAt: Date, endsAt: Date) => {
  if (startsAt >= endsAt) {
    throw new AppError("Booking end time must be after the start time", 400);
  }
};

const ensureNoBookingConflicts = async (
  organizationId: string,
  startsAt: Date,
  endsAt: Date,
  excludeBookingId?: string,
) => {
  const overlappingBooking = await Booking.findOne({
    organizationId,
    _id: excludeBookingId ? { $ne: excludeBookingId } : { $exists: true },
    startsAt: { $lt: endsAt },
    endsAt: { $gt: startsAt },
  });

  if (overlappingBooking) {
    throw new AppError("Booking overlaps with an existing booking", 409);
  }
};

export const listBookings = async (organizationId: string) => {
  return Booking.find({ organizationId }).sort({ startsAt: 1 });
};

export const createBooking = async (
  actor: AuthPayload,
  payload: Record<string, unknown>,
) => {
  const title = requireStringLength(payload.title, "Title", 2);
  const description = optionalString(payload.description) ?? "";
  const startsAt = parseDate(payload.startsAt, "Start time");
  const endsAt = parseDate(payload.endsAt, "End time");

  validateBookingWindow(startsAt, endsAt);
  await ensureNoBookingConflicts(actor.organizationId, startsAt, endsAt);

  return Booking.create({
    organizationId: actor.organizationId,
    title,
    description,
    startsAt,
    endsAt,
    createdBy: actor.userId,
  });
};

export const getBookingById = async (organizationId: string, id: string) => {
  const booking = await Booking.findOne({ _id: id, organizationId });
  return assertFound(booking, "Booking");
};

export const updateBooking = async (
  actor: AuthPayload,
  id: string,
  payload: Record<string, unknown>,
) => {
  const booking = await getBookingById(actor.organizationId, id);

  if (!canManageBooking(actor, String(booking.createdBy))) {
    throw new AppError(
      "You do not have permission to update this booking",
      403,
    );
  }

  if (payload.title !== undefined) {
    requireStringLength(payload.title, "Title", 2);
  }

  if (payload.description !== undefined) {
    booking.description = optionalString(payload.description) ?? "";
  }

  const startsAt =
    payload.startsAt !== undefined
      ? parseDate(payload.startsAt, "Start time")
      : booking.startsAt;
  const endsAt =
    payload.endsAt !== undefined
      ? parseDate(payload.endsAt, "End time")
      : booking.endsAt;

  validateBookingWindow(startsAt, endsAt);
  await ensureNoBookingConflicts(
    actor.organizationId,
    startsAt,
    endsAt,
    String(booking._id),
  );

  booking.startsAt = startsAt;
  booking.endsAt = endsAt;

  await booking.save();
  return booking;
};

export const deleteBooking = async (actor: AuthPayload, id: string) => {
  const booking = await getBookingById(actor.organizationId, id);

  if (!canDeleteResource(actor)) {
    throw new AppError(
      "You do not have permission to delete this booking",
      403,
    );
  }

  await booking.deleteOne();
  return { deleted: true };
};
