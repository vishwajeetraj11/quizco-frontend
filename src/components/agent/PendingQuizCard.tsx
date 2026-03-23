import { useState } from "react";
import {
  FiCheck,
  FiX,
  FiTarget,
  FiUsers,
  FiLink,
} from "react-icons/fi";
import { useQueryClient } from "react-query";
import { IPendingQuiz } from "../../shared/interfaces";
import { useAgentPending, useApproveQuiz, useRejectQuiz } from "../../shared/queries";
import { useSnackbar } from "../../ui/snackbar";
import { Loader } from "../Svgs";

const extractPendingQuizzes = (payload: unknown): IPendingQuiz[] => {
  if (Array.isArray(payload)) {
    return payload as IPendingQuiz[];
  }

  if (!payload || typeof payload !== "object") {
    return [];
  }

  const record = payload as Record<string, unknown>;
  const candidates = [
    record.quizzes,
    record.data,
    record.pending,
    record.items,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate as IPendingQuiz[];
    }

    if (candidate && typeof candidate === "object") {
      const nested = candidate as Record<string, unknown>;
      if (Array.isArray(nested.quizzes)) {
        return nested.quizzes as IPendingQuiz[];
      }
      if (Array.isArray(nested.pending)) {
        return nested.pending as IPendingQuiz[];
      }
      if (Array.isArray(nested.items)) {
        return nested.items as IPendingQuiz[];
      }
    }
  }

  return [];
};

const ConfidenceBadge: React.FC<{ score: number }> = ({ score }) => {
  const pct = Math.round(score * 100);
  let color = "bg-emerald-50 text-emerald-700";
  if (pct < 70) color = "bg-amber-50 text-amber-700";
  if (pct < 50) color = "bg-rose-50 text-rose-700";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}>
      {pct}% confident
    </span>
  );
};

const QuizCard: React.FC<{ quiz: IPendingQuiz }> = ({ quiz }) => {
  const [rejectReason, setRejectReason] = useState("");
  const [showReject, setShowReject] = useState(false);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: approve, isLoading: isApproving } = useApproveQuiz(
    quiz._id,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Agent Pending"]);
        enqueueSnackbar("Quiz approved and published.", { variant: "success" });
      },
    }
  );

  const { mutateAsync: reject, isLoading: isRejecting } = useRejectQuiz(
    quiz._id,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Agent Pending"]);
        enqueueSnackbar("Quiz rejected. Agent will learn from this.", {
          variant: "info",
        });
      },
    }
  );

  const handleApprove = () => approve({ body: {} });
  const handleReject = () => {
    if (!rejectReason.trim()) return;
    reject({ body: { reason: rejectReason } });
  };

  return (
    <div className="app-panel-soft overflow-hidden">
      <div className="px-5 py-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-lg font-bold text-slate-900">{quiz.title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium">
                {quiz.topic}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium">
                {quiz.difficulty}
              </span>
              {quiz.format && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium">
                  {quiz.format}
                </span>
              )}
              <span>{quiz.questions?.length || 0} questions</span>
            </div>
          </div>
          <ConfidenceBadge score={quiz.agentConfidence} />
        </div>

        {/* Trend summary */}
        {quiz.trendSummary && (
          <p className="mt-3 text-sm text-slate-600">{quiz.trendSummary}</p>
        )}

        {/* Metadata */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {quiz.similarityScore !== undefined && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <FiTarget size={13} className="text-emerald-500" />
              <span>
                Similarity:{" "}
                <span className="font-semibold text-slate-700">
                  {Math.round(quiz.similarityScore * 100)}%
                </span>
                {quiz.closestMatch && (
                  <span className="text-slate-400">
                    {" "}
                    vs "{quiz.closestMatch}"
                  </span>
                )}
              </span>
            </div>
          )}
          {quiz.inspiredBy?.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <FiLink size={13} className="text-sky-500" />
              <span>Inspired by {quiz.inspiredBy.length} quiz(es)</span>
            </div>
          )}
          {quiz.targetUsers && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <FiUsers size={13} className="text-indigo-500" />
              <span>{quiz.targetUsers}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={handleApprove}
            disabled={isApproving}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-700 disabled:opacity-50"
          >
            <FiCheck size={16} />
            {isApproving ? "Approving..." : "Approve"}
          </button>
          {!showReject ? (
            <button
              onClick={() => setShowReject(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-50"
            >
              <FiX size={16} />
              Reject
            </button>
          ) : (
            <div className="flex flex-1 items-center gap-2">
              <input
                type="text"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason for rejection..."
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
                onKeyDown={(e) => e.key === "Enter" && handleReject()}
              />
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim() || isRejecting}
                className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-rose-700 disabled:opacity-50"
              >
                {isRejecting ? "..." : "Confirm"}
              </button>
              <button
                onClick={() => setShowReject(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const PendingQuizList: React.FC = () => {
  const { data, isLoading, isError } = useAgentPending();

  if (isLoading) return <Loader halfScreen />;

  if (isError) {
    return (
      <div className="app-panel-soft px-6 py-8 text-center">
        <p className="text-sm text-red-600">Could not load pending quizzes.</p>
      </div>
    );
  }

  const quizzes = extractPendingQuizzes(data);

  if (quizzes.length === 0) {
    return (
      <div className="app-panel-soft px-6 py-12 text-center">
        <FiCheck className="mx-auto text-emerald-500" size={32} />
        <p className="mt-3 text-sm font-medium text-slate-600">
          All caught up! No quizzes pending review.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        {quizzes.length} quiz{quizzes.length !== 1 ? "zes" : ""} awaiting your
        review
      </p>
      {quizzes.map((quiz) => (
        <QuizCard key={quiz._id} quiz={quiz} />
      ))}
    </div>
  );
};
