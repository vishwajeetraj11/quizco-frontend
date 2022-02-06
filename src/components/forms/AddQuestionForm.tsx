import { Formik } from "formik";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { IQuestionForm } from "../../shared/interfaces";
import { useCreateQuestion } from "../../shared/queries";
import { AddEditQuestionValidation } from "../../shared/validationSchema";
import { AddEditQuestionFormFields } from "./AddEditQuestionFormFields";

interface Props {}

export const AddQuestionForm: React.FC<Props> = () => {
  const { id: quizId } = useParams() as { id: string };
  const { mutate: createQuestionMutate, reset: createQuestionReset } =
    useCreateQuestion(quizId);

  const queryClient = useQueryClient();

  return (
    <Formik<IQuestionForm>
      initialValues={{
        title: "",
        correct: "",
        options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
      }}
      validationSchema={AddEditQuestionValidation}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        setSubmitting(true);

        createQuestionMutate(
          { body: values },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(["Quiz Questions", quizId]);
            },
            onError: () => {},
            onSettled: () => {
              createQuestionReset();
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
