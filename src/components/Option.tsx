interface Props {
  option: { value: string };
  selectedOption?: string;
  onClick?: () => void;
  disabled?: boolean;
  correctAns?: string;
}

export const Option: React.FC<Props> = ({
  option,
  selectedOption,
  onClick,
  disabled,
  correctAns,
}) => {
  const getClasses = () => {
    return `flex items-center px-4 py-2 border border-2 w-full text-left mt-4 rounded-md disabled:opacity-80 transition-all duration-300${
      selectedOption === option.value ? " border-indigo-600" : ""
    }${correctAns === option.value ? " bg-indigo-600" : ""}`;
  };

  const classes = getClasses();

  return (
    <button disabled={disabled} onClick={onClick} className={classes}>
      <div
        className={`mr-4 flex items-center justify-center border-2 w-4 h-4 rounded-full${
          selectedOption === option.value ? " border-indigo-600" : ""
        }`}
      >
        {selectedOption === option.value && (
          <div className="bg-indigo-600 w-2.5 h-2.5 rounded-full">&nbsp;</div>
        )}
      </div>
      <p className={`${correctAns === option.value ? "text-white" : ""}`}>
        {option.value}
      </p>
    </button>
  );
};
