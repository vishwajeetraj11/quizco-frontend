import { Button, TextField } from "@material-ui/core";
import { FieldArray, useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";
import { IQuestionForm } from "../../shared/interfaces";
import { FormikError } from "../../shared/utils";

export const AddEditQuestionFormFields = () => {
  const {
    touched,
    errors,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useFormikContext<IQuestionForm>();
  const navigate = useNavigate();
  return (
    <form className="pb-2" onSubmit={handleSubmit}>
      <div className="">
        <TextField
          fullWidth
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.title && errors.title)}
          helperText={touched.title && errors.title}
          id="title"
          label="Title"
          variant="standard"
        />
      </div>
      <div className="mt-4">
        <FieldArray name="options">
          {({ remove, push }) => {
            return (
              <div>
                {values.options.length > 0 &&
                  values.options.map((option, index) => (
                    <div
                      className="rounded-default mb-4 items-center"
                      key={index}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 10px",
                      }}
                    >
                      <TextField
                        fullWidth
                        value={values.options[index].value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id={`options.${index}.value`}
                        label={`Option ${index + 1}`}
                        error={
                          !!FormikError(
                            errors,
                            touched,
                            `options.${index}.value`
                          )
                        }
                        helperText={FormikError(
                          errors,
                          touched,
                          `options.${index}.value`
                        )}
                      />

                      <div
                        onClick={() =>
                          setFieldValue("correct", values.options[index].value)
                        }
                        className={`cursor-pointer ml-4 flex items-center justify-center border-2 w-4 h-4 rounded-full ${
                          !!values.options.find((val) => val.value === "")
                            ? ""
                            : "border-indigo-600"
                        }`}
                      >
                        {!values.options.find((val) => val.value === "") &&
                          values.correct === option.value && (
                            <div className="bg-indigo-600 w-2.5 h-2.5 rounded-full">
                              &nbsp;
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
              </div>
            );
          }}
        </FieldArray>
      </div>
      <div className="mx-10">
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
  );
};
