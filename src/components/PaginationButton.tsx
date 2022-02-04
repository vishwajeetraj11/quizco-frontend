interface IPaginationButton {
  onClick: () => void;
  disabled: boolean;
  title: string;
}

export const PaginationButton: React.FC<IPaginationButton> = ({
  onClick,
  disabled,
  title,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="border-indigo-600 border hover:bg-gray-50 transition-all duration-200 px-10 py-3 rounded-md text-indigo-600 disabled:text-white disabled:border-none disabled:bg-gray-400"
  >
    {title}
  </button>
);
