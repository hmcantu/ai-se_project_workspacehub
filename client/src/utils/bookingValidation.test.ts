import { describe, expect, it } from "vitest";
import { validateBookingFormState } from "./bookingValidation";

describe("validateBookingFormState", () => {
  const validState = {
    title: "Team Sync",
    description: "Weekly sync meeting",
    startsAt: "2026-08-10T10:00",
    endsAt: "2026-08-10T11:00",
  };

  it("returns no errors when all fields are valid", () => {
    expect(validateBookingFormState(validState)).toEqual({});
  });

  it("returns an error if title is shorter than 2 characters", () => {
    const errors = validateBookingFormState({ ...validState, title: "A" });
    expect(errors.title).toBe("Title must be at least 2 characters long.");
  });

  it("returns an error if start time is missing", () => {
    const errors = validateBookingFormState({ ...validState, startsAt: "" });
    expect(errors.startsAt).toBe("Start time is required.");
  });

  it("returns an error if end time is missing", () => {
    const errors = validateBookingFormState({ ...validState, endsAt: "" });
    expect(errors.endsAt).toBe("End time is required.");
  });

  it("returns error for invalid date strings", () => {
    const errors = validateBookingFormState({
      ...validState,
      startsAt: "invalid-date",
      endsAt: "not-a-date",
    });
    expect(errors.startsAt).toBe("Please enter a valid start date.");
    expect(errors.endsAt).toBe("Please enter a valid end date.");
  });

  it("returns an error if end time is before start time", () => {
    const errors = validateBookingFormState({
      ...validState,
      startsAt: "2026-08-10T12:00",
      endsAt: "2026-08-10T10:00",
    });
    expect(errors.endsAt).toBe("End time must be strictly after the start time.");
  });

  it("returns an error for the boundary case where end time equals start time", () => {
    const time = "2026-08-10T10:00";
    const errors = validateBookingFormState({
      ...validState,
      startsAt: time,
      endsAt: time,
    });
    expect(errors.endsAt).toBe("End time must be strictly after the start time.");
  });
});
