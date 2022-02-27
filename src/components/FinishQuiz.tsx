import { IOption } from "../shared/interfaces";
import { EmptyResponse } from "./EmptyResponse";
import { Option } from "./Option";
interface Props {
  responses: any;
  score: number;
  as: "AFTER_QUIZ_RESPONSE" | "AUTHOR_CHECK_RESPONSE" | "USER_CHECK_RESPONSE";
}

export const ShowResponses: React.FC<Props> = ({ responses, score, as }) => {
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
        <p className="text-xl">
          Here is {AUTHOR_CHECK_RESPONSE ? "his" : "your"} score: {score}
        </p>

        <div className="mt-4 mx-5 md:mx-0 md:w-8/12">
          <div className="grid grid-cols-3 gap-x-7">
            {responses.length > 0 && (
              <>
                <p>Correct Answer</p>
                <p>{AUTHOR_CHECK_RESPONSE ? "His" : "Your"} Response</p>
                <p>
                  {AUTHOR_CHECK_RESPONSE ? "He" : "You"} chose correct option
                </p>

                <Option
                  selectedOption={""}
                  correctAns={"Option"}
                  option={{ value: "Option" }}
                  disabled
                />
                <Option
                  selectedOption={"Option"}
                  correctAns={"Some Option"}
                  option={{ value: "Option" }}
                  disabled
                />

                <Option
                  selectedOption={"Option"}
                  correctAns={"Option"}
                  option={{ value: "Option" }}
                  disabled
                />
              </>
            )}
          </div>
          {responses.length > 0 ? (
            responses.map((resp: any, i: number) => (
              <div className="mt-10 mb-20 shadow-sm" key={i}>
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
            ))
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
