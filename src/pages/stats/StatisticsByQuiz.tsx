import { ColDef, ICellRendererParams } from "ag-grid-community";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GridWrapper } from "../../components/GridWrapper";
import { useStatsByQuizId } from "../../shared/queries";

interface Props {}

export const StatisticsByQuiz: React.FC<Props> = () => {
  const { quizId } = useParams() as { quizId: string };
  const { isLoading, data, isSuccess } = useStatsByQuizId(quizId);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      const user = data.users.map((user: any) => {
        return {
          score: user.attempt.score,
          ...user.user,
          maxAttempts: user.maxAttempts.val,
        };
      });
      setList(user);
    }
  }, [data?.users, isSuccess]);

  const colDefs: ColDef[] = [
    {
      headerName: "Photo",
      field: "photo",
      autoHeight: true,
      cellRendererFramework: (params: ICellRendererParams) => (
        <div className="w-8 h-8 my-1 overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-full"
            src={params.data.photo}
            alt={"User"}
          />
        </div>
      ),
    },
    {
      headerName: "First Name",
      field: "firstName",
    },
    {
      headerName: "Last Name",
      field: "lastName",
    },
    {
      headerName: "Email",
      field: "email",
      minWidth: 250,
    },
    {
      headerName: "1st Attempt Score",
      field: "score",
    },
    {
      headerName: "Max Attempts",
      field: "maxAttempts",
    },
  ];

  return (
    // <div className="flex flex-col flex-1 overflow-y-hidden overflow-x-auto">
    <GridWrapper loading={isLoading} colDefs={colDefs} list={list} />
    // </div>
  );
};
