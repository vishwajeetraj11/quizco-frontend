import { FiBarChart2, FiHelpCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IQuiz } from "../shared/interfaces";
import { Button } from "../ui";

interface Props extends IQuiz {
  onSelect?: () => void;
  score?: number;
  deleted?: boolean;
  redirect?: string;
  selected?: boolean;
  onClose: () => void;
}

export const QuizModalContents: React.FC<Props> = ({
  onClose,
  title,
  description,
  tags,
  attemptsCount,
  questionsCount,
  _id,
}) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden p-5 md:p-8">
      <div className="overflow-auto">
        <div className="rounded-[28px] bg-[radial-gradient(circle_at_top_right,_rgba(45,212,191,0.12),_transparent_34%),linear-gradient(180deg,_rgba(248,250,252,0.92)_0%,_rgba(255,255,255,0.98)_100%)] p-6 md:p-8">
          <span className="section-chip">Quiz overview</span>
          <p className="mt-5 text-3xl font-semibold text-slate-900">{title}</p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            {description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-white px-5 py-5 shadow-sm">
              <div className="flex items-center gap-3 text-slate-500">
                <FiBarChart2 className="text-teal-600" size={18} />
                <p
                  className="text-xs font-medium uppercase"
                  style={{ letterSpacing: "0.18em" }}
                >
                  Attempts recorded
                </p>
              </div>
              <p className="mt-4 text-4xl font-semibold text-slate-900">
                {attemptsCount}
              </p>
            </div>

            <div className="rounded-[24px] bg-white px-5 py-5 shadow-sm">
              <div className="flex items-center gap-3 text-slate-500">
                <FiHelpCircle className="text-amber-500" size={18} />
                <p
                  className="text-xs font-medium uppercase"
                  style={{ letterSpacing: "0.18em" }}
                >
                  Questions included
                </p>
              </div>
              <p className="mt-4 text-4xl font-semibold text-slate-900">
                {questionsCount}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-end gap-3">
            <Button onClick={onClose} variant="outlined" color="secondary">
              Close
            </Button>
            <Button
              onClick={() => navigate(`/quizes/${_id}`)}
              variant="contained"
              color="primary"
            >
              Begin Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
