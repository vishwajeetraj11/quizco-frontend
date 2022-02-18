import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EmptyResponse } from "../components/EmptyResponse";
import { ErrorMessage } from "../components/ErrorMessage";
import { ShowResponses } from "../components/FinishQuiz";
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
  const { isLoading, isFetching, data, error } = useQuizQuestions(params.id, {
    staleTime: Infinity,
  });

  const [fetchCorrectAns, setFetchCorrectAns] = useState(false);

  const { isLoading: isQuizCorrectAnsLoading } = useQuizQuestionCorrectAns(
    params.id,
    {
      enabled: fetchCorrectAns,
      onSuccess: (quizCorrectAnsData) => {
        findScore(quizCorrectAnsData);
      },
    }
  );

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [response, setResponse] = useState<IResponse[] | []>([]);
  const [respWithCorrectAns, setRespWithCorrectAns] = useState<any>([]);
  const [quizEnd, setQuizEnd] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync, isLoading: isSaveScoreLoading } = useSaveScore(
    params.id
  );

  const onSubmit = () => {
    setFetchCorrectAns(true);
  };

  const findScore = (quizCorrectAnsData: any) => {
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
      { body: { score, responses: responseWithAns } },
      {
        onError: () => {
          enqueueSnackbar(errorMessages.default, { variant: "error" });
        },
        onSuccess: () => {
          enqueueSnackbar("Score Saved.", { variant: "success" });
        },
        onSettled: () => {
          // reset();
        },
      }
    );
  };

  useEffect(() => {
    const response = data?.questions.map((question: IQuestion) => ({
      _id: question._id,
      title: question.title,
      quiz: question.quiz,
      options: question.options,
      response: "",
    }));

    setResponse(response);
  }, [data?.questions]);

  if (error?.response?.status) {
    return (
      <ErrorMessage
        message={error.response.data.message}
        statusCode={error.response.status}
      />
    );
  }
  if (data?.questions.length === 0) {
    return (
      <div className="mt-10">
        <EmptyResponse resource="Quiz Questions" />
      </div>
    );
  }

  return isLoading || isFetching ? (
    <Loader halfScreen />
  ) : (
    // h-screen
    <div
      style={{ height: "92vh" }}
      className="w-full flex flex-col flex-1 overflow-y-hidden"
    >
      <div className="flex flex-row flex-1 overflow-y-auto">
        {!quizEnd ? (
          <>
            <Sidebar
              questions={data?.questions}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
            <div className="flex-1  overflow-y-auto">
              <div className="min-h-[8%] border-b border-t border-gray-300 flex px-4 py-4 justify-between">
                <p className="mt-auto hidden sm:block">
                  Question {activeIndex + 1}
                </p>
                {!quizEnd && (
                  <div className="flex items-center justify-center flex-col sm:flex-row mt-auto">
                    <p className="sm:mr-4 mb-3 sm:mb-0">
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                  >
                    Submit
                  </Button>
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
              <ShowResponses
                as="AFTER_QUIZ_RESPONSE"
                score={score}
                responses={respWithCorrectAns}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
