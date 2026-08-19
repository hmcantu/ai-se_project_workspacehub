import type { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  listTasks,
  updateTask,
} from "../services/taskService";
import { sendSuccess } from "../utils/apiResponse";

export const listTasksController = async (req: Request, res: Response) => {
  const tasks = await listTasks(
    req.auth!.organizationId,
    req.query.projectId as string | undefined,
  );
  return sendSuccess(res, tasks);
};

export const createTaskController = async (
  req: Request<Record<string, string>, unknown, Record<string, unknown>>,
  res: Response,
) => {
  const task = await createTask(req.auth!, req.body);
  return sendSuccess(res, task, 201);
};

export const getTaskController = async (req: Request, res: Response) => {
  const task = await getTaskById(req.auth!.organizationId, req.params.id);
  return sendSuccess(res, task);
};

export const updateTaskController = async (
  req: Request<Record<string, string>, unknown, Record<string, unknown>>,
  res: Response,
) => {
  const task = await updateTask(req.auth!, req.params.id, req.body);
  return sendSuccess(res, task);
};

export const deleteTaskController = async (req: Request, res: Response) => {
  const result = await deleteTask(req.auth!, req.params.id);
  return sendSuccess(res, result);
};
