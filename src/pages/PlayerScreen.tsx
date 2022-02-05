import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Option } from "../components/Option";
import { Player } from "../components/Player";
import { Sidebar } from "../components/Sidebar";
import { Loader } from "../components/Svgs";
import { IOption, IQuestion, IResponse } from "../shared/interfaces";
import { useQuizQuestions } from "../shared/queries";

interface Props {}

export const PlayerScreen: React.FC<Props> = () => {
  const params = useParams() as { id: string };
  const { isLoading, isFetching, data } = useQuizQuestions(params.id, {
    staleTime: Infinity,
  });
  // const [questions, setQuestions] = useState<IQuestion[]>(data?.questions);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [response, setResponse] = useState<IResponse[] | []>([]);
  const [quizEnd, setQuizEnd] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  console.log(data?.questions);

  const onSubmit = () => {
    setQuizEnd(true);

    let score = 0;

    response.forEach((res) => {
      if (res.correct === res.response) {
        score = score + 1;
      }
    });

    setScore(score);
  };

  useEffect(() => {
    const response = data?.questions.map((question: IQuestion) => ({
      ...question,
      response: "",
    }));

    setResponse(response);
  }, [data?.questions]);

  return isLoading || isFetching ? (
    <Loader />
  ) : (
    <div className="h-screen w-full flex flex-col flex-1 overflow-y-hidden">
      {/* Header */}
      <div className="min-h-[8%] flex justify-between items-center px-10 border-b">
        {!quizEnd && (
          <div className="flex items-center">
            <p className="mr-4">
              {response?.length} / {data?.questions.length} Completed
            </p>
            <div
              className="bg-gray-200 rounded-full h-1"
              style={{ width: 150 }}
            >
              <div
                className="bg-indigo-600 rounded-full h-1"
                style={{
                  width: `${
                    (response?.length / data?.questions.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        )}

        <div>
          {!quizEnd && (
            <button
              onClick={onSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 px-10 py-3 rounded-md text-white"
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <div className="min-h-[95%] flex flex-row flex-1 overflow-y-auto">
        {!quizEnd ? (
          <>
            <Sidebar
              questions={data?.questions}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
            <div className="flex-1  overflow-y-auto">
              <div className="min-h-[8%] border-b border-gray-200 flex px-4 py-4 justify-between">
                <p className="mt-auto">Question {activeIndex + 1}</p>
              </div>
              <Player
                questions={data?.questions}
                response={response}
                setResponse={setResponse}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>
          </>
        ) : (
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
                    correctAns={"Correct Answer"}
                    option={{ value: "Correct Answer" }}
                    disabled={true}
                  />
                  <Option
                    selectedOption={"Correct Answer"}
                    correctAns={"Some Correct Answer"}
                    option={{ value: "Correct Answer" }}
                    disabled={true}
                  />

                  <Option
                    selectedOption={"Your chose correct answer"}
                    correctAns={"Your chose correct answer"}
                    option={{ value: "Your chose correct answer" }}
                    disabled={true}
                  />
                </div>
                {response.map((resp, i) => (
                  <div className="mt-10 mb-20 shadow-sm" key={i}>
                    <p>{resp.title}</p>
                    <div className="flex flex-col items-start">
                      {resp.options.map((option: IOption, i: number) => (
                        <Option
                          selectedOption={resp.response}
                          key={i}
                          correctAns={resp.correct}
                          option={option}
                          disabled={true}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
