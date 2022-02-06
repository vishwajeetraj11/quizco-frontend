import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { AddQuestionsSidebar } from "../components/AddQuestionsSidebar";
import { ErrorMessage } from "../components/ErrorMessage";
import { AddQuestionForm } from "../components/forms/AddQuestionForm";
import { Loader } from "../components/Svgs";
import { useQuizQuestions } from "../shared/queries";

interface Props {}
export const AddQuestions: React.FC<Props> = () => {
  const { id } = useParams() as { id: string };
  const { isLoading, data } = useQuizQuestions(id);
  const { id: userId } = useUser();

  if (data?.quiz.author !== userId) {
    return <ErrorMessage statusCode={403} />;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-screen w-full flex flex-col flex-1 overflow-y-hidden">
      <div className="min-h-[8%] flex justify-between items-center px-10 border-b">
        <div className="flex items-center">
          <p className="mr-4">{data?.questions.length} / 20 Completed</p>
          <div className="bg-gray-200 rounded-full h-1" style={{ width: 150 }}>
            <div
              className="bg-indigo-600 rounded-full h-1"
              style={{
                width: `${(data?.questions.length / 20) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="min-h-[95%] flex flex-row flex-1 overflow-y-auto">
        <AddQuestionsSidebar questions={data?.questions} />
        <div className="flex-1  overflow-y-auto">
          <div className="min-h-[8%] border-b border-gray-200 flex px-4 py-4 justify-between">
            <p className="mt-auto">Add Question</p>
          </div>
          <div className="pl-4 pr-10 mt-4">
            <AddQuestionForm />
          </div>
        </div>
      </div>
    </div>
  );
};
