import { KeyboardEvent, ReactNode, useState } from "react";
import { Chip, TextField } from "../ui";

type TagsInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  onBlur?: () => void;
  label?: string;
  placeholder?: string;
  helperText?: ReactNode;
  error?: boolean;
  className?: string;
};

export const TagsInput = ({
  value,
  onChange,
  onBlur,
  label = "Tags",
  placeholder = "Enter tags and hit ENTER",
  helperText,
  error = false,
  className,
}: TagsInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (rawTag: string) => {
    const nextTag = rawTag.trim();

    if (!nextTag) {
      setInputValue("");
      return;
    }

    if (value.includes(nextTag)) {
      setInputValue("");
      return;
    }

    onChange(value.concat(nextTag));
    setInputValue("");
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(inputValue);
      return;
    }

    if (event.key === "Backspace" && !inputValue && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className={className}>
      <TextField
        fullWidth
        label={label}
        variant="outlined"
        placeholder={placeholder}
        value={inputValue}
        error={error}
        helperText={helperText}
        onBlur={() => {
          addTag(inputValue);
          onBlur?.();
        }}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <Chip
              key={`${tag}-${index}`}
              color="primary"
              label={tag}
              onDelete={() => {
                onChange(value.filter((_, currentIndex) => currentIndex !== index));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
