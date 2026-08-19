export interface BookingFormState {
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
}

export type BookingFormErrors = Partial<Record<keyof BookingFormState, string>>;

export const validateBookingFormState = (
  state: BookingFormState,
): BookingFormErrors => {
  const errors: BookingFormErrors = {};

  if (!state.title || state.title.trim().length < 2) {
    errors.title = "Title must be at least 2 characters long.";
  }

  if (!state.startsAt) {
    errors.startsAt = "Start time is required.";
  }

  if (!state.endsAt) {
    errors.endsAt = "End time is required.";
  }

  if (state.startsAt && state.endsAt) {
    const startDate = new Date(state.startsAt);
    const endDate = new Date(state.endsAt);

    if (isNaN(startDate.getTime())) {
      errors.startsAt = "Please enter a valid start date.";
    }

    if (isNaN(endDate.getTime())) {
      errors.endsAt = "Please enter a valid end date.";
    }

    if (
      !isNaN(startDate.getTime()) &&
      !isNaN(endDate.getTime()) &&
      endDate <= startDate
    ) {
      errors.endsAt = "End time must be strictly after the start time.";
    }
  }

  return errors;
};