import { ColDef, ICellRendererParams } from "ag-grid-community";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage";
import { GridWrapper } from "../../components/GridWrapper";
import { formatDate } from "../../shared/formatDate";
import { useQuizQuestionCorrectAns } from "../../shared/queries";

interface Props {}

export const StatisticsAllQuestions: React.FC<Props> = () => {
  const { quizId } = useParams() as { quizId: string };

  const { isLoading, data, isSuccess, error } =
    useQuizQuestionCorrectAns(quizId);

  const [list, setList] = useState<any>([]);

  useEffect(() => {
    if (isSuccess) {
      setList(
        data?.questions
          ? data?.questions.map((question: any) => {
              return {
                quiz: question.quiz,
                correct: question.correct,
                title: question.title,
                option1: question.options[0].value,
                option2: question.options[1].value,
                option3: question.options[2].value,
                option4: question.options[3].value,
                _id: question._id,
                updatedAt: formatDate(question.updatedAt),
              };
            })
          : []
      );
    }
  }, [data?.questions, isSuccess]);

  if (error?.response?.status) {
    return (
      <ErrorMessage resource="Questions" statusCode={error.response.status} />
    );
  }

  const colDefs: ColDef[] = [
    {
      headerName: "Question",
      field: "title",
      cellRendererFramework: (params: ICellRendererParams) => (
        <Link
          className="text-indigo-600 hover:underline cursor-pointer"
          to={`/statistics/${params.data.quiz}/questions/${params.data._id}`}
        >
          {params.data.title}
        </Link>
      ),
    },

    {
      headerName: "Option 1",
      field: "option1",
    },
    {
      headerName: "Option 2",
      field: "option2",
    },
    {
      headerName: "Option 3",
      field: "option3",
    },
    {
      headerName: "Option 4",
      field: "option4",
    },
    {
      headerName: "Correct",
      field: "correct",
    },
    {
      headerName: "Updated At",
      field: "updatedAt",
    },
  ];

  return (
    // <div className="flex flex-col flex-1 overflow-y-hidden overflow-x-auto">
    <GridWrapper loading={isLoading} colDefs={colDefs} list={list} />

    // </div>
  );
};
