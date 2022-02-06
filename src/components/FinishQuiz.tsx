import { IOption } from "../shared/interfaces";
import { Option } from "./Option";
interface Props {
  responses: any;
  score: number;
}

export const FinishQuiz: React.FC<Props> = ({ responses, score }) => {
  return (
    <>
      <div className="flex flex-col items-center mt-10 w-full">
        <h1 className="text-3xl mb-5">Thank you for playing this Quiz</h1>
        <p className="text-xl">Here is your score: {score}</p>

        <div className="mt-4 w-8/12">
          <div className="grid grid-cols-3 gap-x-7">
            <p>Correct Answer</p>
            <p>Your Response</p>
            <p>You chose correct option</p>

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
          </div>
          {responses.map((resp: any, i: number) => (
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
          ))}
        </div>
      </div>
    </>
  );
};
