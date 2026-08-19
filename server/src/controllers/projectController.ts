import type { Request, Response } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  listProjects,
  updateProject,
} from "../services/projectService";
import { sendSuccess } from "../utils/apiResponse";

export const listProjectsController = async (req: Request, res: Response) => {
  const projects = await listProjects(req.auth!.organizationId);
  return sendSuccess(res, projects);
};

export const createProjectController = async (
  req: Request<Record<string, string>, unknown, Record<string, unknown>>,
  res: Response,
) => {
  const project = await createProject(req.auth!, req.body);
  return sendSuccess(res, project, 201);
};

export const getProjectController = async (req: Request, res: Response) => {
  const project = await getProjectById(req.auth!.organizationId, req.params.id);
  return sendSuccess(res, project);
};

export const updateProjectController = async (
  req: Request<Record<string, string>, unknown, Record<string, unknown>>,
  res: Response,
) => {
  const project = await updateProject(req.auth!, req.params.id, req.body);
  return sendSuccess(res, project);
};

export const deleteProjectController = async (req: Request, res: Response) => {
  const result = await deleteProject(req.auth!, req.params.id);
  return sendSuccess(res, result);
};
