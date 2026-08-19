import type { Request, Response } from "express";
import {
  getCurrentOrganization,
  updateCurrentOrganization,
  updateOrganizationFeatureFlags,
} from "../services/organizationService";
import { sendSuccess } from "../utils/apiResponse";

export const getCurrentOrganizationController = async (
  req: Request,
  res: Response,
) => {
  const organization = await getCurrentOrganization(req.auth!.organizationId);
  return sendSuccess(res, organization);
};

export const updateCurrentOrganizationController = async (
  req: Request<Record<string, string>, unknown, Record<string, unknown>>,
  res: Response,
) => {
  const organization = await updateCurrentOrganization(
    req.auth!.organizationId,
    req.body,
  );
  return sendSuccess(res, organization);
};

export const updateFeatureFlagsController = async (
  req: Request<Record<string, string>, unknown, Record<string, unknown>>,
  res: Response,
) => {
  const organization = await updateOrganizationFeatureFlags(
    req.auth!.organizationId,
    req.body,
  );
  return sendSuccess(res, organization);
};
