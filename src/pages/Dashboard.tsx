import { useEffect, useState } from "react";
import {
  FiBarChart2,
  FiBookOpen,
  FiEdit3,
  FiLayers,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "../components/DeleteModal";
import { EmptyResponse } from "../components/EmptyResponse";
import { ErrorMessage } from "../components/ErrorMessage";
import { QuizCard } from "../components/QuizCard";
import { Loader } from "../components/Svgs";
import { errorMessages, successMessages } from "../shared/constants";
import { IQuiz } from "../shared/interfaces";
import { useDeleteQuiz, useQuizes } from "../shared/queries";
import { endpoints } from "../shared/urls";
import { Button } from "../ui";
import { useSnackbar } from "../ui/snackbar";

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz | null>(null);

  const { data, isLoading, isSuccess, isFetching, error } = useQuizes(
    `${endpoints.quizes}?loggedIn=true&page=${currentPage}`,
    ["Quizes", "Current User", currentPage]
  );

  useEffect(() => {
    if (isSuccess) {
      setTotalPages(data.count ? Math.ceil(data.count / 6) : 1);
    }
  }, [data?.count, isSuccess]);

  useEffect(() => {
    if (!data?.quizes?.length) {
      setSelectedQuiz(null);
      return;
    }

    if (
      selectedQuiz &&
      !data.quizes.some((quiz: IQuiz) => quiz._id === selectedQuiz._id)
    ) {
      setSelectedQuiz(null);
    }
  }, [data?.quizes, selectedQuiz]);

  const handleDeleteModalOpen = () => setDeleteModalActive(true);
  const handleDeleteModalClose = () => setDeleteModalActive(false);

  const navigate = useNavigate();

  const onUpdate = () => {
    navigate(`/quizes/${selectedQuiz?._id}/update`);
  };

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const {
    isLoading: isDeleteCampaignLoading,
    reset,
    mutateAsync,
  } = useDeleteQuiz(selectedQuiz?._id || "id");

  const visibleQuizes: IQuiz[] = data?.quizes || [];

  const summaryCards = [
    {
      label: "Total quizes",
      value: data?.count || 0,
      description: "All quizzes in your workspace.",
      icon: <FiLayers size={18} />,
    },
    {
      label: "Visible active",
      value: visibleQuizes.filter((quiz) => quiz.status === "active").length,
      description: "Ready for people to play on this page.",
      icon: <FiBarChart2 size={18} />,
    },
    {
      label: "Questions on page",
      value: visibleQuizes.reduce((total, quiz) => total + quiz.questionsCount, 0),
      description: "Question coverage across the current results.",
      icon: <FiBookOpen size={18} />,
    },
    {
      label: "Tracked attempts",
      value: visibleQuizes.reduce((total, quiz) => total + quiz.attemptsCount, 0),
      description: "Play sessions connected to these quizzes.",
      icon: <FiEdit3 size={18} />,
    },
  ];

  if (error?.response?.status) {
    return (
      <ErrorMessage
        message={error.response.data.message}
        statusCode={error.response.status}
      />
    );
  }

  const onDelete = () => {
    mutateAsync(
      {},
      {
        onSuccess: () => {
          enqueueSnackbar(successMessages.actionSuccess("Deleted", "Quiz"), {
            variant: "success",
          });
          queryClient.invalidateQueries(["Quizes", "Current User"]);
          setSelectedQuiz(null);
        },
        onError: () => {
          enqueueSnackbar(errorMessages.default, { variant: "error" });
        },
        onSettled: () => {
          reset();
          handleDeleteModalClose();
        },
      }
    );
  };

  return (
    <div className="pb-10">
      <section className="app-panel overflow-hidden px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="section-chip">Workspace overview</span>
            <h1 className="mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Manage your quiz library with more clarity
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Keep an eye on your quizzes, pick one to work on, and jump
              straight into updates, analytics, or question changes.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              color="primary"
              endIcon={<FiPlus size={16} />}
              onClick={() => navigate("/quizes/add")}
              variant="contained"
            >
              Create Quiz
            </Button>
            <Button
              color="primary"
              onClick={() => navigate("/dashboard/attempts")}
              variant="outlined"
            >
              My Attempts
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((item) => (
            <div
              key={item.label}
              className="rounded-[24px] border border-white/70 bg-white/72 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center gap-3 text-teal-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50">
                  {item.icon}
                </div>
                <p
                  className="text-xs font-medium uppercase text-slate-500"
                  style={{ letterSpacing: "0.18em" }}
                >
                  {item.label}
                </p>
              </div>
              <p className="mt-4 text-4xl font-semibold text-slate-900">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {visibleQuizes.length > 0 && (
        <section className="app-panel-soft mt-6 px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p
                className="text-xs font-medium uppercase text-slate-500"
                style={{ letterSpacing: "0.18em" }}
              >
                Selected quiz
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                {selectedQuiz ? selectedQuiz.title : "Choose a quiz to manage"}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {selectedQuiz
                  ? selectedQuiz.description
                  : "Pick any card below to unlock quick actions for that quiz."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {selectedQuiz && (
                <>
                  <Button
                    color="primary"
                    onClick={() =>
                      navigate(`/statistics/quiz/${selectedQuiz._id}`)
                    }
                    variant="outlined"
                  >
                    Statistics
                  </Button>
                  <Button
                    color="primary"
                    onClick={onUpdate}
                    variant="outlined"
                  >
                    Update
                  </Button>
                  <Button
                    color="secondary"
                    onClick={handleDeleteModalOpen}
                    variant="text"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FiTrash2 size={15} />
                      Delete
                    </span>
                  </Button>
                  <Button
                    color="primary"
                    endIcon={<FiPlus size={16} />}
                    onClick={() =>
                      navigate(`/quizes/${selectedQuiz._id}/questions`)
                    }
                    variant="contained"
                  >
                    Add or Update Questions
                  </Button>
                </>
              )}
            </div>
          </div>

          {selectedQuiz && (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Status",
                  value: selectedQuiz.status,
                },
                {
                  label: "Questions",
                  value: selectedQuiz.questionsCount,
                },
                {
                  label: "Attempts",
                  value: selectedQuiz.attemptsCount,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[20px] bg-white px-5 py-4 shadow-sm"
                >
                  <p
                    className="text-xs font-medium uppercase text-slate-500"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    {item.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold capitalize text-slate-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {isLoading || isFetching ? (
        <Loader halfScreen />
      ) : visibleQuizes.length > 0 ? (
        <>
          <div className="mt-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">
                My quizes
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>

          <div className="grid grid-flow-row gap-7 pb-8 pt-6 grid-quizes">
            {visibleQuizes.map((quiz: IQuiz) => (
              <QuizCard
                onSelect={() => setSelectedQuiz(quiz)}
                selected={selectedQuiz?._id === quiz._id}
                key={quiz._id}
                {...quiz}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-6">
          <EmptyResponse resource="Dashboard Quizes" />
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {Array.from(Array(totalPages).keys()).map((_, index) => (
            <Button
              color="primary"
              variant={currentPage - 1 === index ? "contained" : "outlined"}
              key={index}
              onClick={() => {
                setSelectedQuiz(null);
                setCurrentPage(index + 1);
              }}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}

      {deleteModalActive && (
        <DeleteModal
          deleteLoading={isDeleteCampaignLoading}
          deleteModalActive={deleteModalActive}
          handleDeleteModalClose={handleDeleteModalClose}
          onDelete={onDelete}
          resource="Quiz"
        />
      )}
    </div>
  );
};
