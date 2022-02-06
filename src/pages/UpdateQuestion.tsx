import { useParams } from "react-router-dom";
import { UpdateQuestionForm } from "../components/forms/UpdateQuestionForm";
import { Loader } from "../components/Svgs";
import { useQuizQuestion } from "../shared/queries";

interface Props {}

export const UpdateQuestion: React.FC<Props> = () => {
  const { questionId, quizId } = useParams() as {
    quizId: string;
    questionId: string;
  };

  const { isLoading, data } = useQuizQuestion(quizId, questionId);

  return (
    <div>
      <h3 className="text-xl font-semibold text-center">Update Question</h3>
      <div className="mx-auto w-6/12">
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <UpdateQuestionForm {...data?.question} />
        )}
      </div>
    </div>
  );
};
