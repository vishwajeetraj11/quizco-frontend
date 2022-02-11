import { EmptyResponse } from "../components/EmptyResponse";
import { QuizCard } from "../components/QuizCard";
import { Loader } from "../components/Svgs";
import { IQuiz } from "../shared/interfaces";
import { useQuizes } from "../shared/queries";
import { endpoints } from "../shared/urls";

export const Quizes = () => {
  const { data, isLoading } = useQuizes(`${endpoints.quizes}`, "All");

  return (
    <div>
      <h3 className="text-2xl font-semibold text-center my-3">All Quizes</h3>
      {isLoading ? (
        <Loader halfScreen />
      ) : data?.quizes.length > 0 ? (
        <div className="grid grid-cols-3 gap-7 mt-10">
          {data?.quizes.map((quiz: IQuiz) => (
            <QuizCard key={quiz._id} {...quiz} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyResponse resource="All Active Quizes" />
        </div>
      )}
    </div>
  );
};
