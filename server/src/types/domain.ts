export type UserRole = "owner" | "admin" | "member";

export type TaskStatus = "todo" | "in_progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export type FeatureFlagKey =
  "scheduling" | "advancedReports" | "customBranding";

export interface FeatureFlags {
  scheduling: boolean;
  advancedReports: boolean;
  customBranding: boolean;
}

export interface AuthPayload {
  userId: string;
  organizationId: string;
  role: UserRole;
}
