import { Organization } from "../models/Organization";
import type { FeatureFlags } from "../types/domain";
import { AppError } from "../utils/appError";
import {
  parseBoolean,
  requireSlug,
  requireStringLength,
} from "../utils/validators";

export const getCurrentOrganization = async (organizationId: string) => {
  const organization = await Organization.findById(organizationId);

  if (!organization) {
    throw new AppError("Organization not found", 404);
  }

  return organization;
};

export const updateCurrentOrganization = async (
  organizationId: string,
  payload: Record<string, unknown>,
) => {
  const organization = await getCurrentOrganization(organizationId);

  if (payload.name !== undefined) {
    organization.name = requireStringLength(payload.name, "Name", 2);
  }

  if (payload.slug !== undefined) {
    const nextSlug = requireSlug(payload.slug);
    const duplicate = await Organization.findOne({
      slug: nextSlug,
      _id: { $ne: organizationId },
    });

    if (duplicate) {
      throw new AppError("An organization with this slug already exists", 409);
    }

    organization.slug = nextSlug;
  }

  await organization.save();
  return organization;
};

export const updateOrganizationFeatureFlags = async (
  organizationId: string,
  payload: Record<string, unknown>,
) => {
  const organization = await getCurrentOrganization(organizationId);
  const currentFlags = organization.featureFlags ?? {
    scheduling: false,
    advancedReports: false,
    customBranding: false,
  };

  const nextFeatureFlags: FeatureFlags = {
    scheduling:
      payload.scheduling === undefined
        ? currentFlags.scheduling
        : parseBoolean(payload.scheduling, "scheduling"),
    advancedReports:
      payload.advancedReports === undefined
        ? currentFlags.advancedReports
        : parseBoolean(payload.advancedReports, "advancedReports"),
    customBranding:
      payload.customBranding === undefined
        ? currentFlags.customBranding
        : parseBoolean(payload.customBranding, "customBranding"),
  };

  organization.featureFlags = nextFeatureFlags;
  await organization.save();
  return organization;
};
