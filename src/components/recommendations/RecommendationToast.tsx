import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiTrendingUp,
  FiStar,
  FiZap,
  FiRefreshCw,
  FiGift,
  FiHeart,
} from "react-icons/fi";
import { IRecommendation, RecommendationType } from "../../shared/interfaces";
import { useRecommendations } from "../../shared/queries";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { endpoints } from "../../shared/urls";

const typeConfig: Record<
  RecommendationType,
  { icon: React.ReactNode; accent: string }
> = {
  for_you: { icon: <FiHeart size={16} />, accent: "text-rose-500" },
  trending: { icon: <FiTrendingUp size={16} />, accent: "text-amber-500" },
  new_drop: { icon: <FiGift size={16} />, accent: "text-teal-500" },
  comeback: { icon: <FiRefreshCw size={16} />, accent: "text-sky-500" },
  challenge: { icon: <FiZap size={16} />, accent: "text-indigo-500" },
  re_engage: { icon: <FiStar size={16} />, accent: "text-emerald-500" },
};

const Toast: React.FC<{
  rec: IRecommendation;
  onDismiss: () => void;
}> = ({ rec, onDismiss }) => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const config = typeConfig[rec.type] || typeConfig.for_you;

  const handleClick = async () => {
    try {
      const token = await getToken();
      await axios.post(endpoints.recommendationClick(rec._id), {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    navigate(`/quizes/${rec.quizId}`);
  };

  const handleDismiss = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const token = await getToken();
      await axios.post(endpoints.recommendationDismiss(rec._id), {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    onDismiss();
  };

  return (
    <div
      onClick={handleClick}
      className="animate-slide-up cursor-pointer rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-2xl"
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${config.accent}`}>{config.icon}</div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800">{rec.message}</p>
          {rec.quiz && (
            <p className="mt-0.5 truncate text-xs text-slate-500">
              {rec.quiz.title}
            </p>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <FiX size={14} />
        </button>
      </div>
    </div>
  );
};

export const RecommendationToasts: React.FC = () => {
  const { data } = useRecommendations();
  const [dismissed, setDismissed] = useState<string[]>([]);

  const recommendations: IRecommendation[] = (
    data?.recommendations || data || []
  ).filter((r: IRecommendation) => !dismissed.includes(r._id));

  // Only show the most recent 2
  const visible = recommendations.slice(0, 2);

  if (visible.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-80 flex-col gap-2">
      {visible.map((rec) => (
        <Toast
          key={rec._id}
          rec={rec}
          onDismiss={() =>
            setDismissed((prev) => [...prev, rec._id])
          }
        />
      ))}
    </div>
  );
};
