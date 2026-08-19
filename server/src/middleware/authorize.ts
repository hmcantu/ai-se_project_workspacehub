import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../types/domain";
import { sendError } from "../utils/apiResponse";

export const requireRoles = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth) {
      return sendError(res, "Authentication is required", 401);
    }

    if (!roles.includes(req.auth.role)) {
      return sendError(
        res,
        "You do not have permission to perform this action",
        403,
      );
    }

    return next();
  };
};
