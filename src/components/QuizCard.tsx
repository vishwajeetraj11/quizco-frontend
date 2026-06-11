import { useState } from "react";
import { FiArrowUpRight, FiBarChart2, FiHelpCircle } from "react-icons/fi";
import { useMatch, useNavigate } from "react-router-dom";
import { IQuiz } from "../shared/interfaces";
import { ModalSkeleton } from "./Modal";
import { QuizModalContents } from "./QuizModalContents";
import { TagChip } from "./TagChip";

interface Props extends IQuiz {
  onSelect?: () => void;
  score?: number;
  deleted?: boolean;
  redirect?: string;
  selected?: boolean;
}

const statusStyles: Record<string, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  draft: "border-amber-200 bg-amber-50 text-amber-700",
  inactive: "border-rose-200 bg-rose-50 text-rose-700",
};

export const QuizCard: React.FC<Props> = (props) => {
  const {
    title,
    description,
    tags,
    onSelect,
    status,
    score,
    redirect,
    selected,
    attemptsCount,
    questionsCount,
  } = props;
  const isDashboardPage = useMatch("/dashboard");
  const navigate = useNavigate();

  const [quizModalActive, setQuizModalActive] = useState(false);
  const handleQuizModalActive = () => setQuizModalActive(true);
  const handleQuizModalClose = () => {
    setQuizModalActive((p) => !p);
  };

  const trimmedDescription =
    description.length > 150 ? `${description.slice(0, 150)}...` : description;
  const visibleTags = (tags || []).slice(0, 3);
  const additionalTags = Math.max((tags?.length || 0) - visibleTags.length, 0);
  const footerLabel = selected
    ? "Selected for quick actions"
    : isDashboardPage
    ? "Click to focus this quiz"
    : "Open quiz overview";
  const actionLabel = selected ? "Selected" : redirect ? "Continue" : "Explore";

  return (
    <>
      <div
        onClick={() =>
          onSelect
            ? onSelect()
            : redirect
            ? navigate(redirect)
            : handleQuizModalActive()
        }
        className={`group relative flex self-start cursor-pointer flex-col overflow-hidden rounded-[30px] border bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(246,249,252,0.96)_100%)] transition-all duration-300 ${
          selected
            ? "border-teal-300 shadow-[0_26px_62px_rgba(13,148,136,0.16)] ring-2 ring-teal-100"
            : "border-white/80 shadow-[0_22px_56px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-[0_32px_72px_rgba(15,23,42,0.12)]"
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-teal-500 via-sky-400 to-amber-400" />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -left-10 bottom-12 h-28 w-28 rounded-full bg-teal-100/45 blur-3xl" />
          <div className="absolute -right-10 top-12 h-32 w-32 rounded-full bg-amber-100/45 blur-3xl" />
        </div>

        <div className="relative flex flex-col px-6 pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <span className="h-2 w-2 rounded-full bg-gradient-to-br from-teal-500 to-amber-400" />
                <span className="truncate" style={{ letterSpacing: "0.22em" }}>
                  {isDashboardPage ? "Workspace quiz" : "Ready to play"}
                </span>
              </span>
              <p
                className="font-display mt-4 min-h-[5.6rem] text-[1.72rem] font-semibold leading-[1.06] text-slate-950 sm:min-h-[6rem] sm:text-[1.9rem]"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                }}
              >
                {title}
              </p>
            </div>
            {(isDashboardPage || score === 0 || score) && (
              <div className="flex shrink-0 flex-col items-end gap-2 pt-1">
                {isDashboardPage && (
                  <span
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase ${statusStyles[status] || "border-slate-200 bg-slate-50 text-slate-600"}`}
                    style={{ letterSpacing: "0.16em" }}
                  >
                    {status}
                  </span>
                )}
                {(score === 0 || score) && (
                  <span
                    className="rounded-full border border-slate-900/10 bg-slate-900 px-3 py-1.5 text-[11px] font-semibold uppercase text-white"
                    style={{ letterSpacing: "0.16em" }}
                  >
                    Score {score}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 h-px w-14 bg-gradient-to-r from-slate-300 via-slate-200 to-transparent" />

          <p className="mt-4 min-h-[5.8rem] max-w-[34ch] text-[0.98rem] leading-7 text-slate-600">
            {trimmedDescription}
          </p>

          <div className="mt-auto pt-5">
            <div className="overflow-hidden rounded-[24px] border border-slate-200/70 bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
              <div className="grid grid-cols-2 gap-px bg-slate-200/70">
                <div className="bg-white/90 px-5 py-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiHelpCircle size={16} />
                    <span
                      className="text-[11px] font-semibold uppercase"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      Questions
                    </span>
                  </div>
                  <p className="mt-4 text-[2.15rem] font-semibold leading-none text-slate-950">
                    {questionsCount ?? 0}
                  </p>
                </div>
                <div className="bg-white/90 px-5 py-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiBarChart2 size={16} />
                    <span
                      className="text-[11px] font-semibold uppercase"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      Attempts
                    </span>
                  </div>
                  <p className="mt-4 text-[2.15rem] font-semibold leading-none text-slate-950">
                    {attemptsCount ?? 0}
                  </p>
                </div>
              </div>
            </div>

            {(visibleTags.length > 0 || additionalTags > 0) && (
              <div className="mt-5 flex flex-wrap gap-2.5">
                {visibleTags.map((tag, i) => (
                  <TagChip key={`${tag}-${i}`}>
                    {tag}
                  </TagChip>
                ))}
                {additionalTags > 0 && (
                  <TagChip tone="neutral">
                    +{additionalTags} more
                  </TagChip>
                )}
              </div>
            )}

            <div className="mt-4 flex flex-col gap-3 border-t border-slate-200/70 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
              <span className="text-slate-500">{footerLabel}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50/85 px-4 py-2 font-semibold text-teal-800 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-teal-300 group-hover:bg-white">
                {actionLabel}
                <FiArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <ModalSkeleton open={quizModalActive} onClose={handleQuizModalClose}>
        <QuizModalContents onClose={handleQuizModalClose} {...props} />
      </ModalSkeleton>
    </>
  );
};
