import { api, unwrapResponse } from "./api";
import type { FeatureFlags, Organization } from "../types/models";

export const organizationService = {
  getCurrent: () =>
    unwrapResponse<Organization>(api.get("/organizations/current")),
  updateCurrent: (payload: Partial<Pick<Organization, "name" | "slug">>) =>
    unwrapResponse<Organization>(api.patch("/organizations/current", payload)),
  updateFeatureFlags: (payload: Partial<FeatureFlags>) =>
    unwrapResponse<Organization>(
      api.patch("/organizations/current/feature-flags", payload),
    ),
};
