import { FiPlay, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IQuiz } from "../../shared/interfaces";

interface Props {
  quiz: IQuiz | null;
  isLoading: boolean;
  onSkip: () => void;
}

export const StarterQuiz: React.FC<Props> = ({ quiz, isLoading, onSkip }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-md text-center">
        <div className="animate-pulse space-y-4">
          <div className="mx-auto h-6 w-48 rounded-xl bg-slate-200" />
          <div className="mx-auto h-40 rounded-2xl bg-slate-100" />
        </div>
      </div>
    );
  }

  if (!quiz) {
    return null;
  }

  return (
    <div className="mx-auto max-w-md text-center">
      <h2 className="text-2xl font-black text-slate-900">
        We found one for you
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        Try this quiz to get started, or skip to browse on your own.
      </p>

      <div className="mt-6 app-panel-soft p-5 text-left">
        <p className="text-lg font-bold text-slate-900">{quiz.title}</p>
        <p className="mt-1 text-sm text-slate-500">{quiz.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {quiz.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
          <span>{quiz.questionsCount} questions</span>
          <span>{quiz.attemptsCount} plays</span>
        </div>
        <button
          onClick={() => navigate(`/quizes/${quiz._id}`)}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-0.5 hover:bg-teal-700"
        >
          <FiPlay size={16} />
          Play Now
        </button>
      </div>

      <button
        onClick={onSkip}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
      >
        Skip, take me to the app
        <FiArrowRight size={14} />
      </button>
    </div>
  );
};
