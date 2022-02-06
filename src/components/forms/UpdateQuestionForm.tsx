import { Formik } from "formik";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IOption, IQuestionForm } from "../../shared/interfaces";
import { useUpdateQuestion } from "../../shared/queries";
import { AddEditQuestionValidation } from "../../shared/validationSchema";
import { AddEditQuestionFormFields } from "./AddEditQuestionFormFields";

interface Props {
  id: string;
  title: string;
  correct: string;
  options: IOption[];
}

export const UpdateQuestionForm: React.FC<Props> = ({
  id,
  title,
  correct,
  options,
}) => {
  const { quizId } = useParams() as {
    quizId: string;
    questionId: string;
  };
  const { mutate: updateQuestionMutate, reset: updateQuestionReset } =
    useUpdateQuestion(quizId, id);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <Formik<IQuestionForm>
      initialValues={{
        title: title || "",
        correct: correct || "",
        options: options || [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
        ],
      }}
      validationSchema={AddEditQuestionValidation}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        updateQuestionMutate(
          { body: values },
          {
            onSuccess: () => {
              navigate(`/quizes/${quizId}/questions`);
              queryClient.invalidateQueries(["Quiz Questions", quizId]);
            },
            onError: () => {},
            onSettled: () => {
              updateQuestionReset();
              setSubmitting(false);
            },
          }
        );
      }}
    >
      <AddEditQuestionFormFields />
    </Formik>
  );
};
