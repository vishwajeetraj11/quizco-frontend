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
          variant="standard"
        />
      </div>
      <div className="mt-4">
        <TextField
          fullWidth
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.description && errors.description)}
          helperText={touched.description && errors.description}
          id="description"
          label="Description"
          variant="standard"
        />
      </div>
      {id && (
        <div className="mt-5">
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
          {/* <FormHelperText>
                {touched.status && errors.status}
              </FormHelperText> */}
        </div>
      )}
      <div className="mt-4">
        <ChipInput
          label="Tags"
          fullWidth
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
      {/* <div className="mt-4">
        <label className="block text-sm font-normal pb-1.5 text-input-color">
          Messages
        </label>
        <div className="h-8">
          <input className="px-2  duration-200 h-full hover:bg-input-hover w-full rounded font-normal border border-input-border text-input-color bg-input-bg focus:bg-white  " />
        </div>
      </div> */}
    </>
  );
};
