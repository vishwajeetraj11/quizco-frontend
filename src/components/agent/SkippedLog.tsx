import { FiSkipForward } from "react-icons/fi";
import { useAgentSkipped } from "../../shared/queries";
import { ISkippedQuiz } from "../../shared/interfaces";
import { Loader } from "../Svgs";

export const SkippedLog: React.FC = () => {
  const { data, isLoading, isError } = useAgentSkipped();

  if (isLoading) return <Loader halfScreen />;

  if (isError) {
    return (
      <div className="app-panel-soft px-6 py-8 text-center">
        <p className="text-sm text-red-600">Could not load skipped log.</p>
      </div>
    );
  }

  const skipped: ISkippedQuiz[] = data?.skipped || data || [];

  if (skipped.length === 0) {
    return (
      <div className="app-panel-soft px-6 py-12 text-center">
        <FiSkipForward className="mx-auto text-slate-400" size={32} />
        <p className="mt-3 text-sm font-medium text-slate-600">
          No skipped quizzes to show.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">
        Quizzes the agent decided not to generate, and why.
      </p>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-4 py-3 font-semibold text-slate-600">Topic</th>
              <th className="px-4 py-3 font-semibold text-slate-600">
                Difficulty
              </th>
              <th className="px-4 py-3 font-semibold text-slate-600">
                Similarity
              </th>
              <th className="px-4 py-3 font-semibold text-slate-600">
                Closest Match
              </th>
              <th className="px-4 py-3 font-semibold text-slate-600">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {skipped.map((s, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-800">
                  {s.topic}
                </td>
                <td className="px-4 py-3 text-slate-600">{s.difficulty}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      s.similarityScore > 0.9
                        ? "bg-rose-50 text-rose-700"
                        : s.similarityScore > 0.85
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {Math.round(s.similarityScore * 100)}%
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{s.closestMatch}</td>
                <td className="px-4 py-3 text-slate-500">{s.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
