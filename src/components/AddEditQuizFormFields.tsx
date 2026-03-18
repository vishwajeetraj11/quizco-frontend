import { useFormikContext } from "formik";
import { IQuiz } from "../shared/interfaces";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "../ui";
import { TagsInput } from "./TagsInput";

export const AddEditQuizFormFields = ({ id }: { id?: string }) => {
  const {
    touched,
    errors,
    values,
    handleBlur,
    handleChange,
    setFieldTouched,
    setFieldValue,
  } = useFormikContext<IQuiz>();

  return (
    <>
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
          variant="outlined"
        />
      </div>

      <div className="mt-6">
        <TextField
          multiline
          fullWidth
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.description && errors.description)}
          helperText={touched.description && errors.description}
          id="description"
          label="Description"
          variant="outlined"
        />
      </div>
      {id && (
        <div className="mt-6">
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="authentication-label"
              id="select-authentication"
              fullWidth
              value={values.status}
              label="Status"
              onChange={(e) => {
                setFieldValue(`status`, e.target.value);
              }}
            >
              <MenuItem value={"active"}>Active</MenuItem>
              <MenuItem value={"inactive"}>Inactive</MenuItem>
              <MenuItem value={"draft"}>Draft</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
      <div className="mt-6">
        <TagsInput
          label="Tags"
          className="mt-6 mr-10"
          placeholder="Enter tags and hit ENTER"
          error={!!(touched.tags && errors.tags)}
          helperText={touched.tags && errors.tags}
          value={values.tags}
          onBlur={() => {
            setFieldTouched("tags", true);
          }}
          onChange={(tags) => {
            setFieldValue("tags", tags);
          }}
        />
      </div>
    </>
  );
};
