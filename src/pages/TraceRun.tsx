import { useUser } from "@clerk/clerk-react";
import { useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiClock, FiGitBranch, FiRefreshCcw } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loader } from "../components/Svgs";
import { IAgentSpan, IAgentTraceRun } from "../shared/interfaces";
import { useAgentTraceRun } from "../shared/queries";
import { isAgentAdmin } from "../shared/utils";

const spanColors: Record<string, { bg: string; border: string }> = {
  llm_call: { bg: "rgba(59, 130, 246, 0.15)", border: "#3b82f6" },
  tool_call: { bg: "rgba(147, 51, 234, 0.15)", border: "#9333ea" },
  decision: { bg: "rgba(250, 204, 21, 0.2)", border: "#ca8a04" },
  error: { bg: "rgba(239, 68, 68, 0.16)", border: "#ef4444" },
  custom: { bg: "rgba(148, 163, 184, 0.2)", border: "#64748b" },
};

const extractTraceDetail = (
  payload: unknown
): { run: IAgentTraceRun | null; spans: IAgentSpan[] } => {
  if (!payload || typeof payload !== "object") {
    return { run: null, spans: [] };
  }

  const record = payload as Record<string, any>;
  const runCandidate = record.run || record?.data?.run || null;
  const spansCandidate = record.spans || record?.data?.spans || [];

  const run: IAgentTraceRun | null = runCandidate
    ? {
        ...runCandidate,
        id: runCandidate.id || runCandidate._id,
        _id: runCandidate._id || runCandidate.id,
      }
    : null;
  const spans: IAgentSpan[] = Array.isArray(spansCandidate)
    ? spansCandidate
        .map((span: any) => ({
          ...span,
          id: span.id || span._id,
          _id: span._id || span.id,
        }))
        .filter((span: IAgentSpan) => Boolean(span._id))
    : [];

  return { run, spans };
};

const toTime = (value?: string | null) => {
  if (!value) {
    return 0;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

const formatDateTime = (value?: string | null) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
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

const getRunDurationMs = (run: IAgentTraceRun | null) => {
  if (!run) {
    return 0;
  }

  if (run.status !== "running") {
    return run.durationMs || 0;
  }

  const startedAt = toTime(run.startedAt);
  if (!startedAt) {
    return run.durationMs || 0;
  }

  return Math.max(0, Date.now() - startedAt);
};

const extractTopicFromSpan = (span: IAgentSpan): string | null => {
  const input = span.input as Record<string, any> | undefined;
  const topic = input?.topic;

  if (typeof topic !== "string") {
    return null;
  }

  const trimmed = topic.trim();
  return trimmed || null;
};

const extractSpanStatus = (span: IAgentSpan) => {
  const output = span.output as Record<string, any> | undefined;
  const outputStatus = output?.status;

  if (typeof outputStatus === "string" && outputStatus.trim()) {
    return outputStatus.trim();
  }

  return span.endedAt ? "completed" : "running";
};

const safeJsonStringify = (value: any) => {
  if (value === undefined) {
    return "";
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};

const JsonBlock: React.FC<{ title: string; value: any }> = ({ title, value }) => {
  const content = safeJsonStringify(value);

  return (
    <details className="rounded-2xl border border-slate-200 bg-slate-50/70 px-3 py-2">
      <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-slate-600">
        {title}
      </summary>
      <div className="mt-2">
        {content ? (
          <pre className="max-h-64 overflow-auto rounded-xl bg-slate-900 p-3 text-xs text-slate-100">
            {content}
          </pre>
        ) : (
          <p className="text-xs text-slate-500">No data</p>
        )}
      </div>
    </details>
  );
};

const buildGraph = (
  run: IAgentTraceRun | null,
  spans: IAgentSpan[],
  selectedNodeId: string
): { nodes: Node[]; edges: Edge[] } => {
  const sortedSpans = [...spans].sort(
    (left, right) =>
      toTime(left.startedAt || left.createdAt) -
      toTime(right.startedAt || right.createdAt)
  );
  const spanById = new Map(sortedSpans.map((span) => [span._id, span]));
  const children = new Map<string, string[]>();

  children.set("run-root", []);
  for (const span of sortedSpans) {
    children.set(span._id, []);
  }

  for (const span of sortedSpans) {
    const hasParent =
      !!span.parentSpanId &&
      span.parentSpanId !== span._id &&
      spanById.has(span.parentSpanId);
    const parentKey = hasParent ? span.parentSpanId! : "run-root";
    const bucket = children.get(parentKey) || [];
    bucket.push(span._id);
    children.set(parentKey, bucket);
  }

  const nodes: Node[] = [
    {
      id: "run-root",
      position: { x: 30, y: 30 },
      data: { label: run?.name || "Agent Run" },
      draggable: false,
      style: {
        borderRadius: 14,
        border: selectedNodeId === "run-root" ? "2px solid #0f766e" : "1px solid #cbd5e1",
        background: "rgba(15, 118, 110, 0.12)",
        color: "#0f172a",
        width: 220,
        fontSize: 12,
        fontWeight: 600,
      },
    },
  ];
  const edges: Edge[] = [];
  let row = 0;
  const visited = new Set<string>();

  const visit = (parentKey: string, depth: number) => {
    const childIds = children.get(parentKey) || [];

    for (const childId of childIds) {
      if (visited.has(childId)) {
        continue;
      }

      visited.add(childId);
      const span = spanById.get(childId);

      if (!span) {
        continue;
      }

      const colors = spanColors[span.type] || spanColors.custom;
      nodes.push({
        id: span._id,
        position: { x: 280 + depth * 280, y: 40 + row * 120 },
        data: {
          label: `${span.name} (${span.type})`,
        },
        draggable: false,
        style: {
          width: 250,
          borderRadius: 14,
          border:
            selectedNodeId === span._id
              ? `2px solid ${colors.border}`
              : `1px solid ${colors.border}`,
          background: colors.bg,
          color: "#0f172a",
          fontSize: 12,
          fontWeight: 500,
        },
      });
      edges.push({
        id: `${parentKey}-${span._id}`,
        source: parentKey,
        target: span._id,
        animated: span.type === "llm_call",
        style: {
          stroke: colors.border,
          strokeWidth: 1.5,
        },
      });
      row += 1;
      visit(span._id, depth + 1);
    }
  };

  visit("run-root", 0);

  for (const span of sortedSpans) {
    if (visited.has(span._id)) {
      continue;
    }

    const colors = spanColors[span.type] || spanColors.custom;
    nodes.push({
      id: span._id,
      position: { x: 280, y: 40 + row * 120 },
      data: {
        label: `${span.name} (${span.type})`,
      },
      draggable: false,
      style: {
        width: 250,
        borderRadius: 14,
        border:
          selectedNodeId === span._id
            ? `2px solid ${colors.border}`
            : `1px solid ${colors.border}`,
        background: colors.bg,
        color: "#0f172a",
        fontSize: 12,
        fontWeight: 500,
      },
    });
    edges.push({
      id: `orphan-run-root-${span._id}`,
      source: "run-root",
      target: span._id,
      style: {
        stroke: colors.border,
        strokeWidth: 1.5,
      },
    });
    row += 1;
  }

  return { nodes, edges };
};

export const TraceRun: React.FC = () => {
  const { runId = "" } = useParams();
  const { isLoaded, user } = useUser();
  const canAccess = isAgentAdmin(user?.primaryEmailAddress?.emailAddress || null);
  const { data, isLoading, isError, isFetching } = useAgentTraceRun(runId, {
    refetchInterval: (latestData: any) => {
      const latest = extractTraceDetail(latestData);
      return latest.run?.status === "running" ? 2000 : false;
    },
    refetchIntervalInBackground: true,
  });
  const detail = useMemo(() => extractTraceDetail(data), [data]);
  const spans = useMemo(
    () =>
      [...detail.spans].sort(
        (left, right) =>
          toTime(left.startedAt || left.createdAt) -
          toTime(right.startedAt || right.createdAt)
      ),
    [detail.spans]
  );
  const [selectedNodeId, setSelectedNodeId] = useState("run-root");
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const runDurationMs = useMemo(() => getRunDurationMs(detail.run), [detail.run]);

  useEffect(() => {
    setSelectedNodeId("run-root");
    setIsInspectorOpen(false);
  }, [runId]);

  useEffect(() => {
    if (selectedNodeId === "run-root") {
      return;
    }

    const selectedStillExists = spans.some((span) => span._id === selectedNodeId);
    if (!selectedStillExists) {
      setSelectedNodeId("run-root");
    }
  }, [selectedNodeId, spans]);

  const selectedSpan = spans.find((span) => span._id === selectedNodeId) || null;
  const selectSpan = (spanId: string) => {
    setSelectedNodeId(spanId);
    setIsInspectorOpen(true);
  };
  const graph = useMemo(
    () => buildGraph(detail.run, spans, selectedNodeId),
    [detail.run, spans, selectedNodeId]
  );
  const selectedTimelineIndex = Math.max(
    0,
    spans.findIndex((span) => span._id === selectedNodeId)
  );
  const loopTopics = useMemo(() => {
    const topicMap = new Map<
      string,
      { topic: string; attempts: number; lastStatus: string; lastSeenAt: number }
    >();

    for (const span of spans) {
      const topic = extractTopicFromSpan(span);
      if (!topic) {
        continue;
      }

      const seenAt = toTime(span.startedAt || span.createdAt);
      const status = extractSpanStatus(span);
      const existing = topicMap.get(topic);

      if (!existing) {
        topicMap.set(topic, {
          topic,
          attempts: 1,
          lastStatus: status,
          lastSeenAt: seenAt,
        });
        continue;
      }

      existing.attempts += 1;
      if (seenAt >= existing.lastSeenAt) {
        existing.lastSeenAt = seenAt;
        existing.lastStatus = status;
      }
    }

    return Array.from(topicMap.values()).sort(
      (left, right) => right.lastSeenAt - left.lastSeenAt
    );
  }, [spans]);
  const loopSteps = useMemo(() => {
    const stepMap = new Map<
      string,
      { name: string; count: number; active: number; types: Set<string> }
    >();

    for (const span of spans) {
      const key = span.name || "unnamed_step";
      const existing = stepMap.get(key);

      if (!existing) {
        stepMap.set(key, {
          name: key,
          count: 1,
          active: span.endedAt ? 0 : 1,
          types: new Set([span.type]),
        });
        continue;
      }

      existing.count += 1;
      existing.active += span.endedAt ? 0 : 1;
      existing.types.add(span.type);
    }

    return Array.from(stepMap.values())
      .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
      .map((item) => ({
        ...item,
        types: Array.from(item.types),
      }));
  }, [spans]);

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

  if (isError || !detail.run) {
    return (
      <div className="app-panel-soft px-6 py-8 text-center">
        <p className="text-sm text-rose-600">Could not load this trace run.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            to="/traces"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500 hover:text-slate-700"
          >
            <FiArrowLeft size={14} />
            Back to traces
          </Link>
          <h1 className="mt-2 text-2xl font-black text-slate-900">
            {detail.run.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {formatDateTime(detail.run.startedAt)} · {formatDuration(runDurationMs)} ·{" "}
            {spans.length} spans
          </p>
          {detail.run.status === "running" && (
            <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              <FiRefreshCcw className={isFetching ? "animate-spin" : ""} size={12} />
              Live updates every 2s
            </p>
          )}
        </div>
        <span
          className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
            detail.run.status === "completed"
              ? "bg-emerald-50 text-emerald-700"
              : detail.run.status === "failed"
              ? "bg-rose-50 text-rose-700"
              : detail.run.status === "running"
              ? "bg-sky-50 text-sky-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {detail.run.status}
        </span>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setIsInspectorOpen((current) => !current)}
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
        >
          {isInspectorOpen ? "Hide Selected Span Panel" : "Show Selected Span Panel"}
        </button>
      </div>

      <div
        className={`grid gap-4 ${
          isInspectorOpen ? "lg:grid-cols-[minmax(0,1fr)_360px]" : "grid-cols-1"
        }`}
      >
        <div className="app-panel-soft h-[560px] overflow-hidden p-2">
          <ReactFlow
            nodes={graph.nodes}
            edges={graph.edges}
            fitView
            onNodeClick={(_, node) => selectSpan(node.id)}
            className="rounded-2xl bg-white"
          >
            <MiniMap
              nodeColor={(node) => {
                if (node.id === "run-root") {
                  return "#0f766e";
                }

                const span = spans.find((item) => item._id === node.id);
                return (span && spanColors[span.type]?.border) || spanColors.custom.border;
              }}
            />
            <Controls />
            <Background gap={20} size={1} color="#cbd5e1" />
          </ReactFlow>
        </div>

        {isInspectorOpen && (
          <aside className="app-panel-soft h-[560px] overflow-y-auto px-4 py-4">
          {selectedSpan ? (
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Selected Span
                </p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                  {selectedSpan.name}
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold capitalize"
                    style={{
                      background:
                        spanColors[selectedSpan.type]?.bg || spanColors.custom.bg,
                      color: spanColors[selectedSpan.type]?.border || spanColors.custom.border,
                    }}
                  >
                    {selectedSpan.type}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    <FiClock className="mr-1 inline-block" size={12} />
                    {formatDuration(selectedSpan.durationMs || 0)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <JsonBlock title="Input JSON" value={selectedSpan.input} />
                <JsonBlock title="Output JSON" value={selectedSpan.output} />
                <JsonBlock title="Metadata JSON" value={selectedSpan.metadata} />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Run Details
              </p>
              <h2 className="text-lg font-semibold text-slate-900">{detail.run.name}</h2>
              <p className="text-sm text-slate-600">
                Status: <span className="font-medium capitalize">{detail.run.status}</span>
              </p>
              <p className="text-sm text-slate-600">
                Started: <span className="font-medium">{formatDateTime(detail.run.startedAt)}</span>
              </p>
              <p className="text-sm text-slate-600">
                Ended: <span className="font-medium">{formatDateTime(detail.run.endedAt)}</span>
              </p>
              <p className="text-sm text-slate-600">
                Duration: <span className="font-medium">{formatDuration(runDurationMs)}</span>
              </p>
              <JsonBlock title="Run Metadata JSON" value={detail.run.metadata} />
            </div>
          )}
          </aside>
        )}
      </div>

      <div className="app-panel-soft px-4 py-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <FiGitBranch size={13} />
          Timeline
        </div>

        {spans.length === 0 ? (
          <p className="text-sm text-slate-500">No spans available in this run.</p>
        ) : (
          <div className="space-y-3">
            <input
              type="range"
              min={0}
              max={Math.max(0, spans.length - 1)}
              value={selectedTimelineIndex}
              onChange={(event) => {
                const nextIndex = Number(event.target.value);
                const nextSpan = spans[nextIndex];

                if (!nextSpan) {
                  return;
                }

                selectSpan(nextSpan._id);
              }}
              className="w-full"
            />
            <div className="flex items-center justify-between gap-3 text-xs text-slate-600">
              <span>
                {selectedSpan
                  ? `${selectedSpan.name} (${selectedSpan.type})`
                  : detail.run.name}
              </span>
              <span>
                {selectedSpan
                  ? formatDateTime(selectedSpan.startedAt || selectedSpan.createdAt)
                  : formatDateTime(detail.run.startedAt)}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <div className="app-panel-soft px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Loop Topics
          </p>
          {loopTopics.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">
              No topic-level loop items detected yet.
            </p>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              {loopTopics.map((topic) => (
                <span
                  key={topic.topic}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {topic.topic} · {topic.lastStatus} · {topic.attempts}x
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="app-panel-soft max-h-72 overflow-y-auto px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Loop Steps
          </p>
          {loopSteps.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">No loop steps found yet.</p>
          ) : (
            <div className="mt-2 space-y-2">
              {loopSteps.map((step) => (
                <div
                  key={step.name}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2"
                >
                  <p className="text-sm font-medium text-slate-900">{step.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {step.count} span{step.count === 1 ? "" : "s"} · {step.types.join(", ")}
                    {step.active > 0 ? ` · ${step.active} active` : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
