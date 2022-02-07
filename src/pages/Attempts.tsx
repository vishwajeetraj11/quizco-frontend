import { useNavigate } from "react-router-dom";
import { QuizCard } from "../components/QuizCard";
import { Loader } from "../components/Svgs";
import { IAttempt } from "../shared/interfaces";
import { useMyAttempts } from "../shared/queries";

interface Props {}

export const Attempts: React.FC<Props> = () => {
  const { data, isLoading } = useMyAttempts();

  const navigate = useNavigate();
  console.log(data);
  return (
    <div>
      <h3 className="text-2xl font-semibold text-center my-3">Dashboard</h3>
      <div className="flex justify-between mb-4">
        <h4 className="text-xl font-medium text-left mb-3 items-center">
          Your Attempted Quizes
        </h4>
      </div>
      {isLoading ? (
        <Loader halfScreen />
      ) : (
        <div className="grid grid-cols-3 gap-7 mt-10">
          {data?.attempts.map((attempt: IAttempt) => (
            <QuizCard
              key={attempt._id}
              {...attempt.quiz}
              score={attempt.score}
            />
          ))}
        </div>
      )}
    </div>
  );
};
