import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/User";
import type { AuthPayload } from "../types/domain";
import { sendError } from "../utils/apiResponse";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    return sendError(res, "Authentication is required", 401);
  }

  const token = authorizationHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthPayload;
    const user = await User.findById(payload.userId);

    if (!user) {
      return sendError(res, "Authentication is invalid", 401);
    }

    req.auth = {
      userId: String(user._id),
      organizationId: String(user.organizationId),
      role: user.role,
    };

    return next();
  } catch {
    return sendError(res, "Authentication is invalid", 401);
  }
};
