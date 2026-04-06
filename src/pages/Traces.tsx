import { useUser } from "@clerk/clerk-react";
import { useMemo, useState } from "react";
import { FiActivity, FiArrowRight, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loader } from "../components/Svgs";
import { IAgentTraceRun } from "../shared/interfaces";
import { useAgentTraceRuns } from "../shared/queries";
import { isAgentAdmin } from "../shared/utils";

const extractTraceRuns = (payload: unknown): IAgentTraceRun[] => {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const record = payload as Record<string, any>;
  const candidates = [record.traces, record?.data?.traces, record.data];

  for (const candidate of candidates) {
    if (!Array.isArray(candidate)) {
      continue;
    }

    return candidate
      .map((run: any) => ({
        ...run,
        id: run?.id || run?._id,
        _id: run?._id || run?.id,
      }))
      .filter((run: IAgentTraceRun) => Boolean(run?.id && run?._id));
  }

  return [];
};

const formatDuration = (durationMs = 0) => {
  const totalSeconds = Math.max(0, Math.round(durationMs / 1000));
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  if (mins <= 0) {
    return `${secs}s`;
  }

  return `${mins}m ${secs}s`;
};

const getRunDurationMs = (run: IAgentTraceRun) => {
  if (run.status !== "running") {
    return run.durationMs || 0;
  }

  if (!run.startedAt) {
    return run.durationMs || 0;
  }

  const startedAt = new Date(run.startedAt).getTime();
  if (Number.isNaN(startedAt)) {
    return run.durationMs || 0;
  }

  return Math.max(0, Date.now() - startedAt);
};

const formatDateTime = (value?: string | null) => {
  if (!value) {
    return "N/A";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString();
};

const statusStyles: Record<string, string> = {
  running: "bg-sky-50 text-sky-700",
  completed: "bg-emerald-50 text-emerald-700",
  failed: "bg-rose-50 text-rose-700",
  skipped: "bg-amber-50 text-amber-700",
};

export const Traces: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { isLoaded, user } = useUser();
  const canAccess = isAgentAdmin(user?.primaryEmailAddress?.emailAddress || null);
  const { data, isLoading, isError, isFetching } = useAgentTraceRuns(
    { page, limit: 20 },
    {
      refetchInterval: 3000,
      refetchIntervalInBackground: true,
    }
  );
  const traces = useMemo(() => extractTraceRuns(data), [data]);
  const total = (data as any)?.total || (data as any)?.data?.total || traces.length;
  const hasPrev = page > 1;
  const hasNext = page * 20 < total;
  const hasRunning = traces.some((run) => run.status === "running");

  if (!isLoaded || isLoading) {
    return <Loader halfScreen />;
  }

  if (!canAccess) {
    return (
      <ErrorMessage
        statusCode={403}
        message="AI Agent traces are only accessible to admin."
      />
    );
  }

  if (isError) {
    return (
      <div className="app-panel-soft px-6 py-8 text-center">
        <p className="text-sm text-rose-600">Could not load traces right now.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Agent Traces</h1>
          <p className="mt-1 text-sm text-slate-500">
            Inspect each run as a graph, timeline, and JSON execution trace.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Live refresh: every 3s
            {hasRunning ? " while runs are active" : ""}
            {isFetching && !isLoading ? " · updating..." : ""}
          </p>
        </div>
        <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          {total} total runs
        </div>
      </div>

      {traces.length === 0 ? (
        <div className="app-panel-soft px-6 py-12 text-center">
          <FiClock className="mx-auto text-slate-400" size={30} />
          <p className="mt-3 text-sm font-medium text-slate-600">
            No trace runs available yet.
          </p>
        </div>
      ) : (
        <div className="app-panel-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-slate-50/90 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Run</th>
                  <th className="px-4 py-3">Start Time</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Spans</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {traces.map((run) => (
                  <tr
                    key={run._id}
                    className="cursor-pointer border-t border-slate-200/70 text-sm text-slate-700 transition-colors hover:bg-slate-50/70"
                    onClick={() => navigate(`/traces/${run.id}`)}
                  >
                    <td className="px-4 py-3">
                      <div className="inline-flex items-center gap-2">
                        <FiActivity className="text-slate-500" />
                        <span className="font-medium text-slate-900">
                          {run.name || "Agent Run"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{formatDateTime(run.startedAt)}</td>
                    <td className="px-4 py-3">{formatDuration(getRunDurationMs(run))}</td>
                    <td className="px-4 py-3">{run.spanCount || 0}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                          statusStyles[run.status] || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {run.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-700">
                        View
                        <FiArrowRight size={14} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-slate-200/70 px-4 py-3">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-xs text-slate-500">Page {page}</span>
            <button
              type="button"
              disabled={!hasNext}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
