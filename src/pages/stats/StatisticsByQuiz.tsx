import { ColDef, ICellRendererParams } from "ag-grid-community";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GridWrapper } from "../../components/GridWrapper";
import { IStatsByQuiz } from "../../shared/interfaces";
import { useStatsByQuizId } from "../../shared/queries";

interface Props {}

export const StatisticsByQuiz: React.FC<Props> = () => {
  const { quizId } = useParams() as { quizId: string };
  const { isLoading, data, isSuccess } = useStatsByQuizId(quizId);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      const user = data.users.map((user: IStatsByQuiz) => {
        return {
          score: user.attempt.score,
          attemptId: user.attempt._id,
          quizId: user.attempt.quiz,
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
      minWidth: 80,
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
    {
      headerName: "View Attempt",
      cellRendererFramework: (params: ICellRendererParams) => (
        <div>
          <p
            onClick={() =>
              navigate(`/dashboard/attempts/${params.data.attemptId}`, {
                state: { from: "STATISTICS" },
              })
            }
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            View Attempt
          </p>
        </div>
      ),
    },
    // {
    //   headerName: "View Record",
    //   cellRendererFramework: (params: ICellRendererParams) => (
    //     <div>
    //       <Link
    //         className="text-indigo-600 ml-2 hover:underline cursor-pointer"
    //         to={`/statistics/attempts/${params.data.attemptId}`}
    //       >
    //         View Record
    //       </Link>
    //     </div>
    //   ),
    // },
  ];

  return (
    // <div className="flex flex-col flex-1 overflow-y-hidden overflow-x-auto">
    <GridWrapper loading={isLoading} colDefs={colDefs} list={list} />
    // </div>
  );
};
