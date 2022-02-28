import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { ShowResponses } from "../components/FinishQuiz";
import { Loader } from "../components/Svgs";
import { useMyAttemptById } from "../shared/queries";

interface Props {}

export const QuizResponse: React.FC<Props> = () => {
  const { attemptId } = useParams() as { attemptId: string };
  const { isLoading, isFetching, data, isSuccess, error } =
    useMyAttemptById(attemptId);
  const [score, setScore] = useState(0);
  const [respWithCorrectAns, setRespWithCorrectAns] = useState<any>([]);
  const location = useLocation() as { state: { from: string } };

  useEffect(() => {
    if (isSuccess) {
      setScore(data?.attempt.score);
      setRespWithCorrectAns(
        data?.responses.map((resp: any) => {
          return {
            quiz: resp.quiz,
            correct: resp.question.correct,
            title: resp.question.title,
            options: resp.question.options,
            response: resp.question.response,
            _id: resp.question._id,
          };
        })
      );
    }
  }, [data?.attempt.score, data?.responses, isSuccess]);

  if (error?.response?.status) {
    return (
      <ErrorMessage resource="Attempt" statusCode={error.response.status} />
    );
  }

  return (
    <div>
      {isLoading || isFetching ? (
        <Loader halfScreen />
      ) : (
        <>
          {data?.responses && (
            <ShowResponses
              quizDeleted={data?.attempt?.quiz?.deleted}
              as={
                location.state?.from === "STATISTICS"
                  ? "AUTHOR_CHECK_RESPONSE"
                  : "USER_CHECK_RESPONSE"
              }
              score={score}
              responses={respWithCorrectAns}
            />
          )}
        </>
      )}
    </div>
  );
};
