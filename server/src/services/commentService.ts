import { Types } from "mongoose";
import { Comment } from "../models/Comment";
import { Task } from "../models/Task";
import type { AuthPayload } from "../types/domain";
import { AppError } from "../utils/appError";
import { assertFound } from "../utils/scopedQuery";
import { requireString } from "../utils/validators";
import { canManageComment } from "./permissionService";

const ensureTaskInOrganization = async (
  taskId: string,
  organizationId: string,
) => {
  const task = await Task.findOne({ _id: taskId, organizationId });

  if (!task) {
    throw new AppError("Task not found", 404);
  }
};

export const listComments = async (organizationId: string, taskId: string) => {
  return Comment.find({ organizationId, taskId }).sort({ createdAt: -1 });
};

export const getCommentById = async (
  organizationId: string,
  taskId: string,
  id: string,
) => {
  const comment = await Comment.findOne({ _id: id, organizationId, taskId });
  return assertFound(comment, "Comment");
};

export const createComment = async (
  actor: AuthPayload,
  taskId: string,
  payload: Record<string, unknown>,
) => {
  const content = requireString(payload.content, "Content");

  await ensureTaskInOrganization(taskId, actor.organizationId);

  return Comment.create({
    organizationId: actor.organizationId,
    taskId: new Types.ObjectId(taskId),
    authorId: new Types.ObjectId(actor.userId),
    content,
  });
};

export const updateComment = async (
  actor: AuthPayload,
  taskId: string,
  id: string,
  payload: Record<string, unknown>,
) => {
  const comment = await getCommentById(actor.organizationId, taskId, id);

  if (!canManageComment(actor, String(comment.authorId))) {
    throw new AppError(
      "You do not have permission to update this comment",
      403,
    );
  }

  if (payload.content !== undefined) {
    comment.content = requireString(payload.content, "Content");
  }

  await comment.save();
  return comment;
};

export const deleteComment = async (
  actor: AuthPayload,
  taskId: string,
  id: string,
) => {
  const comment = await getCommentById(actor.organizationId, taskId, id);

  if (!canManageComment(actor, String(comment.authorId))) {
    throw new AppError(
      "You do not have permission to delete this comment",
      403,
    );
  }

  await comment.deleteOne();
  return { deleted: true };
};
