import type { Request, Response } from "express";
import { login, getCurrentAuthUser, register } from "../services/authService";
import { sendSuccess } from "../utils/apiResponse";

export const registerController = async (
  req: Request<Record<string, string>, unknown, Record<string, unknown>>,
  res: Response,
) => {
  const result = await register(req.body);
  return sendSuccess(res, result, 201);
};

export const loginController = async (
  req: Request<Record<string, string>, unknown, Record<string, unknown>>,
  res: Response,
) => {
  const result = await login(req.body);
  return sendSuccess(res, result);
};

export const meController = async (req: Request, res: Response) => {
  const result = await getCurrentAuthUser(req.auth!.userId);
  return sendSuccess(res, result);
};
