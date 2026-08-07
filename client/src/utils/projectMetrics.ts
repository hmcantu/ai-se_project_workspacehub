import type { Project, Task, ProjectWithTaskCount } from "../types/models";

export const buildProjectWithTaskCount = (
  project: Project,
  tasks: Task[],
): ProjectWithTaskCount => {
  const taskCount = tasks.filter(
    (task) => task.projectId === project._id,
  ).length;

  return {
    ...project,
    taskCount,
  };
};
