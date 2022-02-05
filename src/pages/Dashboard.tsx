import { useUser } from "@clerk/clerk-react";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizCard } from "../components/QuizCard";
import { Loader } from "../components/Svgs";
import { IQuiz } from "../shared/interfaces";
import { useQuizes } from "../shared/queries";
import { endpoints } from "../shared/urls";

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const { id } = useUser();
  const { data, isLoading } = useQuizes(
    `${endpoints.quizes}?userId=${id}`,
    "Current User"
  );

  const navigate = useNavigate();

  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz | undefined>();

  const onUpdate = () => {
    navigate(`/quizes/${selectedQuiz?._id}/update`);
  };

  const onDelete = () => {};

  return (
    <div>
      <h3 className="text-2xl font-semibold text-center my-3">Dashboard</h3>
      <h4 className="text-xl font-medium text-left mb-3">
        Your Created Quizes
      </h4>
      {data?.quizes.length && (
        <div className="bg-gray-100 rounded px-8 py-6 transition-all flex flex-col lg:flex-row items-center justify-between mb-4">
          <h2 className="text-regular text-lg font-medium text-default">
            {`${
              selectedQuiz
                ? `Selected Quiz : ${selectedQuiz.title}`
                : "Select a Quiz"
            }`}
          </h2>
          <h2 className="text-regular text-lg font-medium text-default"></h2>
          <div className="mt-6 lg:mt-0">
            {selectedQuiz && (
              <>
                <Button
                  onClick={onUpdate}
                  className="mr-6"
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
                <Button
                  style={{
                    border: "2px solid #e74c3c",
                    color: "#e74c3c",
                    padding: "6px 16px",
                  }}
                  onClick={onDelete}
                  variant="text"
                >
                  Delete
                </Button>
                <Button
                  onClick={() =>
                    navigate(`/quizes/${selectedQuiz._id}/questions`)
                  }
                  variant="text"
                >
                  Add Questions
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-3">
        {isLoading ? (
          <Loader />
        ) : (
          data?.quizes.map((quiz: IQuiz) => (
            <QuizCard
              onSelect={() => setSelectedQuiz(quiz)}
              key={quiz._id}
              {...quiz}
            />
          ))
        )}
      </div>
    </div>
  );
};
