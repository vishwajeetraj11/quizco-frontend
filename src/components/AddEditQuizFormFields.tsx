import { TextField } from "@material-ui/core";
import { useFormikContext } from "formik";
import ChipInput from "material-ui-chip-input";
import { IQuiz } from "../shared/interfaces";

export const AddEditQuizFormFields = () => {
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
    </>
  );
};
