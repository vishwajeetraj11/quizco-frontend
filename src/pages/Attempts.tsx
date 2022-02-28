import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { EmptyResponse } from "../components/EmptyResponse";
import { ErrorMessage } from "../components/ErrorMessage";
import { QuizCard } from "../components/QuizCard";
import { Loader } from "../components/Svgs";
import { IAttempt } from "../shared/interfaces";
import { useMyAttempts } from "../shared/queries";
import { endpoints } from "../shared/urls";

interface Props {}

export const Attempts: React.FC<Props> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, isFetching, isSuccess, error } = useMyAttempts(
    `${endpoints.attempts}?page=${currentPage}`,
    ["My Attempts", currentPage]
  );

  useEffect(() => {
    if (isSuccess) {
      setTotalPages(data.count ? Math.ceil(data.count / 6) : 1);
    }
  }, [data?.count, isSuccess]);

  if (error?.response?.status) {
    return (
      <ErrorMessage
        message={error.response.data.message}
        statusCode={error.response.status}
      />
    );
  }
  return (
    <div>
      <h3 className="text-2xl font-semibold text-center mt-3 mb-10">
        My Attempts
      </h3>

      {isLoading || isFetching ? (
        <Loader halfScreen />
      ) : data?.attempts.length > 0 ? (
        <>
          <div className="grid gap-7 mt-10 grid-flow-row grid-quizes pb-8">
            {data?.attempts.map((attempt: IAttempt) => (
              <QuizCard
                redirect={`/dashboard/attempts/${attempt._id}`}
                key={attempt._id}
                {...attempt.quiz}
                score={attempt.score}
              />
            ))}
          </div>
          <div>
            {totalPages > 1 &&
              Array.from(Array(totalPages).keys()).map((loader, index) => (
                <Button
                  color="primary"
                  variant={currentPage - 1 === index ? "contained" : "text"}
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
          </div>
        </>
      ) : (
        <>
          <EmptyResponse resource="Attempt" />
        </>
      )}
    </div>
  );
};
