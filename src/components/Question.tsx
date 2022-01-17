import { useEffect, useState } from "react";
import { JSQuiz } from "../shared/sampleQuizes";

interface Props {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  attempted: {
    id: number;
    response: string;
  }[];
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setAttempted: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        response: string;
      }[]
    >
  >;
}

export const Question: React.FC<Props> = ({
  activeIndex,
  setActiveIndex,
  attempted,
  setAttempted,
  setScore,
}) => {
  //   const [disableQuestion, setDisableQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>();

  const removeToAttempted = (givenId: number) =>
    setAttempted((p) => p.filter((response) => response.id !== givenId));

  const addToAttempted = (givenId: number, option: { value: string }) =>
    setAttempted((p) => p.concat({ id: givenId, response: option.value }));

  const disableOptionsOnAttempt = () =>
    !!attempted.find((response) => response.id === JSQuiz[activeIndex].id);

  const checkIfCorrect = (option: { value: string }) => {
    const correct = JSQuiz[activeIndex].correct;
    const status =
      selectedOption?.value === option.value &&
      correct === selectedOption?.value;
    // setScore((p) => p + 1);
    return status;
  };

  const checkIfWrong = (option: { value: string }) => {
    const correct = JSQuiz[activeIndex].correct;
    const status =
      selectedOption?.value === option.value &&
      !(correct === selectedOption?.value);
    return status;
  };

  useEffect(() => {
    const currentQuestionAttempted = attempted.find(
      (response) => response.id === JSQuiz[activeIndex].id
    );
    if (currentQuestionAttempted) {
      setSelectedOption({ value: currentQuestionAttempted.response });
    }
  }, [activeIndex, attempted]);

  return (
    <div className="flex-1 px-4 py-5 min-h-[87%] flex flex-col">
      <p>{JSQuiz[activeIndex].question}</p>
      <div className="flex flex-col items-start">
        {JSQuiz[activeIndex].answers.map((option, i) => (
          <button
            key={i}
            disabled={disableOptionsOnAttempt()}
            onClick={() => {
              setSelectedOption(option);
              addToAttempted(JSQuiz[activeIndex].id, option);
            }}
            className={`flex items-center px-4 py-2 border border-2 ${
              checkIfCorrect(option) ? "border-indigo-600" : "border-gray-200"
            } ${
              checkIfWrong(option) ? "border-red-600" : ""
            } w-full text-left mt-4 rounded-md disabled:opacity-80 transition-all duration-300`}
          >
            <div
              className={`mr-4 flex items-center justify-center border-2 ${
                checkIfWrong(option) ? "border-red-600" : "border-indigo-600"
              } w-4 h-4 rounded-full`}
            >
              {checkIfCorrect(option) && (
                <div className="bg-indigo-600 w-2.5 h-2.5 rounded-full">
                  &nbsp;
                </div>
              )}
            </div>
            <p>{option.value}</p>
          </button>
        ))}
      </div>
      <div className="w-full flex items-center justify-between mt-auto">
        <button
          onClick={() => {
            setActiveIndex((p) => p - 1);
            // setDisableQuestion(false);
          }}
          disabled={activeIndex === 0}
          className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 px-10 py-3 rounded-md text-white disabled:bg-gray-300"
        >
          Previous Question
        </button>
        <button
          onClick={() => {
            setActiveIndex((p) => p + 1);
            // setDisableQuestion(false);
          }}
          disabled={activeIndex === JSQuiz.length - 1}
          className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 px-10 py-3 rounded-md text-white disabled:bg-gray-300"
        >
          Next Question
        </button>
      </div>
    </div>
  );
};
