import { useMatch, useNavigate } from "react-router-dom";
import { IQuiz } from "../shared/interfaces";

interface Props extends IQuiz {
  onSelect?: () => void;
  score?: number;
}

export const QuizCard: React.FC<Props> = ({
  title,
  description,
  tags,
  _id,
  onSelect,
  status,
  score,
}) => {
  const isDashboardPage = useMatch("/dashboard");
  const navigate = useNavigate();
  return (
    <div
      onClick={() => (onSelect ? onSelect() : navigate(`/quizes/${_id}`))}
      className="cursor-pointer shadow-md rounded-sm px-10 py-8"
    >
      {isDashboardPage && <p>{status}</p>}
      <p className="font-semibold">{title}</p>
      <p>{description}</p>
      {(score === 0 || score) && <p>Score : {score}</p>}
      <div className="flex mt-4">
        {tags.map((tag, i) => (
          <p
            key={i}
            style={{
              boxShadow: "0 5px 10px rgba(0,0,0,0.07)",
              fontSize: "11px",
              letterSpacing: "0.1px",
            }}
            className="mr-5 text-xs py-0.5 px-2 bg-slate-300 rounded font-medium text-gray-700"
          >
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};