import { Button, TextField } from "@material-ui/core";
import { Formik } from "formik";
import { FiltersValidation } from "../../shared/validationSchema";

interface Props {
  searchTerm: string;
  tag: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  modalClose: () => void;
}

export const FiltersForm: React.FC<Props> = ({
  searchTerm,
  tag,
  modalClose,
  setSearchTerm,
  setTag,
}) => {
  return (
    <>
      <div>
        <h3 className="font-thin mt-3 mb-8">Available Filters</h3>
      </div>
      <Formik<{
        search: string;
        tag: string;
      }>
        validateOnChange={true}
        initialValues={{
          search: searchTerm,
          tag: tag,
        }}
        validationSchema={FiltersValidation}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          setSubmitting(true);
          try {
            if (!!!values.search.trim()) {
              setFieldError("search", "Only Spaces not allowed.");
              throw Error("Form Error");
            }

            setSearchTerm(values.search);
            setTag(values.tag);
            modalClose();
          } catch (e) {}

          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          isSubmitting,
          handleBlur,
          handleChange,
          values,
          touched,
          errors,
        }) => (
          <form className="pb-8" onSubmit={handleSubmit}>
            <div className="mx-5 md:mx-10">
              <div className="mb-4">
                <TextField
                  multiline
                  fullWidth
                  value={values.search}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.search && errors.search)}
                  helperText={touched.search && errors.search}
                  id="search"
                  label="Quiz Name"
                  variant="outlined"
                />
              </div>

              <TextField
                multiline
                fullWidth
                value={values.tag}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.tag && errors.tag)}
                helperText={touched.tag && errors.tag}
                id="tag"
                label="Tag Name"
                variant="outlined"
              />

              <div className="flex justify-end mt-4">
                <div className="mr-4">
                  <Button onClick={modalClose}>Cancel</Button>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Apply
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
