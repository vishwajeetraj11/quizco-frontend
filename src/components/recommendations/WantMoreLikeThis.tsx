import { useState } from "react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { endpoints } from "../../shared/urls";

interface Props {
  quizId: string;
}

export const WantMoreLikeThis: React.FC<Props> = ({ quizId }) => {
  const [submitted, setSubmitted] = useState<"yes" | "no" | null>(null);
  const { getToken } = useAuth();

  const handleFeedback = async (wantMore: boolean) => {
    const choice = wantMore ? "yes" : "no";
    setSubmitted(choice);
    try {
      const token = await getToken();
      await axios.post(
        endpoints.trackEvent,
        {
          event: "want_more_like_this",
          data: { quizId, wantMore },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch {}
  };

  if (submitted) {
    return (
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
        {submitted === "yes" ? (
          <FiThumbsUp size={14} className="text-teal-600" />
        ) : (
          <FiThumbsDown size={14} className="text-slate-400" />
        )}
        <span>
          {submitted === "yes"
            ? "Great, we'll find more like this!"
            : "Got it, we'll mix things up."}
        </span>
      </div>
    );
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <span className="text-sm text-slate-500">Want more like this?</span>
      <button
        onClick={() => handleFeedback(true)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 transition-all hover:bg-teal-100"
      >
        <FiThumbsUp size={13} /> Yes
      </button>
      <button
        onClick={() => handleFeedback(false)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-100"
      >
        <FiThumbsDown size={13} /> No
      </button>
    </div>
  );
};
