import { describe, expect, it } from "vitest";
import type { Project, Task } from "../types/models";
import { buildProjectWithTaskCount } from "./projectMetrics";

describe("buildProjectWithTaskCount", () => {
  const baseProject: Project = {
    _id: "project-1",
    name: "Alpha Project",
    description: "Sample description",
    organizationId: "org-1",
    createdBy: "user-1",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  const createTask = (id: string, projectId: string): Task => ({
    _id: id,
    title: `Task ${id}`,
    description: "Task description",
    status: "todo",
    priority: "medium",
    organizationId: "org-1",
    projectId,
    assignedTo: "user-1",
    dueDate: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  });

  it("calculates correct taskCount when project has matching tasks", () => {
    const tasks = [
      createTask("task-1", "project-1"),
      createTask("task-2", "project-1"),
    ];

    const result = buildProjectWithTaskCount(baseProject, tasks);

    expect(result.taskCount).toBe(2);
    expect(result.name).toBe("Alpha Project");
  });

  it("returns taskCount 0 when no tasks exist", () => {
    const result = buildProjectWithTaskCount(baseProject, []);

    expect(result.taskCount).toBe(0);
  });

  it("filters out tasks belonging to a different project", () => {
    const tasks = [
      createTask("task-1", "project-1"),
      createTask("task-2", "project-2"),
      createTask("task-3", "project-3"),
    ];

    const result = buildProjectWithTaskCount(baseProject, tasks);

    expect(result.taskCount).toBe(1);
  });
});
