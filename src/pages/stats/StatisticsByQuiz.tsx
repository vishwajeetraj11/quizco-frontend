import { ColDef, ColumnApi, GridApi, ICellRendererParams } from "ag-grid-community";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DownloadButton } from "../../components/Dropdown";
import { GridWrapper } from "../../components/GridWrapper";
import { IStatsByQuiz } from "../../shared/interfaces";
import { Button } from "../../ui";
import { useStatsByQuizId } from "../../shared/queries";

interface Props {}

export const StatisticsByQuiz: React.FC<Props> = () => {
  const { quizId } = useParams() as { quizId: string };
  const { isLoading, data, isSuccess } = useStatsByQuizId(quizId);
  const [list, setList] = useState([]);
  const selected: string[] = [];
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
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
      headerName: "",
      field: "select",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      minWidth: 72,
      maxWidth: 72,
      width: 72,
      cellStyle: { display: "flex", textAlign: "center" },
    },
    {
      headerName: "First Name",
      field: "firstName",
      flex: 1,
      minWidth: 160,
    },
    {
      headerName: "Last Name",
      field: "lastName",
      flex: 1,
      minWidth: 160,
    },
    {
      headerName: "Email",
      field: "email",
      flex: 1.35,
      minWidth: 280,
    },
    {
      headerName: "1st Attempt Score",
      field: "score",
      flex: 0.9,
      minWidth: 170,
    },
    {
      headerName: "Max Attempts",
      field: "maxAttempts",
      flex: 0.9,
      minWidth: 160,
    },
    {
      headerName: "View Attempt",
      field: "view_attempt",
      flex: 1,
      minWidth: 190,
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
  ];

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-y-hidden">
      <div className="my-4 flex w-full flex-wrap items-center justify-end gap-4">
        <div>
          <DownloadButton
            selected={selected}
            gridApi={gridApi}
            gridColumnApi={gridColumnApi}
            quizId={quizId}
            excludedColumns={["view_attempt"]}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/statistics/${quizId}/questions/`)}
        >
          View All Questions
        </Button>
      </div>
      <div style={{ height: "85vh" }}>
        <GridWrapper
          setGridApiParent={setGridApi}
          setGridColApiParent={setGridColumnApi}
          fitColumns
          loading={isLoading}
          colDefs={colDefs}
          list={list}
        />
      </div>
    </div>
  );
};
