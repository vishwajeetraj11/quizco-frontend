import { QuizForm } from "../components/forms/QuizForm";
import { useCreateQuiz } from "../shared/queries";

interface Props {}

export const CreateQuiz: React.FC<Props> = () => {
  const { mutateAsync, reset } = useCreateQuiz();
  return (
    <div>
      <h2 className="text-2xl font-medium text-center">Create a Quiz</h2>
      <div className="mx-auto w-6/12">
        <QuizForm redirect="/quizes" mutateAsync={mutateAsync} reset={reset} />
      </div>
    </div>
  );
};
