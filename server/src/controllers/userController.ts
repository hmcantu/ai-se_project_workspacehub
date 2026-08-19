import type { Request, Response } from "express";
import { getUserById, listUsers, updateUser } from "../services/userService";
import { sendSuccess } from "../utils/apiResponse";

export const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsers(req.auth!.organizationId);
  return sendSuccess(res, users);
};

export const getUserController = async (req: Request, res: Response) => {
  const user = await getUserById(req.auth!.organizationId, req.params.id);
  return sendSuccess(res, user);
};

export const updateUserController = async (
  req: Request<Record<string, string>, unknown, Record<string, unknown>>,
  res: Response,
) => {
  const user = await updateUser(req.auth!, req.params.id, req.body);
  return sendSuccess(res, user);
};
