import { FiClock, FiAlertTriangle } from "react-icons/fi";
import { useAgentRuns } from "../../shared/queries";
import { IAgentRun } from "../../shared/interfaces";
import { Loader } from "../Svgs";
import { formatDate } from "../../shared/formatDate";

const extractRuns = (payload: unknown): IAgentRun[] => {
  if (Array.isArray(payload)) {
    return payload as IAgentRun[];
  }

  if (!payload || typeof payload !== "object") {
    return [];
  }

  const record = payload as Record<string, unknown>;
  if (Array.isArray(record.runs)) {
    return record.runs as IAgentRun[];
  }

  if (record.data && typeof record.data === "object") {
    const nested = record.data as Record<string, unknown>;
    if (Array.isArray(nested.runs)) {
      return nested.runs as IAgentRun[];
    }
    if (Array.isArray(record.data)) {
      return record.data as IAgentRun[];
    }
  }

  return [];
};

const statusStyles: Record<string, string> = {
  queued: "bg-amber-50 text-amber-700",
  running: "bg-sky-50 text-sky-700",
  completed: "bg-emerald-50 text-emerald-700",
  failed: "bg-rose-50 text-rose-700",
};

export const RunHistory: React.FC = () => {
  const { data, isLoading, isError } = useAgentRuns();

  if (isLoading) return <Loader halfScreen />;

  if (isError) {
    return (
      <div className="app-panel-soft px-6 py-8 text-center">
        <p className="text-sm text-red-600">Could not load run history.</p>
      </div>
    );
  }

  const runs = extractRuns(data);

  if (runs.length === 0) {
    return (
      <div className="app-panel-soft px-6 py-12 text-center">
        <FiClock className="mx-auto text-slate-400" size={32} />
        <p className="mt-3 text-sm font-medium text-slate-600">
          No agent runs recorded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {runs.map((run) => (
        <div key={run._id} className="app-panel-soft px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {formatDate(run.ranAt)}
              </p>
              <p className="mt-1 text-sm text-slate-600">{run.summary}</p>
            </div>
            <div className="shrink-0 text-right text-xs text-slate-500">
              <p>{(run.durationMs / 1000).toFixed(1)}s</p>
              <p className="mt-0.5">${run.costUSD.toFixed(3)}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-xs">
            <span className="rounded-full bg-teal-50 px-2.5 py-1 font-medium text-teal-700">
              {run.quizzesGenerated} generated
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">
              {run.quizzesSkipped} skipped
            </span>
            <span className="rounded-full bg-sky-50 px-2.5 py-1 font-medium text-sky-700">
              {run.recommendationsSent} recommendations
            </span>
            {run.trigger && (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium capitalize text-slate-600">
                {run.trigger}
              </span>
            )}
            {run.requestedBy && (
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-medium text-indigo-700">
                {run.requestedBy}
              </span>
            )}
            {run.status && (
              <span
                className={`rounded-full px-2.5 py-1 font-medium capitalize ${
                  statusStyles[run.status] || "bg-slate-100 text-slate-600"
                }`}
              >
                {run.status}
              </span>
            )}
            {run.errors?.length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 font-medium text-rose-700">
                <FiAlertTriangle size={12} />
                {run.errors.length} error{run.errors.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {run.errors?.length > 0 && (
            <div className="mt-3 space-y-1">
              {run.errors.map((err, i) => (
                <p key={i} className="text-xs text-rose-600">
                  {err}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
