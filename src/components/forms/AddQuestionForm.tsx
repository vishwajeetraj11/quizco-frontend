import axios from "axios";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  errorMessages,
  loadingMessages,
  successMessages,
} from "../../shared/constants";
import { IQuestionForm } from "../../shared/interfaces";
import { useCreateQuestion } from "../../shared/queries";
import { AddEditQuestionValidation } from "../../shared/validationSchema";
import { AddEditQuestionFormFields } from "./AddEditQuestionFormFields";

interface Props {}

export const AddQuestionForm: React.FC<Props> = () => {
  const { id: quizId } = useParams() as { id: string };
  const {
    mutate: createQuestionMutate,
    reset: createQuestionReset,
    isLoading,
  } = useCreateQuestion(quizId);

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik<IQuestionForm>
      initialValues={{
        title: "",
        correct: "",
        options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
      }}
      validationSchema={AddEditQuestionValidation}
      onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
        try {
          setSubmitting(true);
          if (!!!values.title.trim()) {
            setFieldError("title", "Only Spaces not allowed.");
            throw Error("Form Error");
          }

          values.options.forEach((option, index) => {
            if (!!!option.value.trim()) {
              setFieldError(
                `options.${index}.value`,
                "Only Spaces not allowed."
              );
              throw Error("Form Error");
            }
          });

          const maping: { [key: string]: number[] } = {};

          values.options.forEach((option1, i1) => {
            let flag = 0;
            const option1Indices: number[] = [];
            values.options.forEach((option2, i2) => {
              if (option1.value === option2.value) {
                flag++;
                option1Indices.push(i2);
              }
            });
            if (flag > 1) {
              maping[option1.value] = option1Indices;
            }
          });

          const errors = Object.entries(maping);

          errors.forEach((element) => {
            element[1].forEach((index) =>
              setFieldError(
                `options.${index}.value`,
                "Duplicate option are not allowed."
              )
            );
          });

          if (errors.length) throw Error("DUPLICATE_OPTION");
          enqueueSnackbar(
            loadingMessages.actionLoading("Creating", "Question"),
            {
              variant: "info",
            }
          );

          createQuestionMutate(
            { body: values },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(["Quiz Questions", quizId]);
                enqueueSnackbar(
                  successMessages.actionSuccess("Created", "Question"),
                  { variant: "success" }
                );
                resetForm();
              },
              onError: (err) => {
                if (axios.isAxiosError(err)) {
                  enqueueSnackbar(err.response?.data.message, {
                    variant: "error",
                  });
                } else {
                  enqueueSnackbar(errorMessages.default, { variant: "error" });
                }
              },
              onSettled: () => {
                createQuestionReset();
              },
            }
          );
        } catch (e) {
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <AddEditQuestionFormFields isLoading={isLoading} />
    </Formik>
  );
};
