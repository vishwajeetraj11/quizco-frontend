import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { IResponse } from "../shared/interfaces";

interface Props {
  handleConfirmSubmitModalClose: () => void;
  isQuizCorrectAnsLoading: boolean;
  setFetchCorrectAns: React.Dispatch<React.SetStateAction<boolean>>;
  responses: [] | IResponse[];
}

export const ConfirmSubmitModalContent: React.FC<Props> = ({
  handleConfirmSubmitModalClose,
  isQuizCorrectAnsLoading,
  setFetchCorrectAns,
  responses,
}) => {
  const [marked, setMarked] = useState(0);
  const [unmarked, setUnmarked] = useState(0);

  useEffect(() => {
    responses.forEach((res) => {
      if (res.response === "") {
        setUnmarked((p) => p + 1);
      } else {
        setMarked((p) => p + 1);
      }
    });
  }, [responses]);

  return (
    <>
      <h4 className="text-gray-555 text-center font-semibold text-2xl mt-3 mb-8">
        Submit Quiz
      </h4>
      <div className="my-4 mb-5 mx-5 md:mx-10">
        <p className="text-gray-555 text-sm md:text-lg font-medium">
          Are you sure you want to submit?
        </p>
        <div className="my-3">
          <p className="text-gray-555 text-sm md:text-lg font-normal">
            Questions Attempted: {marked}
          </p>
          <p className="text-gray-555 text-sm md:text-lg font-normal">
            Questions Unattempted: {unmarked}
          </p>
        </div>
        {marked === 0 && (
          <p className="text-rose-600 text-sm md:text-lg mt-3 font-semibold">
            Sorry can't allow you to omit for all questions.
          </p>
        )}
      </div>
      <div className="flex flex-1 w-full mt-4 px-10 pb-8">
        <div className="flex ml-auto">
          <Button onClick={handleConfirmSubmitModalClose}>Cancel</Button>
          <div className="ml-4">
            <Button
              variant="contained"
              color="primary"
              disabled={isQuizCorrectAnsLoading || marked === 0}
              onClick={() => setFetchCorrectAns(true)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
