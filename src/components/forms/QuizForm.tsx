import { Button } from "@material-ui/core";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { UseMutateAsyncFunction, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { errorMessages, successMessages } from "../../shared/constants";
import { IQuizForm } from "../../shared/interfaces";
import { AddEditQuizValidation } from "../../shared/validationSchema";
import { AddEditQuizFormFields } from "../AddEditQuizFormFields";

interface Props {
  mutateAsync: UseMutateAsyncFunction<any, AxiosError<any, any>, any, unknown>;
  reset: () => void;
  title?: string;
  description?: string;
  tags?: string[];
  redirect: string;
  id?: string;
  status?: string;
}

export const QuizForm: React.FC<Props> = ({
  mutateAsync,
  reset,
  description,
  tags,
  title,
  redirect,
  id,
  status,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return (
    <Formik<IQuizForm>
      validateOnChange={true}
      initialValues={{
        title: title || "",
        description: description || "",
        tags: tags || [],
        status: status || "",
      }}
      validationSchema={AddEditQuizValidation}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const body = { ...values };
        if (!id) delete body.status;
        await mutateAsync(
          { body },
          {
            onSuccess: () => {
              queryClient.invalidateQueries("Quizes");
              enqueueSnackbar(
                successMessages.actionSuccess(
                  id ? "Updated" : "Created",
                  "Quiz"
                )
              );
              id && queryClient.invalidateQueries(["Quiz", id]);
              navigate(redirect);
            },
            onError: () => {
              enqueueSnackbar(errorMessages.default);
            },
            onSettled: () => {
              reset();
              setSubmitting(false);
            },
          }
        );
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form className="pb-2" onSubmit={handleSubmit}>
          <div className="mx-10">
            <AddEditQuizFormFields id={id} />
            <div className="flex justify-end mt-4">
              <div className="mr-4">
                <Button onClick={() => navigate(-1)}>Cancel</Button>
              </div>

              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
