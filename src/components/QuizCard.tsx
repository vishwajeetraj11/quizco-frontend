import { useState } from "react";
import { FiArrowUpRight, FiBarChart2, FiHelpCircle } from "react-icons/fi";
import { useMatch, useNavigate } from "react-router-dom";
import { IQuiz } from "../shared/interfaces";
import { ModalSkeleton } from "./Modal";
import { QuizModalContents } from "./QuizModalContents";

interface Props extends IQuiz {
  onSelect?: () => void;
  score?: number;
  deleted?: boolean;
  redirect?: string;
  selected?: boolean;
}

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  draft: "bg-amber-100 text-amber-700",
  inactive: "bg-rose-100 text-rose-700",
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
        className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[28px] border bg-white/92 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 ${
          selected
            ? "border-teal-300 ring-2 ring-teal-100"
            : "border-slate-200/80 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_24px_55px_rgba(15,23,42,0.12)]"
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-sky-400 to-amber-400" />

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p
              className="text-[11px] font-medium uppercase text-slate-500"
              style={{ letterSpacing: "0.22em" }}
            >
              {isDashboardPage ? "Workspace quiz" : "Ready to play"}
            </p>
            <p className="mt-3 text-xl font-semibold leading-8 text-slate-900">
              {title}
            </p>
          </div>
          {(isDashboardPage || score === 0 || score) && (
            <div className="flex flex-col items-end gap-2">
              {isDashboardPage && (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    statusStyles[status] || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {status}
                </span>
              )}
              {(score === 0 || score) && (
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  Score {score}
                </span>
              )}
            </div>
          )}
        </div>

        <p className="mt-4 min-h-[96px] text-sm leading-7 text-slate-600">
          {trimmedDescription}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-[20px] bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 text-slate-500">
              <FiHelpCircle size={16} />
              <span className="text-xs font-medium uppercase tracking-[0.18em]">
                Questions
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {questionsCount}
            </p>
          </div>
          <div className="rounded-[20px] bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 text-slate-500">
              <FiBarChart2 size={16} />
              <span className="text-xs font-medium uppercase tracking-[0.18em]">
                Attempts
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {attemptsCount}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
              +{tags.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-6 text-sm font-medium">
          <span className="text-slate-500">
            {selected
              ? "Selected for quick actions"
              : isDashboardPage
              ? "Click to focus this quiz"
              : "Open quiz overview"}
          </span>
          <span className="inline-flex items-center gap-2 text-teal-700 transition-transform duration-300 group-hover:translate-x-1">
            {redirect ? "Continue" : "Explore"}
            <FiArrowUpRight size={16} />
          </span>
        </div>
      </div>
      <ModalSkeleton open={quizModalActive} onClose={handleQuizModalClose}>
        <QuizModalContents onClose={handleQuizModalClose} {...props} />
      </ModalSkeleton>
    </>
  );
};
