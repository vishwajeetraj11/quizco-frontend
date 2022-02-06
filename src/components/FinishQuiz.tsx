import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { errorMessages } from "../shared/constants";
import { IOption, IResponse } from "../shared/interfaces";
import { useQuizQuestionCorrectAns, useSaveScore } from "../shared/queries";
import { Option } from "./Option";
import { Loader } from "./Svgs";
interface Props {
  response: IResponse[];
}

export const FinishQuiz: React.FC<Props> = ({ response }) => {
  const { id } = useParams() as { id: string };
  const { isLoading, data } = useQuizQuestionCorrectAns(id);
  const {
    mutateAsync,
    reset,
    isLoading: isSaveScoreLoading,
  } = useSaveScore(id);
  const [score, setScore] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();

  const [responses, setResponses] = useState<any>([]);

  useEffect(() => {
    setResponses(
      response.map((resp, index) =>
        data?.questions[index].title === resp.title
          ? { ...resp, correct: data?.questions[index].correct }
          : { ...resp }
      )
    );
  }, [data, response]);

  useEffect(() => {
    const onSubmit = async () => {
      if (responses.length === response.length) {
        let score = 0;
        responses.forEach((res: any) => {
          if (res.correct === res.response) {
            score = score + 1;
          }
        });
        // enqueueSnackbar('Saving Score...');
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
        setScore(score);
      }
    };

    onSubmit();
  }, [enqueueSnackbar, id, mutateAsync, reset, responses]);

  return (
    <>
      {isLoading || isSaveScoreLoading ? (
        <Loader halfScreen />
      ) : (
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
                disabled={true}
              />
              <Option
                selectedOption={"Option"}
                correctAns={"Some Option"}
                option={{ value: "Option" }}
                disabled={true}
              />

              <Option
                selectedOption={"Option"}
                correctAns={"Option"}
                option={{ value: "Option" }}
                disabled={true}
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
                      disabled={true}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
