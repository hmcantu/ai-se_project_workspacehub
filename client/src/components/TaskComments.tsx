import { useState, useEffect, type FormEvent } from "react";
import type { Comment, User } from "../types/models";
import commentService from "../services/commentService";

interface Props {
  taskId: string;
  users: User[];
  commentCount: number;
}

export const TaskComments = ({ taskId, users, commentCount }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [body, setBody] = useState("");

  const [comments, setComments] = useState<Comment[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

  const [localCount, setLocalCount] = useState<number>(commentCount ?? 0);
  useEffect(() => setLocalCount(commentCount ?? 0), [commentCount]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setPostError(null);

    if (!body.trim()) return;

    setPosting(true);
    try {
      const created = await commentService.create(taskId, {
        content: body.trim(),
      });
      setComments((prev) => [created, ...prev]);
      setLocalCount((c) => c + 1);
      setBody("");
      setHasLoaded(true);
    } catch (err) {
      setPostError(err instanceof Error ? err.message : String(err));
    } finally {
      setPosting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="rounded-[10px] bg-ink px-4 py-2 text-sm font-medium text-white transition hover:opacity-80 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={async () => {
          const next = !isExpanded;
          setIsExpanded(next);
          if (next && !hasLoaded) {
            setLoadingComments(true);
            setLoadingError(null);
            try {
              const fetched = await commentService.list(taskId);
              setComments(fetched);
              setLocalCount(fetched.length);
              setHasLoaded(true);
            } catch (err) {
              setLoadingError(err instanceof Error ? err.message : String(err));
            } finally {
              setLoadingComments(false);
            }
          }
        }}
      >
        {isExpanded ? "Hide Comments" : `Show Comments (${localCount})`}
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
                disabled={posting}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-[10px] bg-ink px-4 py-2 text-sm font-medium text-white transition hover:opacity-80 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!body.trim() || posting}
                >
                  {posting ? "Adding..." : "Add comment"}
                </button>
              </div>
            </div>
          </form>
          {loadingComments ? (
            <p className="text-sm text-slate-500">Loading comments...</p>
          ) : loadingError ? (
            <p className="text-sm text-danger">{loadingError}</p>
          ) : (
            <>
              {postError ? (
                <p className="text-sm text-danger">{postError}</p>
              ) : null}

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
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default TaskComments;
