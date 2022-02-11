import EmptyMail from "../assets/illustations/404.png";
import { emptyResponseMessages } from "../shared/constants";

interface Props {
  resource:
    | "Quiz"
    | "Attempt"
    | "Dashboard Quizes"
    | "Quiz Questions"
    | "All Active Quizes";
}

export const EmptyResponse: React.FC<Props> = ({ resource }) => {
  const attempt = resource === "Attempt";
  const dashboard = resource === "Dashboard Quizes";
  const quizQuestions = resource === "Quiz Questions";
  const mainQuizes = resource === "All Active Quizes";

  // const img = attempt ? EmptyMail : "";
  const img = EmptyMail;
  const text = attempt
    ? emptyResponseMessages.attempt
    : dashboard
    ? emptyResponseMessages.dashboardQuizes
    : quizQuestions
    ? emptyResponseMessages.quizQuestions
    : mainQuizes
    ? emptyResponseMessages.mainQuizes
    : [""];

  return (
    <div>
      {img && (
        <div className="max-w-md mx-auto">
          <img
            src={EmptyMail}
            className="w-full h-full overflow-hidden"
            alt="Empty Attempt Illustration"
          />
        </div>
      )}
      {text &&
        text.map((text, i) => (
          <h3
            key={i}
            className="text-center text-xl font-semibold text-slate-600 mt-2"
          >
            {text}
          </h3>
        ))}
    </div>
  );
};
