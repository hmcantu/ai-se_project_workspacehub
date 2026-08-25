import { api, unwrapResponse } from "./api";
import type { Comment, CommentCreatePayload } from "../types/models";

export const commentService = {
  list: (taskId: string) =>
    unwrapResponse<Comment[]>(api.get(`/tasks/${taskId}/comments`)),

  create: (taskId: string, payload: CommentCreatePayload) =>
    unwrapResponse<Comment>(api.post(`/tasks/${taskId}/comments`, payload)),
};

export default commentService;
