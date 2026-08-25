import { useState, type FormEvent } from "react";
import type { Comment, User } from "../types/models";

interface Props {
  taskId: string;
  users: User[];
}

export const TaskComments = ({ taskId, users }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [body, setBody] = useState("");

  const [comments, setComments] = useState<Comment[]>(() => {
    const now = new Date();
    return [
      {
        _id: "c1",
        organizationId: "org1",
        taskId,
        authorId: users[0]?._id ?? "unknown",
        content: "This is a mock comment to preview the UI.",
        createdAt: new Date(now.getTime() - 1000 * 60 * 60).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60).toISOString(),
      },
      {
        _id: "c2",
        organizationId: "org1",
        taskId,
        authorId: users[1]?._id ?? "unknown",
        content: "Another example comment for visual testing.",
        createdAt: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
      },
    ];
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!body.trim()) return;

    const newComment: Comment = {
      _id: `${Date.now()}`,
      organizationId: "org1",
      taskId,
      authorId: users[0]?._id ?? "unknown",
      content: body.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setComments((prev) => [newComment, ...prev]);
    setBody("");
  };

  return (
    <>
      <button
        type="button"
        className="rounded-[10px] bg-ink px-4 py-2 text-sm font-medium text-white transition hover:opacity-80 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setIsExpanded((s) => !s)}
      >
        {isExpanded ? "Hide Comments" : `Show Comments (${comments.length})`}
      </button>

      {isExpanded ? (
        <div className="mt-4 basis-full space-y-4 rounded-2xl border border-slate-200 p-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <textarea
                className="rounded-2xl border border-slate-200 transition hover:border-slate-300 px-4 py-3 disabled:bg-slate-100 w-full"
                placeholder="Write a comment..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-[10px] bg-ink px-4 py-2 text-sm font-medium text-white transition hover:opacity-80 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!body.trim()}
                >
                  Add comment
                </button>
              </div>
            </div>
          </form>

          <ul className="space-y-3">
            {comments.map((comment) => {
              const author = users.find((u) => u._id === comment.authorId);
              const authorName = author
                ? `${author.firstName} ${author.lastName}`
                : "Unknown user";

              return (
                <li
                  key={comment._id}
                  className="rounded-xl border border-slate-100 p-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-ink">{authorName}</p>
                    <p className="text-sm text-slate-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-ink">{comment.content}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default TaskComments;
