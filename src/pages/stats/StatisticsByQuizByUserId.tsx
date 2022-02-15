import { ColDef, ICellRendererParams } from "ag-grid-community";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage";
import { GridWrapper } from "../../components/GridWrapper";
import { useMyAttemptById } from "../../shared/queries";

interface Props {}

export const StatisticsByQuizByAttemptId: React.FC<Props> = () => {
  const { attemptId } = useParams() as { attemptId: string };

  const { isLoading, data, isSuccess, error } = useMyAttemptById(attemptId);

  const [respWithCorrectAns, setRespWithCorrectAns] = useState<any>([]);

  useEffect(() => {
    if (isSuccess) {
      setRespWithCorrectAns(
        data?.responses.map((resp: any) => {
          return {
            quiz: resp.quiz,
            correct: resp.question.correct,
            title: resp.question.title,
            options: resp.question.options,
            response: resp.question.response,
            questionId: resp.questionId,
            _id: resp.question._id,
          };
        })
      );
    }
  }, [data?.attempt.score, data?.responses, isSuccess]);

  if (error?.response?.status) {
    return (
      <ErrorMessage resource="Attempt" statusCode={error.response.status} />
    );
  }

  const colDefs: ColDef[] = [
    {
      headerName: "Question",
      field: "title",
      cellRendererFramework: (params: ICellRendererParams) => (
        <Link
          className="text-indigo-600 hover:underline cursor-pointer"
          to={`/statistics/${params.data.quiz}/questions/${params.data.questionId}`}
        >
          {params.data.title}
        </Link>
      ),
    },
    {
      headerName: "Response",
      field: "response",
    },
    {
      headerName: "Option 1",
      field: "option1",
    },
    {
      headerName: "Option 2",
      field: "option1",
    },
    {
      headerName: "Option 3",
      field: "option1",
    },
    {
      headerName: "Option 4",
      field: "option1",
    },
    {
      headerName: "Correct",
      field: "correct",
    },
  ];

  return (
    // <div className="flex flex-col flex-1 overflow-y-hidden overflow-x-auto">
    <GridWrapper
      loading={isLoading}
      colDefs={colDefs}
      list={respWithCorrectAns}
    />
    // </div>
  );
};
