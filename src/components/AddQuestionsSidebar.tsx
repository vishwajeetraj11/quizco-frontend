import { useMediaQuery } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { IQuestion } from "../shared/interfaces";
import { SidebarQuestion } from "./SidebarQuestion";

interface Props {
  questions: IQuestion[];
}

export const AddQuestionsSidebar: React.FC<Props> = ({ questions }) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [expandQuestion, setExpandQuestion] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (expanded) {
      const timeout = setTimeout(() => {
        setShowQuestions(true);
      }, 300);
      return () => {
        clearTimeout(timeout);
        setShowQuestions(false);
        setExpandQuestion("");
      };
    }
  }, [expanded]);

  useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [isMobile]);

  return (
    <div
      className={`flex flex-col h-full py-2 overflow-y-auto border-r border-gray-200 transition-all duration-300`}
      style={{ width: expanded ? (isMobile ? "100%" : "400px") : "56px" }}
    >
      <div
        onClick={() => setExpanded((p) => !p)}
        className="w-8 h-8 p-2 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full"
      >
        <BsLayoutSidebarInset size={18} fill="#444" />
      </div>
      <div className="overflow-y-auto mt-4">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <SidebarQuestion
              setExpandQuestion={setExpandQuestion}
              setExpanded={setExpanded}
              expandQuestion={expandQuestion}
              question={question}
              key={index}
              index={index}
              expanded={expanded}
              showQuestions={showQuestions}
            />
          ))
        ) : (
          <>
            <p className="text-center">No Questions Added Yet.</p>
          </>
        )}
      </div>
    </div>
  );
};
