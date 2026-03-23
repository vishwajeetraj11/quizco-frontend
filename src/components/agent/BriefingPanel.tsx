import {
  FiClock,
  FiFileText,
  FiSkipForward,
  FiSend,
  FiTrendingUp,
  FiAlertCircle,
  FiUsers,
} from "react-icons/fi";
import { useAgentBriefing } from "../../shared/queries";
import { Loader } from "../Svgs";
import { IAgentBriefing } from "../../shared/interfaces";

export const BriefingPanel: React.FC = () => {
  const { data, isLoading, isError } = useAgentBriefing();
  const rawBriefing: IAgentBriefing | undefined = data;
  const briefing = rawBriefing?.data ?? rawBriefing;

  if (isLoading) return <Loader halfScreen />;

  if (isError || !briefing) {
    return (
      <div className="app-panel-soft px-6 py-8 text-center">
        <p className="text-sm text-red-600">
          Could not load briefing. The agent may not have run yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {briefing.running && (
        <div className="app-panel-soft border border-sky-200 bg-sky-50/70 px-5 py-4">
          <div className="flex items-center gap-2 text-sky-800">
            <FiClock size={16} className="text-sky-600" />
            <p className="text-sm font-semibold">Agent run in progress</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            A manual or scheduled run is currently active. Briefing numbers will
            refresh after that run finishes.
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="app-panel-soft px-6 py-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
          <FiFileText size={14} />
          Morning Briefing
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          {briefing.summary || "The agent has not produced a briefing yet."}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="app-panel-soft px-5 py-5">
          <div className="flex items-center gap-2 text-teal-600">
            <FiFileText size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Quizzes Generated
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-900">
            {briefing.quizzesGenerated ?? 0}
          </p>
        </div>
        <div className="app-panel-soft px-5 py-5">
          <div className="flex items-center gap-2 text-amber-600">
            <FiSkipForward size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Quizzes Skipped
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-900">
            {briefing.quizzesSkipped ?? 0}
          </p>
        </div>
        <div className="app-panel-soft px-5 py-5">
          <div className="flex items-center gap-2 text-sky-600">
            <FiSend size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Recommendations Sent
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-900">
            {briefing.recommendationsSent ?? 0}
          </p>
        </div>
      </div>

      {/* Trending + Gaps + At-risk */}
      <div className="grid gap-4 sm:grid-cols-3">
        {(briefing.topTrending?.length ?? 0) > 0 && (
          <div className="app-panel-soft px-5 py-5">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <FiTrendingUp size={14} className="text-emerald-500" />
              Trending Topics
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {briefing.topTrending?.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {(briefing.contentGaps?.length ?? 0) > 0 && (
          <div className="app-panel-soft px-5 py-5">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <FiAlertCircle size={14} className="text-amber-500" />
              Content Gaps
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {briefing.contentGaps?.map((g) => (
                <span
                  key={g}
                  className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        )}

        {(briefing.atRiskUsers ?? 0) > 0 && (
          <div className="app-panel-soft px-5 py-5">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <FiUsers size={14} className="text-rose-500" />
              At-risk Users
            </h3>
            <p className="mt-3 text-3xl font-black text-slate-900">
              {briefing.atRiskUsers}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Inactive 3+ days
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
