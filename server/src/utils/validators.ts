import { AppError } from "./appError";
import type {
  FeatureFlagKey,
  TaskPriority,
  TaskStatus,
  UserRole,
} from "../types/domain";

export const requireString = (value: unknown, field: string): string => {
  if (typeof value !== "string" || !value.trim()) {
    throw new AppError(`${field} is required`, 400);
  }

  return value.trim();
};

export const requireStringLength = (
  value: unknown,
  field: string,
  length: number,
): string => {
  const s = requireString(value, field);

  if (s.trim().length < length) {
    throw new AppError(`${field} must be at least ${length} characters`, 400);
  }

  return s.trim();
};

export const optionalString = (value: unknown): string | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
};

export const requireEmail = (value: unknown): string => {
  const email = requireString(value, "Email").toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new AppError("Email is invalid", 400);
  }

  return email;
};

export const requirePassword = (value: unknown): string => {
  const password = requireString(value, "Password");

  if (password.length < 8) {
    throw new AppError("Password must be at least 8 characters", 400);
  }

  return password;
};

export const requireSlug = (value: unknown): string => {
  const slug = requireString(value, "Slug").toLowerCase();
  const slugRegex = /^[a-z0-9-]+$/;

  if (!slugRegex.test(slug)) {
    throw new AppError(
      "Slug may only contain lowercase letters, numbers, and hyphens",
      400,
    );
  }

  return slug;
};

export const parseRole = (value: unknown): UserRole => {
  if (value === "owner" || value === "admin" || value === "member") {
    return value;
  }

  throw new AppError("Role is invalid", 400);
};

export const parseTaskStatus = (value: unknown): TaskStatus => {
  if (value === "todo" || value === "in_progress" || value === "done") {
    return value;
  }

  throw new AppError("Task status is invalid", 400);
};

export const parseTaskPriority = (value: unknown): TaskPriority => {
  if (value === "low" || value === "medium" || value === "high") {
    return value;
  }

  throw new AppError("Task priority is invalid", 400);
};

export const parseDate = (value: unknown, field: string): Date => {
  if (typeof value !== "string" && !(value instanceof Date)) {
    throw new AppError(`${field} must be a valid date`, 400);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new AppError(`${field} must be a valid date`, 400);
  }

  return date;
};

export const parseBoolean = (value: unknown, field: string): boolean => {
  if (typeof value !== "boolean") {
    throw new AppError(`${field} must be a boolean`, 400);
  }

  return value;
};

export const parseFeatureFlagKey = (value: unknown): FeatureFlagKey => {
  if (
    value === "scheduling" ||
    value === "advancedReports" ||
    value === "customBranding"
  ) {
    return value;
  }

  throw new AppError("Feature flag key is invalid", 400);
};
