import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useFormikContext } from "formik";
import ChipInput from "material-ui-chip-input";
import { IQuiz } from "../shared/interfaces";

export const AddEditQuizFormFields = ({ id }: { id?: string }) => {
  const { touched, errors, values, handleBlur, handleChange, setFieldValue } =
    useFormikContext<IQuiz>();

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
        <ChipInput
          size="medium"
          label="Tags"
          fullWidth
          variant="outlined"
          className="mt-6 mr-10"
          placeholder="Enter tags and hit ENTER"
          allowDuplicates={false}
          error={!!(touched.tags && errors.tags)}
          helperText={touched.tags && errors.tags}
          alwaysShowPlaceholder={!!values.tags.length}
          value={values.tags}
          onAdd={(chip) => {
            setFieldValue("tags", values.tags.concat(chip));
          }}
          onDelete={(chip, indexChip) => {
            const tags = values.tags.filter((_, i) => i !== indexChip);
            setFieldValue("tags", tags);
          }}
        />
      </div>
    </>
  );
};
