import { Button } from "@material-ui/core";
import {
  ColDef,
  ColumnApi,
  GridApi,
  ICellRendererParams,
} from "ag-grid-community";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DownloadButton } from "../../components/Dropdown";
import { GridWrapper } from "../../components/GridWrapper";
import { IStatsByQuiz } from "../../shared/interfaces";
import { useStatsByQuizId } from "../../shared/queries";

interface Props {}

export const StatisticsByQuiz: React.FC<Props> = () => {
  const { quizId } = useParams() as { quizId: string };
  const { isLoading, data, isSuccess } = useStatsByQuizId(quizId);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState<string[]>([]);
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
      maxWidth: 100,
      cellStyle: { display: "flex", textAlign: "center" },
    },
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
      field: "view_attempt",
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
    <div className="flex flex-col flex-1 overflow-y-hidden overflow-x-auto">
      <div className="flex justify-end my-4">
        <div className="mr-4">
          <DownloadButton
            selected={selected}
            gridApi={gridApi}
            gridColumnApi={gridColumnApi}
            quizId={quizId}
            excludedColumns={["photo", "view_attempt"]}
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
          loading={isLoading}
          colDefs={colDefs}
          list={list}
        />
      </div>
    </div>
  );
};
