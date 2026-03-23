import {
  FiAlertTriangle,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiDatabase,
  FiLayers,
  FiPlay,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { useQueryClient } from "react-query";
import { useAgentHealth, useTriggerAgentRun } from "../../shared/queries";
import { IPlatformHealth } from "../../shared/interfaces";
import { Button } from "../../ui";
import { useSnackbar } from "../../ui/snackbar";
import { Loader } from "../Svgs";

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const formatLastRun = (value?: string | null) => {
  if (!value) {
    return "Never";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export const HealthPanel: React.FC = () => {
  const { data, isLoading, isError } = useAgentHealth();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: triggerAgentRun, isLoading: isTriggering } =
    useTriggerAgentRun({
      onSuccess: () => {
        [
          ["Agent Briefing"],
          ["Agent Pending"],
          ["Agent Skipped"],
          ["Agent Runs"],
          ["Agent Health"],
        ].forEach((key) => {
          queryClient.invalidateQueries(key);
        });
        enqueueSnackbar("Agent run queued successfully.", {
          variant: "success",
        });
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Could not start the agent run. Please try again.";
        enqueueSnackbar(message, { variant: "error" });
      },
    });

  if (isLoading) return <Loader halfScreen />;

  if (isError) {
    return (
      <div className="app-panel-soft px-6 py-8 text-center">
        <p className="text-sm text-red-600">Could not load platform health.</p>
      </div>
    );
  }

  const rawHealth: IPlatformHealth | undefined = data;
  const health = rawHealth?.data ?? rawHealth;
  if (!health) return null;

  const blockers = health.preflight?.blockers ?? [];
  const topicVelocity = health.topicVelocity ?? [];
  const contentDepth = health.contentDepth ?? [];
  const hasTopicVelocity = topicVelocity.length > 0;
  const hasContentDepth = contentDepth.length > 0;
  const hasDau = isFiniteNumber(health.dau);
  const hasTrend = isFiniteNumber(health.dauTrend);
  const hasCompletionRate = isFiniteNumber(health.completionRate);
  const isRunning = health.running === true;
  const isBlocked =
    health.status === "blocked" ||
    health.preflight?.allowed === false ||
    health.enabled === false;
  const dauLabel = hasDau ? health.dau!.toLocaleString() : "--";
  const trendTone = hasTrend
    ? health.dauTrend! >= 0
      ? "text-emerald-600"
      : "text-rose-600"
    : "text-slate-500";
  const trendLabel = hasTrend
    ? `${health.dauTrend! >= 0 ? "+" : ""}${health.dauTrend}% vs last week`
    : "No weekly comparison yet";
  const completionLabel = hasCompletionRate
    ? `${Math.round(health.completionRate! * 100)}%`
    : "--";
  const statusTone = isRunning
    ? {
        card: "border-sky-200 bg-sky-50/70",
        icon: <FiClock size={16} className="text-sky-600" />,
        label: "Agent running",
        text: "text-sky-800",
      }
    : isBlocked
    ? {
        card: "border-amber-200 bg-amber-50/70",
        icon: <FiAlertTriangle size={16} className="text-amber-600" />,
        label: "Agent blocked",
        text: "text-amber-800",
      }
    : {
        card: "border-emerald-200 bg-emerald-50/70",
        icon: <FiCheckCircle size={16} className="text-emerald-600" />,
        label: "Agent ready",
        text: "text-emerald-800",
      };
  const runDisabled =
    isTriggering || isRunning || health.enabled === false || health.preflight?.allowed === false;

  const handleRunNow = () => {
    triggerAgentRun({ body: {} });
  };

  return (
    <div className="space-y-4">
      <div
        className={`app-panel-soft border px-5 py-5 ${statusTone.card}`}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              {statusTone.icon}
              <p className={`text-sm font-semibold ${statusTone.text}`}>
                {statusTone.label}
              </p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {isRunning
                ? "A tracked agent run is currently in progress. Fresh metrics and queue updates will appear when it finishes."
                : isBlocked
                ? blockers[0] ||
                  "The agent is currently disabled, so activity metrics are not available yet."
                : "The agent is enabled and ready to report platform health metrics."}
            </p>
            {blockers.length > 1 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {blockers.slice(1).map((blocker) => (
                  <span
                    key={blocker}
                    className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    {blocker}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <Button
              className="w-full sm:w-auto"
              color="primary"
              disabled={runDisabled}
              onClick={handleRunNow}
              variant="contained"
            >
              <span className="inline-flex items-center gap-2">
                <FiPlay size={15} />
                {isTriggering || isRunning ? "Run in Progress" : "Run Agent Now"}
              </span>
            </Button>
            <p className="max-w-sm text-xs text-slate-500 lg:text-right">
              {isRunning
                ? "Manual reruns are disabled until the active run finishes."
                : "Manually queue a fresh run to regenerate briefing data, pending quizzes, and health metrics."}
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/80 px-4 py-3">
                <div className="flex items-center gap-2 text-slate-500">
                  <FiDatabase size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Database
                  </span>
                </div>
                <p className="mt-2 text-lg font-semibold capitalize text-slate-900">
                  {health.database || "Unknown"}
                </p>
              </div>
              <div className="rounded-2xl bg-white/80 px-4 py-3">
                <div className="flex items-center gap-2 text-slate-500">
                  <FiCheckCircle size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Enabled
                  </span>
                </div>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {health.enabled ? "Yes" : "No"}
                </p>
              </div>
              <div className="rounded-2xl bg-white/80 px-4 py-3">
                <div className="flex items-center gap-2 text-slate-500">
                  <FiClock size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Last run
                  </span>
                </div>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {formatLastRun(health.lastRunAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="app-panel-soft px-5 py-5">
          <div className="flex items-center gap-2">
            <FiUsers size={16} className="text-teal-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Daily Active Users
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-900">
            {dauLabel}
          </p>
          <p
            className={`mt-1 text-xs font-semibold ${trendTone}`}
          >
            {trendLabel}
          </p>
        </div>

        <div className="app-panel-soft px-5 py-5">
          <div className="flex items-center gap-2">
            <FiBarChart2 size={16} className="text-sky-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Completion Rate
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-900">
            {completionLabel}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {hasCompletionRate
              ? "Completion based on recent agent activity"
              : "No completion data yet"}
          </p>
        </div>
      </div>

      {hasTopicVelocity && (
        <div className="app-panel-soft px-5 py-5">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <FiTrendingUp size={14} className="text-emerald-500" />
            Topic Velocity (plays/day)
          </h3>
          <div className="mt-4 space-y-2">
            {topicVelocity.map((tv) => {
              const maxVelocity = Math.max(
                ...topicVelocity.map((t) => t.velocity)
              );
              const pct = maxVelocity > 0 ? (tv.velocity / maxVelocity) * 100 : 0;
              return (
                <div key={tv.topic} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-xs font-medium text-slate-700">
                    {tv.topic}
                  </span>
                  <div className="flex-1">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-teal-500 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-12 text-right text-xs font-semibold text-slate-600">
                    {tv.velocity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {hasContentDepth && (
        <div className="app-panel-soft px-5 py-5">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <FiLayers size={14} className="text-indigo-500" />
            Content Depth (quizzes per topic)
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {contentDepth.map((cd) => (
              <div
                key={cd.topic}
                className="rounded-xl border border-slate-200 px-3 py-2"
              >
                <p className="text-xs font-medium text-slate-700">
                  {cd.topic}
                </p>
                <p className="mt-0.5 text-lg font-black text-slate-900">
                  {cd.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasTopicVelocity && !hasContentDepth && (
        <div className="app-panel-soft px-5 py-6">
          <h3 className="text-sm font-semibold text-slate-900">
            No analytics to show yet
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Once the agent is enabled and starts processing activity, this panel
            will fill in with topic velocity, content depth, and other usage
            signals instead of empty cards.
          </p>
        </div>
      )}
    </div>
  );
};
