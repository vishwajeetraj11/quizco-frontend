import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { IoClose } from "react-icons/io5";

const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

let fieldIdCounter = 0;

type ButtonVariant = "contained" | "outlined" | "text";
type ButtonColor = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  color?: ButtonColor;
  disableElevation?: boolean;
  endIcon?: ReactNode;
};

const buttonStyles = ({
  variant = "text",
  color = "primary",
  disabled,
}: {
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
}) => {
  if (disabled) {
    return "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400";
  }

  if (variant === "contained") {
    return color === "secondary"
      ? "border border-rose-600 bg-rose-600 text-white hover:border-rose-700 hover:bg-rose-700"
      : "border border-teal-600 bg-teal-600 text-white hover:border-teal-700 hover:bg-teal-700";
  }

  if (variant === "outlined") {
    return color === "secondary"
      ? "border border-rose-600 bg-white text-rose-600 hover:bg-rose-50"
      : "border border-teal-600 bg-white text-teal-700 hover:bg-teal-50";
  }

  return color === "secondary"
    ? "border border-transparent bg-transparent text-rose-600 hover:bg-rose-50"
    : "border border-transparent bg-transparent text-teal-700 hover:bg-teal-50";
};

export const Button = ({
  children,
  className,
  color = "primary",
  disableElevation,
  endIcon,
  type = "button",
  variant = "text",
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      "inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-200",
      buttonStyles({ variant, color, disabled: props.disabled }),
      !props.disabled && "hover:-translate-y-0.5",
      className
    )}
    type={type}
    {...props}
  >
    <span className="inline-flex items-center gap-2">
      {children}
      {endIcon}
    </span>
  </button>
);

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({
  children,
  className,
  type = "button",
  ...props
}: IconButtonProps) => (
  <button
    className={cn(
      "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-200",
      props.disabled && "cursor-not-allowed opacity-50",
      className
    )}
    type={type}
    {...props}
  >
    {children}
  </button>
);

type BaseFieldProps = {
  error?: boolean;
  fullWidth?: boolean;
  helperText?: ReactNode;
  label?: ReactNode;
  variant?: "outlined";
};

type TextFieldProps = BaseFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & {
    multiline?: boolean;
  };

export const TextField = ({
  className,
  error = false,
  fullWidth = false,
  helperText,
  id,
  label,
  multiline = false,
  variant,
  ...props
}: TextFieldProps) => {
  const [generatedId] = useState(() => `field-${(fieldIdCounter += 1)}`);
  const fieldId = id || generatedId;
  const inputClassName = cn(
    "w-full rounded-2xl border bg-white/95 px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2",
    error
      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-200"
      : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
  );

  return (
    <div className={cn(fullWidth && "w-full", className)}>
      {label && (
        <label
          className="mb-2 block text-sm font-medium text-slate-700"
          htmlFor={fieldId}
        >
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          className={cn(inputClassName, "min-h-[104px] resize-y")}
          id={fieldId}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={inputClassName}
          id={fieldId}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {helperText && (
        <p
          className={cn(
            "mt-1 text-sm",
            error ? "text-rose-600" : "text-slate-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

type FormControlProps = HTMLAttributes<HTMLDivElement> & {
  fullWidth?: boolean;
};

export const FormControl = ({
  children,
  className,
  fullWidth = false,
  ...props
}: FormControlProps) => (
  <div className={cn(fullWidth && "w-full", className)} {...props}>
    {children}
  </div>
);

type InputLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  id?: string;
};

export const InputLabel = ({
  children,
  className,
  htmlFor,
  id,
  ...props
}: InputLabelProps) => (
  <label
    className={cn("mb-2 block text-sm font-medium text-slate-700", className)}
    htmlFor={htmlFor}
    id={id}
    {...props}
  >
    {children}
  </label>
);

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  fullWidth?: boolean;
  label?: ReactNode;
  labelId?: string;
};

export const Select = ({
  children,
  className,
  fullWidth = false,
  label,
  labelId,
  ...props
}: SelectProps) => (
  <select
    className={cn(
      "rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100",
      fullWidth && "w-full",
      className
    )}
    {...props}
  >
    {children}
  </select>
);

type MenuItemProps = React.OptionHTMLAttributes<HTMLOptionElement>;

export const MenuItem = ({ children, ...props }: MenuItemProps) => (
  <option {...props}>{children}</option>
);

type ChipProps = {
  color?: ButtonColor;
  label: ReactNode;
  onDelete?: () => void;
};

export const Chip = ({ color = "primary", label, onDelete }: ChipProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
      color === "secondary"
        ? "bg-rose-100 text-rose-700"
        : "bg-teal-100 text-teal-700"
    )}
  >
    <span>{label}</span>
    {onDelete && (
      <button
        aria-label="Remove"
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/70 text-current transition-colors hover:bg-white"
        onClick={onDelete}
        type="button"
      >
        <IoClose size={14} />
      </button>
    )}
  </span>
);

export const useMediaQuery = (query: string) => {
  const getMatches = () =>
    typeof window !== "undefined" && typeof window.matchMedia !== "undefined"
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches);
    };

    updateMatches(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMatches);
      return () => mediaQuery.removeEventListener("change", updateMatches);
    }

    mediaQuery.addListener(updateMatches);
    return () => mediaQuery.removeListener(updateMatches);
  }, [query]);

  return matches;
};
