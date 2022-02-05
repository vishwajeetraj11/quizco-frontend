import { useParams } from "react-router-dom";
import { QuizForm } from "../components/forms/QuizForm";
import { Loader } from "../components/Svgs";
import { useQuiz, useUpdateQuiz } from "../shared/queries";

interface Props {}

export const UpdateQuiz: React.FC<Props> = () => {
  const { id } = useParams() as { id: string };
  const { mutateAsync, reset } = useUpdateQuiz(id);
  const { data, isLoading } = useQuiz(id);
  return (
    <div>
      <h2 className="text-2xl font-medium text-center">Create a Quiz</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <QuizForm
          id={id}
          tags={data?.quiz.tags}
          title={data?.quiz.title}
          description={data?.quiz.description}
          mutateAsync={mutateAsync}
          reset={reset}
          redirect="/dashboard"
        />
      )}
    </div>
  );
};
