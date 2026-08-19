import { Organization } from "../models/Organization";
import type { FeatureFlagKey } from "../types/domain";
import { AppError } from "../utils/appError";

export const getOrganizationFeatureFlags = async (organizationId: string) => {
  const organization = await Organization.findById(organizationId);

  if (!organization) {
    throw new AppError("Organization not found", 404);
  }

  return organization.featureFlags;
};

export const ensureFeatureEnabled = async (
  organizationId: string,
  featureKey: FeatureFlagKey,
) => {
  const featureFlags = await getOrganizationFeatureFlags(organizationId);
  const resolvedFeatureFlags = featureFlags ?? {
    scheduling: false,
    advancedReports: false,
    customBranding: false,
  };

  if (!resolvedFeatureFlags[featureKey]) {
    throw new AppError(
      `${featureKey} is not enabled for this organization`,
      403,
    );
  }
};
