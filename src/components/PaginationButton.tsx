import { Button } from "@material-ui/core";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { globalColors } from "../shared/constants";

interface IPaginationButton {
  onClick: () => void;
  disabled: boolean;
  title: "Previous Question" | "Next Question";
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
    {title === "Next Question" ? (
      <>
        <p className="mr-2 hidden md:block">{title}</p>
        <MdNavigateNext
          fill={disabled ? "#999" : globalColors.brand}
          size={30}
        />
      </>
    ) : (
      <>
        <MdNavigateBefore
          fill={disabled ? "#999" : globalColors.brand}
          size={30}
        />
        <p className="ml-2 hidden md:block">{title}</p>
      </>
    )}
  </Button>
);
