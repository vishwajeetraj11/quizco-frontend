import { Button } from "@material-ui/core";

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
  <Button
    onClick={onClick}
    variant="outlined"
    color="primary"
    disabled={disabled}
  >
    {title}
  </Button>
);
