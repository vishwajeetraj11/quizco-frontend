import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { ShowResponses } from "../components/FinishQuiz";
import { Loader } from "../components/Svgs";
import { useMyAttemptById } from "../shared/queries";

interface Props {}

export const MyQuizResponse: React.FC<Props> = () => {
  const { attemptId } = useParams() as { attemptId: string };
  const { isLoading, isFetching, data, isSuccess, error } =
    useMyAttemptById(attemptId);
  const [score, setScore] = useState(0);
  const [respWithCorrectAns, setRespWithCorrectAns] = useState<any>([]);

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
              as="AUTHOR_CHECK_RESPONSE"
              score={score}
              responses={respWithCorrectAns}
            />
          )}
        </>
      )}
    </div>
  );
};
