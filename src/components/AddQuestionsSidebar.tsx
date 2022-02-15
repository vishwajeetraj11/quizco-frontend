import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  errorMessages,
  loadingMessages,
  successMessages,
} from "../shared/constants";
import { IQuestion } from "../shared/interfaces";
import { useDeleteQuestion } from "../shared/queries";

interface Props {
  questions: IQuestion[];
  //   activeIndex?: number;
  //   setActiveIndex: Dispatch<SetStateAction<number>>;
}

export const AddQuestionsSidebar: React.FC<Props> = ({
  questions,
  //   activeIndex,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [expandQuestion, setExpandQuestion] = useState("");

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

  return (
    <div
      className={`flex flex-col h-full px-2 py-2 overflow-y-auto border-r border-gray-200 transition-all duration-300 ${
        expanded ? "w-96" : "w-14"
      }`}
    >
      <div
        onClick={() => setExpanded((p) => !p)}
        className="w-8 h-8 p-2 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full"
      >
        <BsLayoutSidebarInset size={18} fill="#444" />
      </div>
      <div className="overflow-y-auto mt-4">
        {questions?.map((question, index) => (
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
        ))}
      </div>
    </div>
  );
};

interface SidebarProps {
  index: number;
  expanded: boolean;
  showQuestions: boolean;
  question: IQuestion;
  expandQuestion: string;
  setExpandQuestion: React.Dispatch<React.SetStateAction<string>>;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarQuestion: React.FC<SidebarProps> = ({
  index,
  expanded,
  showQuestions,
  question,
  setExpandQuestion,
  expandQuestion,
  setExpanded,
}) => {
  const { id } = useParams() as { id: string };
  const { mutate, reset } = useDeleteQuestion(id, question._id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onDeleteQuestion = async () => {
    enqueueSnackbar(loadingMessages.actionLoading("Deleting", "Question"), {
      variant: "info",
    });
    mutate(
      {},
      {
        onError: () => {
          enqueueSnackbar(errorMessages.default, { variant: "error" });
        },
        onSettled: () => {
          reset();
        },
        onSuccess: () => {
          queryClient.invalidateQueries(["Quiz Questions", id]);
          enqueueSnackbar(
            successMessages.actionSuccess("Deleted", "Question"),
            { variant: "success" }
          );
        },
      }
    );
  };

  return (
    <div
      className={`rounded-md py-3${
        expanded && expandQuestion === question._id ? " bg-gray-100" : ""
      } mb-4`}
    >
      <div
        onClick={() => {
          setExpanded(true);
          setExpandQuestion(question._id);
        }}
        className={`transition-all duration-300 cursor-pointer flex`}
      >
        <p
          className={`w-8 h-8 bg-gray-400 text-white text-sm rounded-full flex items-center justify-center`}
        >
          {index + 1}
        </p>
        {expanded && showQuestions && (
          <p className="pl-4 w-10/12">
            {question.title.length > 60
              ? question.title.slice(0, 60) + "..."
              : question.title}
          </p>
        )}
      </div>
      {expanded && (
        <div
          className="transition-all duration-800 overflow-hidden flex"
          style={{ maxHeight: expandQuestion === question._id ? "60px" : 0 }}
        >
          <div className="flex ml-auto">
            <div
              onClick={onDeleteQuestion}
              className="p-2 bg-indigo-600 rounded-full mr-4 cursor-pointer"
            >
              <AiFillDelete fill="#fff" size={16} />
            </div>
            <div
              onClick={() =>
                navigate(`/quizes/${id}/questions/${question._id}`)
              }
              className="p-2 bg-indigo-600 rounded-full mr-4 cursor-pointer"
            >
              <AiFillEdit fill="#fff" size={16} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
