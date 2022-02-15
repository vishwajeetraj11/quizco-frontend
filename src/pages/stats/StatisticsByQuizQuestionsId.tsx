import { ColDef } from "ag-grid-community";
import { useState } from "react";
import { useParams } from "react-router-dom";
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

  const [list, setList] = useState([]);

  //   useEffect(() => {
  //     if (isSuccess) {
  //       const user = data.users.map((user: IStatsByQuiz) => {
  //         return {
  //           score: user.attempt.score,
  //           attemptId: user.attempt._id,
  //           ...user.user,
  //           maxAttempts: user.maxAttempts.val,
  //         };
  //       });
  //       setList(user);
  //     }
  //   }, [data?.users, isSuccess]);

  const colDefs: ColDef[] = [
    {
      headerName: "Quesiton",
      field: "title",
    },
    {
      headerName: "Correct",
      field: "correct",
    },
    {
      headerName: "Attempts",
      field: "email",
      minWidth: 250,
    },
    {
      headerName: "Facility Index",
      field: "score",
    },
    {
      headerName: "Standard Deviation",
      field: "maxAttempts",
    },
    {
      headerName: "Random Guess Score",
      field: "maxAttempts",
    },
    {
      headerName: "Intended Weight",
      field: "maxAttempts",
    },
    {
      headerName: "Effective Weight",
      field: "maxAttempts",
    },
    {
      headerName: "Discrimination Index",
      field: "maxAttempts",
    },
    {
      headerName: "Discrimination Efficiency",
      field: "maxAttempts",
    },
  ];

  return (
    <>
      <div>{JSON.stringify(data, undefined, 4)}</div>
    </>
  );
};
