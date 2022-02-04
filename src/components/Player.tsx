import { useEffect, useState } from "react";
import { IOption, IQuestion, IResponse } from "../shared/interfaces";
import { Option } from "./Option";
import { PaginationButton } from "./PaginationButton";

interface Props {
  quiz: IQuestion[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  response: IResponse[];
  setResponse: React.Dispatch<React.SetStateAction<IResponse[] | []>>;
}

export const Player: React.FC<Props> = ({
  quiz,
  activeIndex,
  setActiveIndex,
  response,
  setResponse,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const onOptionClick = (option: string) => {
    setSelectedOption(option);
    setResponse((res) => {
      const newRes: IResponse[] = [];
      res.forEach((resp) => {
        newRes.push({
          ...resp,
          response: resp.id === quiz[activeIndex].id ? option : resp.response,
        });
      });
      return newRes;
    });
  };

  useEffect(() => {
    const currentQuestionResponse = response[activeIndex]?.response;
    if (currentQuestionResponse) {
      setSelectedOption(currentQuestionResponse);
    }
  }, [activeIndex, response]);

  return (
    <div className="flex-1 px-4 py-5 min-h-[87%] flex flex-col">
      <p>{quiz[activeIndex].question}</p>
      <div className="flex flex-col items-start">
        {quiz[activeIndex].options.map((option: IOption, i: number) => (
          <Option
            key={i}
            onClick={() => onOptionClick(option.value)}
            selectedOption={selectedOption}
            option={option}
          />
        ))}
      </div>
      <div className="w-full flex items-center justify-between mt-auto">
        <PaginationButton
          onClick={() => {
            setActiveIndex((p: number) => p - 1);
          }}
          disabled={activeIndex === 0}
          title="Previous Question"
        />

        <PaginationButton
          onClick={() => {
            setActiveIndex((p) => p + 1);
          }}
          title="Next Question"
          disabled={activeIndex === quiz.length - 1}
        />
      </div>
    </div>
  );
};
