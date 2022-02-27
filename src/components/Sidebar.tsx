import { useMediaQuery } from "@material-ui/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { IQuestion, IResponse } from "../shared/interfaces";

interface Props {
  questions: IQuestion[];
  activeIndex?: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  responses: [] | IResponse[];
}

export const Sidebar: React.FC<Props> = ({
  activeIndex,
  setActiveIndex,
  questions,
  responses,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (expanded) {
      const timeout = setTimeout(() => {
        setShowQuestions(true);
      }, 300);
      return () => {
        clearTimeout(timeout);
        setShowQuestions(false);
      };
    }
  }, [expanded]);

  return (
    <div
      className={`flex flex-col h-full px-2 py-2 overflow-y-auto border-t border-r border-gray-300 transition-all duration-300`}
      style={{ width: expanded ? (isMobile ? "100%" : "400px") : "56px" }}
    >
      <div
        onClick={() => setExpanded((p) => !p)}
        className="w-8 h-8 p-2 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full"
      >
        <BsLayoutSidebarInset size={18} fill="#444" />
      </div>
      <div className="overflow-y-auto mt-4">
        {questions?.map((quiz, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveIndex(index);
              if (isMobile) {
                setExpanded(false);
              }
            }}
            className={`items-center transition-all duration-300 cursor-pointer flex mb-4 ${
              activeIndex === index ? "" : ""
            }`}
          >
            <p
              className={`w-8 h-8 ${
                activeIndex === index
                  ? "bg-indigo-600 text-white"
                  : "bg-green-100 text-gray-900"
              } text-sm rounded-full flex items-center justify-center`}
            >
              {index + 1}
            </p>

            {expanded && showQuestions && (
              <p className="pl-4 w-10/12">
                {quiz.title.length > 60
                  ? quiz.title.slice(0, 60) + "..."
                  : quiz.title}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
