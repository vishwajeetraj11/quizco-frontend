import { IOption } from "../shared/interfaces";
import { EmptyResponse } from "./EmptyResponse";
import { Option } from "./Option";
interface Props {
  responses: any;
  score: number;
  as: "AFTER_QUIZ_RESPONSE" | "AUTHOR_CHECK_RESPONSE" | "USER_CHECK_RESPONSE";
  quizDeleted?: boolean;
}

export const ShowResponses: React.FC<Props> = ({
  responses,
  score,
  as,
  quizDeleted,
}) => {
  const AFTER_QUIZ_RESPONSE = as === "AFTER_QUIZ_RESPONSE";
  const AUTHOR_CHECK_RESPONSE = as === "AUTHOR_CHECK_RESPONSE";
  // const USER_CHECK_RESPONSE = as === "USER_CHECK_RESPONSE";

  return (
    <>
      <div className="flex flex-col items-center mt-10 w-full">
        {AFTER_QUIZ_RESPONSE && (
          <h1 className="text-xl md:text-3xl mb-5">
            Thank you for playing this Quiz
          </h1>
        )}
        {quizDeleted && (
          <p className="text-xl mb-2 text-rose-600">
            This Quiz has been Deleted.
          </p>
        )}
        <p className="text-xl">
          Here is {AUTHOR_CHECK_RESPONSE ? "his" : "your"} score: {score}
        </p>

        <div className="mt-4 mx-5 /12 md:mx-0 md:w-8/12">
          <div className="grid-responses-options-show">
            {responses.length > 0 && (
              <>
                <div>
                  <p>Correct Answer</p>
                  <Option
                    selectedOption={""}
                    correctAns={"Option"}
                    option={{ value: "Option" }}
                    disabled
                  />
                </div>
                <div>
                  <p>{AUTHOR_CHECK_RESPONSE ? "His" : "Your"} Response</p>
                  <Option
                    selectedOption={"Option"}
                    correctAns={"Some Option"}
                    option={{ value: "Option" }}
                    disabled
                  />
                </div>
                <div>
                  <p>
                    {AUTHOR_CHECK_RESPONSE ? "He" : "You"} chose correct option
                  </p>

                  <Option
                    selectedOption={"Option"}
                    correctAns={"Option"}
                    option={{ value: "Option" }}
                    disabled
                  />
                </div>
              </>
            )}
          </div>
          {responses.length > 0 ? (
            <div className="mt-10">
              <p className="mb-2 text-xl font-medium">Answers</p>
              {responses.map((resp: any, i: number) => (
                <div className="mb-20 shadow-sm" key={i}>
                  <p>{resp.title}</p>
                  <div className="flex flex-col items-start">
                    {resp.options.map((option: IOption, i: number) => (
                      <Option
                        key={i}
                        selectedOption={resp.response}
                        correctAns={resp.correct}
                        option={option}
                        disabled
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <EmptyResponse resource="Responses" />
            </>
          )}
        </div>
      </div>
    </>
  );
};
