import { Button } from "@material-ui/core";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { UseMutateAsyncFunction, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
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
}

export const QuizForm: React.FC<Props> = ({
  mutateAsync,
  reset,
  description,
  tags,
  title,
  redirect,
  id,
}) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  // const queryCache = useQuer;

  return (
    <Formik<IQuizForm>
      validateOnChange={true}
      initialValues={{
        title: title || "",
        description: description || "",
        tags: tags || [],
      }}
      validationSchema={AddEditQuizValidation}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        setSubmitting(true);
        mutateAsync(
          { body: values },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(["Quizes", "All"]);
              // queryClient.invalidateQueries();
              id && queryClient.invalidateQueries(["Quiz", id]);
              navigate(redirect);
            },
            onError: () => {},
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
            <AddEditQuizFormFields />
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
