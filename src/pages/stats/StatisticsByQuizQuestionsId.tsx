import { useParams } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Loader } from "../../components/Svgs";
import { IOptionWithFrequency } from "../../shared/interfaces";
import { useStatsByQuizIdByQuestionId } from "../../shared/queries";

interface Props {}

export const StatisticsByQuizQuestionsId: React.FC<Props> = () => {
  const { quizId, questionId } = useParams() as {
    quizId: string;
    questionId: string;
  };

  const { isLoading, error, data } = useStatsByQuizIdByQuestionId(
    quizId,
    questionId
  );
  if (error?.response?.status) {
    return (
      <ErrorMessage
        message={error.response.data.message}
        statusCode={error.response.status}
      />
    );
  }
  return (
    <>
      <div>
        <h3 className="text-2xl font-semibold text-center mt-3 mb-10">
          Question Statistics
        </h3>

        {isLoading ? (
          <Loader halfScreen />
        ) : (
          <>
            <div
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
              className="grid mb-10 gap-5"
            >
              <div>
                <p>Total Responses</p>
                <p>{data?.totalResponses}</p>
              </div>
              <div>
                <p>Total Correct Responses</p>
                <p>{data?.totalCorrectResponses}</p>
              </div>
              <div>
                <p>Total Empty Responses (Omitted)</p>
                <p>{data?.totalEmptyResponses}</p>
              </div>
              <div>
                <p>Total Incorrect</p>
                <p>{data?.totalIncorrectResponses}</p>
              </div>
            </div>
            <p>{data?.question.title}</p>

            <div className="flex flex-col items-start">
              {data?.question?.options.map((option: IOptionWithFrequency) => {
                const percentage =
                  (option.frequency / data?.totalResponses) * 100;
                return (
                  <div
                    key={option._id}
                    style={{ gridTemplateColumns: "1fr 60px" }}
                    className="w-full grid mt-4"
                  >
                    <div
                      style={{ zIndex: 100 }}
                      className="py-1 px-2 rounded-r-md relative w-full bg-zinc-700"
                    >
                      <span
                        className="absolute inset-0 rounded-r-full"
                        style={{
                          opacity: 1,
                          zIndex: -1,
                          backgroundColor:
                            data?.question.correct === option.value
                              ? "#4f46e5"
                              : "#ef4444",
                          width: `${Math.round(percentage)}%`,
                        }}
                      >
                        &nbsp;
                      </span>
                      <p style={{ zIndex: 9999 }} className="text-white">
                        {option.value}
                      </p>
                    </div>
                    <p className="justify-self-center">
                      {Math.round(percentage)}%
                    </p>
                  </div>
                );
              })}
            </div>
            <div
              className="grid mt-4"
              style={{ gridTemplateColumns: "1fr 60px" }}
            >
              <span className="text-right">
                Percentage of users omitted this question :
              </span>
              <p className="justify-self-center">
                {Math.round(
                  (data?.totalEmptyResponses / data?.totalResponses) * 100
                )}
                %
              </p>
            </div>
            <div
              className="grid mt-4"
              style={{ gridTemplateColumns: "1fr 60px" }}
            >
              <span className="text-right">Total :</span>
              <p className="justify-self-center">100%</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
