import { AppError } from "./appError";

export const assertFound = <T>(document: T | null, resourceName: string): T => {
  if (!document) {
    throw new AppError(`${resourceName} not found`, 404);
  }

  return document;
};
