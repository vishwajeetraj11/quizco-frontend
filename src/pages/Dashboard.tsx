import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "../components/DeleteModal";
import { QuizCard } from "../components/QuizCard";
import { Loader } from "../components/Svgs";
import { errorMessages, successMessages } from "../shared/constants";
import { IQuiz } from "../shared/interfaces";
import { useDeleteQuiz, useQuizes } from "../shared/queries";
import { endpoints } from "../shared/urls";

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const { data, isLoading } = useQuizes(
    `${endpoints.quizes}?loggedIn=true`,
    "Current User"
  );

  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const handleDeleteModalOpen = () => setDeleteModalActive(true);
  const handleDeleteModalClose = () => setDeleteModalActive(false);

  const navigate = useNavigate();

  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz | undefined>();

  const onUpdate = () => {
    navigate(`/quizes/${selectedQuiz?._id}/update`);
  };
  const { enqueueSnackbar } = useSnackbar();

  const {
    isLoading: IsDeleteCampaignLoading,
    reset,
    mutateAsync,
  } = useDeleteQuiz(selectedQuiz?._id || "id");

  const onDelete = () => {
    mutateAsync(
      {},
      {
        onSuccess: () => {
          enqueueSnackbar(successMessages.actionSuccess("Deleted", "Quiz"));
        },
        onError: () => {
          enqueueSnackbar(errorMessages.default);
        },
        onSettled: () => {
          reset();
          handleDeleteModalClose();
        },
      }
    );
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-center my-3">Dashboard</h3>
      <div className="flex justify-between mb-4">
        <h4 className="text-xl font-medium text-left mb-3 items-center">
          Your Created Quizes
        </h4>
        <div className="flex items-center">
          <Button
            onClick={() => navigate(`/quizes/add`)}
            variant="contained"
            color="primary"
          >
            + Create a Quiz
          </Button>

          <div className="ml-4">
            <Button
              onClick={() => navigate(`/dashboard/attempts`)}
              variant="outlined"
              color="primary"
            >
              My Attempts
            </Button>
          </div>
        </div>
      </div>
      {data?.quizes.length > 0 && (
        <div className="bg-gray-100 rounded px-8 py-6 transition-all flex flex-col lg:flex-row items-center justify-between mb-4">
          <h2 className="text-regular text-lg font-medium text-default">
            {`${
              selectedQuiz
                ? `Selected Quiz : ${selectedQuiz.title}`
                : "Select a Quiz"
            }`}
          </h2>
          <div className="mt-6 lg:mt-0">
            {selectedQuiz && (
              <div className="flex">
                <div className="mr-4">
                  <Button onClick={onUpdate} className="mr-6">
                    Update
                  </Button>
                </div>
                <div className="mr-4">
                  <Button onClick={handleDeleteModalOpen} variant="text">
                    Delete
                  </Button>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate(`/quizes/${selectedQuiz._id}/questions`)
                  }
                >
                  + Add Questions
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {isLoading ? (
        <Loader halfScreen />
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {data?.quizes.map((quiz: IQuiz) => (
            <QuizCard
              onSelect={() => setSelectedQuiz(quiz)}
              key={quiz._id}
              {...quiz}
            />
          ))}
        </div>
      )}
      {deleteModalActive && (
        <DeleteModal
          deleteLoading={IsDeleteCampaignLoading}
          deleteModalActive={deleteModalActive}
          handleDeleteModalClose={handleDeleteModalClose}
          onDelete={onDelete}
          resource="Quiz"
        />
      )}
    </div>
  );
};
