import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  errorMessages,
  loadingMessages,
  successMessages,
} from "../../shared/constants";
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
  const {
    mutate: updateQuestionMutate,
    reset: updateQuestionReset,
    isLoading,
  } = useUpdateQuestion(quizId, id);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

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
        enqueueSnackbar(loadingMessages.actionLoading("Updating", "Question"), {
          variant: "info",
        });

        updateQuestionMutate(
          { body: values },
          {
            onSuccess: () => {
              enqueueSnackbar(
                successMessages.actionSuccess("Updated", "Question"),
                { variant: "success" }
              );
              navigate(`/quizes/${quizId}/questions`);
              queryClient.invalidateQueries(["Quiz Questions", quizId]);
            },
            onError: () => {
              enqueueSnackbar(errorMessages.default, { variant: "error" });
            },
            onSettled: () => {
              updateQuestionReset();
              setSubmitting(false);
            },
          }
        );
      }}
    >
      <AddEditQuestionFormFields isLoading={isLoading} />
    </Formik>
  );
};
