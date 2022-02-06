import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FinishQuiz } from "../components/FinishQuiz";
import { Player } from "../components/Player";
import { Sidebar } from "../components/Sidebar";
import { Loader } from "../components/Svgs";
import { errorMessages } from "../shared/constants";
import { IQuestion, IResponse } from "../shared/interfaces";
import {
  useQuizQuestionCorrectAns,
  useQuizQuestions,
  useSaveScore,
} from "../shared/queries";

interface Props {}

export const PlayerScreen: React.FC<Props> = () => {
  const params = useParams() as { id: string };
  const { isLoading, isFetching, data } = useQuizQuestions(params.id, {
    staleTime: Infinity,
  });

  const { isLoading: isQuizCorrectAnsLoading, data: quizCorrectAnsData } =
    useQuizQuestionCorrectAns(params.id);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [response, setResponse] = useState<IResponse[] | []>([]);
  const [respWithCorrectAns, setRespWithCorrectAns] = useState<any>([]);
  const [quizEnd, setQuizEnd] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  const {
    mutateAsync,
    reset,
    isLoading: isSaveScoreLoading,
  } = useSaveScore(params.id);

  const onSubmit = () => {
    setQuizEnd(true);
    let score = 0;

    const responseWithAns: any = response.map((resp, index) =>
      quizCorrectAnsData?.questions[index].title === resp.title
        ? { ...resp, correct: quizCorrectAnsData?.questions[index].correct }
        : { ...resp }
    );

    setRespWithCorrectAns(responseWithAns);

    responseWithAns.forEach((res: any) => {
      if (res.correct === res.response) {
        score = score + 1;
      }
    });

    setScore(score);

    mutateAsync(
      { body: { score } },
      {
        onError: () => {
          enqueueSnackbar(errorMessages.default);
        },
        onSuccess: () => {
          enqueueSnackbar("Score Saved.");
        },
        onSettled: () => {
          // reset();
        },
      }
    );
  };

  useEffect(() => {
    const response = data?.questions.map((question: IQuestion) => ({
      ...question,
      response: "",
    }));

    setResponse(response);
  }, [data?.questions]);

  return isLoading || isFetching ? (
    <Loader halfScreen />
  ) : (
    <div className="h-screen w-full flex flex-col flex-1 overflow-y-hidden">
      {/* Header */}
      <div className="min-h-[8%] flex justify-between items-center px-10 border-b">
        <div></div>
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
                {!quizEnd && (
                  <div className="flex items-center">
                    <p className="mr-4">
                      {response?.filter((resp) => resp.response !== "").length}{" "}
                      / {data?.questions.length} Completed
                    </p>
                    <div
                      className="bg-gray-200 rounded-full h-1"
                      style={{ width: 150 }}
                    >
                      <div
                        className="bg-indigo-600 rounded-full h-1"
                        style={{
                          width: `${
                            (response?.filter((resp) => resp.response !== "")
                              .length /
                              data?.questions.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {!quizEnd && (
                  <button
                    onClick={onSubmit}
                    className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 px-10 py-3 rounded-md text-white"
                  >
                    Submit
                  </button>
                )}
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
            {isQuizCorrectAnsLoading || isSaveScoreLoading ? (
              <Loader halfScreen />
            ) : (
              <FinishQuiz score={score} responses={respWithCorrectAns} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
