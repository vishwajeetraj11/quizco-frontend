import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { IQuiz } from "../shared/interfaces";

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
    <div className="p-5 md:p-10 overflow-hidden">
      <div style={{ maxHeight: "500px" }} className="overflow-auto">
        <div>
          <p className="text-xl font-medium">{title}</p>
          <p className="my-6">{description}</p>
          <div className="grid items-center mb-2 grid-quiz-modal-descriptions">
            <p className="font-medium text-indigo-600">
              Number of times People played this Quiz:{" "}
            </p>
            <span className="justify-self-start ml-4 text-white font-bold h-8 w-8 flex items-center justify-center bg-indigo-600 rounded-full">
              {attemptsCount}
            </span>
          </div>
          <div className="items-center grid grid-quiz-modal-descriptions">
            <p className="font-medium text-indigo-600">Number of Questions:</p>
            <span className="ml-4 text-white font-bold h-8 w-8 flex items-center justify-center bg-indigo-600 rounded-full">
              {questionsCount}
            </span>
          </div>

          <div className="flex mt-2 flex-wrap">
            {tags.map((tag, i) => (
              <p
                key={i}
                style={{
                  boxShadow: "0 5px 10px rgba(0,0,0,0.07)",
                  fontSize: "11px",
                  letterSpacing: "0.1px",
                  maxWidth: 100,
                }}
                className="mr-5 mt-2 text-xs py-0.5 px-2 bg-slate-300 rounded font-medium text-gray-700 break-words"
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <div className="mr-4">
            <Button onClick={onClose} variant="outlined" color="secondary">
              Close
            </Button>
          </div>
          <Button
            onClick={() => navigate(`/quizes/${_id}`)}
            variant="contained"
            color="primary"
          >
            Begin
          </Button>
        </div>
      </div>
    </div>
  );
};
