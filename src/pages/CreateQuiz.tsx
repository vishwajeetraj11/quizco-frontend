import { Button } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { IQuiz } from "../shared/interfaces";
import { AddEditQuizValidation } from "../shared/validationSchema";

interface Props {}

export const CreateQuiz = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Create a Quiz</h2>
      <Formik<IQuiz>
        validateOnChange={true}
        initialValues={{
          title: "",
          description: "",
          tags: [],
        }}
        validationSchema={AddEditQuizValidation}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          setSubmitting(true);
          try {
          } catch (error: any) {
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form className="pb-2" onSubmit={handleSubmit}>
            <div className="mx-10">
              <div className="flex justify-end mt-4">
                <div className="mr-4">
                  <Button onClick={() => navigate(-1)}>Cancel</Button>
                </div>

                <Button>Submit</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
