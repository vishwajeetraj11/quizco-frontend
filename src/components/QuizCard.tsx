import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { IQuiz } from "../shared/interfaces";
import { ModalSkeleton } from "./Modal";
import { QuizModalContents } from "./QuizModalContents";

interface Props extends IQuiz {
  onSelect?: () => void;
  score?: number;
  deleted?: boolean;
  redirect?: string;
  selected?: boolean;
}

export const QuizCard: React.FC<Props> = (props) => {
  const {
    title,
    description,
    tags,
    onSelect,
    status,
    score,
    deleted,
    redirect,
    selected,
  } = props;
  const isDashboardPage = useMatch("/dashboard");
  const navigate = useNavigate();

  const [quizModalActive, setQuizModalActive] = useState(false);
  const handleQuizModalActive = () => setQuizModalActive(true);
  const handleQuizModalClose = () => {
    setQuizModalActive((p) => !p);
  };

  return (
    <>
      <div
        onClick={
          () =>
            onSelect
              ? onSelect()
              : deleted
              ? () => null
              : redirect
              ? navigate(redirect)
              : handleQuizModalActive()
          // : navigate(`/quizes/${_id}`)
        }
        className={`${
          deleted ? "" : "cursor-pointer "
        }relative shadow-md px-10 py-8 rounded-md bg-white ${
          selected ? " border-2 border-teal-500" : ""
        }`}
        style={{ boxShadow: "15px 15px 54px -10px #0000001f" }}
      >
        {isDashboardPage && (
          <p
            className={`${
              status === "active"
                ? "bg-teal-500"
                : status === "draft"
                ? "bg-yellow-500"
                : status === "inactive"
                ? "bg-rose-600"
                : ""
            } text-white font-normal capitalize absolute rounded-md px-3 py-0.5 right-5 top-5 text-xs`}
          >
            {status}
          </p>
        )}
        <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis	break-words mt-2">
          {title}
        </p>
        <p className="mt-4 break-words">
          {description.length > 200
            ? description.slice(0, 200) + "..."
            : description}
        </p>
        {(score === 0 || score) && (
          <p className="absolute px-3 py-0.5 bottom-5 right-5 text-xs rounded-md font-medium text-white bg-emerald-500">
            Score : {score}
          </p>
        )}
        <div className="flex mt-4">
          {tags.map((tag, i) => (
            <p
              key={i}
              style={{
                boxShadow: "0 5px 10px rgba(0,0,0,0.07)",
                fontSize: "11px",
                letterSpacing: "0.1px",
                maxWidth: 100,
              }}
              className="mr-5 text-xs py-0.5 px-2 bg-slate-300 rounded font-medium text-gray-700 break-words overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
      <ModalSkeleton open={quizModalActive} onClose={handleQuizModalClose}>
        <QuizModalContents onClose={handleQuizModalClose} {...props} />
      </ModalSkeleton>
    </>
  );
};
