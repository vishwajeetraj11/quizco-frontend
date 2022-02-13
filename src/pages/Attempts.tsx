import { EmptyResponse } from "../components/EmptyResponse";
import { QuizCard } from "../components/QuizCard";
import { Loader } from "../components/Svgs";
import { IAttempt } from "../shared/interfaces";
import { useMyAttempts } from "../shared/queries";

interface Props {}

export const Attempts: React.FC<Props> = () => {
  const { data, isLoading } = useMyAttempts();

  // const navigate = useNavigate();

  return (
    <div>
      <h3 className="text-2xl font-semibold text-center mt-3 mb-10">
        My Attempts
      </h3>

      {isLoading ? (
        <Loader halfScreen />
      ) : data?.attempts.length > 0 ? (
        <div
          className="grid gap-7 mt-10 grid-flow-row"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {data?.attempts.map((attempt: IAttempt) => (
            <QuizCard
              redirect={`/dashboard/attempts/${attempt._id}`}
              key={attempt._id}
              {...attempt.quiz}
              score={attempt.score}
            />
          ))}
        </div>
      ) : (
        <>
          <EmptyResponse resource="Attempt" />
        </>
      )}
    </div>
  );
};
