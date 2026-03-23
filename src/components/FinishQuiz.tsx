import { FiAward, FiCheck, FiX } from "react-icons/fi";
import { IOption } from "../shared/interfaces";
import { EmptyResponse } from "./EmptyResponse";

interface Props {
  responses: any;
  score: number;
  as: "AFTER_QUIZ_RESPONSE" | "AUTHOR_CHECK_RESPONSE" | "USER_CHECK_RESPONSE";
  quizDeleted?: boolean;
}

export const ShowResponses: React.FC<Props> = ({
  responses,
  score,
  as,
  quizDeleted,
}) => {
  const AFTER_QUIZ_RESPONSE = as === "AFTER_QUIZ_RESPONSE";
  const AUTHOR_CHECK_RESPONSE = as === "AUTHOR_CHECK_RESPONSE";
  const total = responses.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const subject = AUTHOR_CHECK_RESPONSE ? "Their" : "Your";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Score card */}
      <div className="app-panel-soft px-6 py-8 text-center">
        {AFTER_QUIZ_RESPONSE && (
          <p className="mb-4 text-lg font-medium text-slate-600">
            Thank you for playing this quiz
          </p>
        )}
        {quizDeleted && (
          <p className="mb-4 text-sm font-medium text-rose-600">
            This quiz has been deleted.
          </p>
        )}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
          <FiAward className="text-teal-600" size={32} />
        </div>
        <p className="mt-4 text-4xl font-black text-slate-900">
          {score}
          <span className="text-xl font-medium text-slate-400">/{total}</span>
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {subject} score &middot; {percentage}% correct
        </p>

        {/* Legend */}
        {total > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm bg-emerald-500" />
              Correct answer
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm border-2 border-indigo-500" />
              {AUTHOR_CHECK_RESPONSE ? "Their" : "Your"} response
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm bg-rose-100" />
              Incorrect
            </span>
          </div>
        )}
      </div>

      {/* Questions */}
      {total > 0 ? (
        <div className="mt-8 space-y-5">
          {responses.map((resp: any, i: number) => {
            const isCorrect = resp.response === resp.correct;
            return (
              <div
                key={i}
                className="app-panel-soft overflow-hidden"
              >
                {/* Question header */}
                <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-4">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      isCorrect ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  >
                    {isCorrect ? (
                      <FiCheck size={14} strokeWidth={3} />
                    ) : (
                      <FiX size={14} strokeWidth={3} />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">
                      Question {i + 1}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-800">
                      {resp.title}
                    </p>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2 px-5 py-4">
                  {resp.options.map((option: IOption, j: number) => {
                    const isThisCorrect = option.value === resp.correct;
                    const isThisSelected = option.value === resp.response;
                    const isWrongSelection = isThisSelected && !isThisCorrect;

                    let containerClass =
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all";
                    if (isThisCorrect) {
                      containerClass +=
                        " bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium";
                    } else if (isWrongSelection) {
                      containerClass +=
                        " bg-rose-50 border border-rose-200 text-rose-700";
                    } else {
                      containerClass +=
                        " bg-slate-50/60 border border-slate-100 text-slate-600";
                    }

                    return (
                      <div key={j} className={containerClass}>
                        {isThisCorrect ? (
                          <FiCheck
                            className="shrink-0 text-emerald-600"
                            size={16}
                            strokeWidth={3}
                          />
                        ) : isWrongSelection ? (
                          <FiX
                            className="shrink-0 text-rose-500"
                            size={16}
                            strokeWidth={3}
                          />
                        ) : (
                          <span className="h-4 w-4 shrink-0 rounded-full border-2 border-slate-200" />
                        )}
                        <span style={{ wordBreak: "break-word" }}>
                          {option.value}
                        </span>
                        {isThisSelected && (
                          <span className="ml-auto shrink-0 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400 shadow-sm">
                            {subject} pick
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyResponse resource="Responses" />
      )}
    </div>
  );
};
