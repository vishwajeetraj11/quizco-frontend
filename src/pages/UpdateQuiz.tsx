import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { QuizForm } from "../components/forms/QuizForm";
import { Loader } from "../components/Svgs";
import { useQuiz, useUpdateQuiz } from "../shared/queries";

interface Props {}

export const UpdateQuiz: React.FC<Props> = () => {
  const { id } = useParams() as { id: string };
  const { mutateAsync, reset } = useUpdateQuiz(id);
  const { data, isLoading, isFetching, isSuccess } = useQuiz(id);
  const { id: userId } = useUser();

  if (isSuccess && data?.quiz.author !== userId) {
    return <ErrorMessage statusCode={403} />;
  }

  return (
    <div>
      <h2 className="text-2xl font-medium text-center">Update a Quiz</h2>
      {isLoading || isFetching ? (
        <Loader halfScreen />
      ) : (
        <div className="mx-auto w-6/12">
          <QuizForm
            {...data?.quiz}
            mutateAsync={mutateAsync}
            reset={reset}
            redirect="/dashboard"
          />
        </div>
      )}
    </div>
  );
};
