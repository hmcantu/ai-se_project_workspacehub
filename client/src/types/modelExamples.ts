import type { Project, Task, ProjectWithTaskCount } from "./models";
import { buildProjectWithTaskCount } from "../utils/projectMetrics";

const sharedOrganizationId = "org_acme_123";

export const exampleProject: Project = {
  _id: "project_101",
  organizationId: sharedOrganizationId,
  name: "Platform Refresh",
  description: "Revamp the internal platform dashboard and delivery flow.",
  createdBy: "user_owner_001",
  createdAt: "2026-01-15T09:00:00.000Z",
  updatedAt: "2026-01-15T09:00:00.000Z",
};

export const exampleTask: Task = {
  _id: "task_501",
  organizationId: sharedOrganizationId,
  projectId: exampleProject._id,
  title: "Audit component library",
  description: "Review button styles and form layout consistency.",
  status: "in_progress",
  priority: "high",
  assignedTo: "user_owner_001",
  dueDate: "2026-02-01T17:00:00.000Z",
  createdAt: "2026-01-16T10:30:00.000Z",
  updatedAt: "2026-01-16T10:30:00.000Z",
};

export const exampleProjectWithTaskCount: ProjectWithTaskCount =
  buildProjectWithTaskCount(exampleProject, [exampleTask]);
