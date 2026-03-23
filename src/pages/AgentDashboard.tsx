import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import {
  FiCpu,
  FiInbox,
  FiSkipForward,
  FiClock,
  FiActivity,
} from "react-icons/fi";
import { BriefingPanel } from "../components/agent/BriefingPanel";
import { ErrorMessage } from "../components/ErrorMessage";
import { PendingQuizList } from "../components/agent/PendingQuizCard";
import { SkippedLog } from "../components/agent/SkippedLog";
import { RunHistory } from "../components/agent/RunHistory";
import { HealthPanel } from "../components/agent/HealthPanel";
import { Loader } from "../components/Svgs";
import { isAgentAdmin } from "../shared/utils";

type Tab =
  | "briefing"
  | "pending"
  | "skipped"
  | "runs"
  | "health";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "briefing", label: "Briefing", icon: <FiCpu size={15} /> },
  { id: "pending", label: "Quiz Inbox", icon: <FiInbox size={15} /> },
  { id: "skipped", label: "Skipped", icon: <FiSkipForward size={15} /> },
  { id: "runs", label: "Run History", icon: <FiClock size={15} /> },
  { id: "health", label: "Platform Health", icon: <FiActivity size={15} /> },
];

export const AgentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("briefing");
  const { isLoaded, user } = useUser();
  const canAccessAgent = isAgentAdmin(
    user?.primaryEmailAddress?.emailAddress || null
  );

  if (!isLoaded) {
    return <Loader halfScreen />;
  }

  if (!canAccessAgent) {
    return (
      <ErrorMessage
        statusCode={403}
        message="AI Agent is only accessible to vishwajeetraj11@gmail.com."
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900">AI Agent</h1>
        <p className="mt-1 text-sm text-slate-500">
          Review what the agent made, approve or reject, and monitor platform
          health.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-white text-slate-600 shadow-sm hover:bg-slate-50"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "briefing" && <BriefingPanel />}
      {activeTab === "pending" && <PendingQuizList />}
      {activeTab === "skipped" && <SkippedLog />}
      {activeTab === "runs" && <RunHistory />}
      {activeTab === "health" && <HealthPanel />}
    </div>
  );
};
