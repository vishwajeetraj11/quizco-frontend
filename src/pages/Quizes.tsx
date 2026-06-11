import * as React from "react";
import { useState } from "react";
import { FiFilter, FiRefreshCw } from "react-icons/fi";
import { EmptyResponse } from "../components/EmptyResponse";
import { ErrorMessage } from "../components/ErrorMessage";
import { FiltersForm } from "../components/forms/FiltersForm";
import { ModalSkeleton } from "../components/Modal";
import { QuizCard } from "../components/QuizCard";
import { Loader } from "../components/Svgs";
import { IQuiz } from "../shared/interfaces";
import { useQuizes } from "../shared/queries";
import { endpoints } from "../shared/urls";
import { Button } from "../ui";

export const Quizes = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, isFetching, isSuccess, error } = useQuizes(
    `${endpoints.quizes}?search=${encodeURIComponent(
      searchTerm
    )}&tag=${encodeURIComponent(tag)}&page=${currentPage}`,
    ["Quizes", searchTerm, tag, currentPage]
  );

  const [filtersOpen, setFiltersOpen] = useState(false);
  const handleFiltersOpen = () => setFiltersOpen(true);
  const handleFiltersClose = () => setFiltersOpen(false);

  const clearFilters = () => {
    setSearchTerm("");
    setTag("");
  };

  React.useEffect(() => {
    if (isSuccess) {
      setTotalPages(data.count ? Math.ceil(data.count / 6) : 1);
    }
  }, [data?.count, isSuccess]);

  if (error?.response?.status) {
    return (
      <ErrorMessage
        message={error.response.data.message}
        statusCode={error.response.status}
      />
    );
  }

  return (
    <div className="pb-10">
      <section className="app-panel overflow-hidden px-6 py-7 sm:px-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(14rem,18rem)] xl:items-end">
          <div className="max-w-3xl">
            <span className="section-chip">Explore quizzes</span>
            <h1 className="mt-5 max-w-2xl text-3xl font-semibold text-slate-900 sm:text-4xl">
              Scan active quizzes at a glance before you open one
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Titles, question counts, attempts, and tags surface first so you
              can decide quickly, then open the full overview only when you
              need more context.
            </p>
          </div>

          <div className="xl:justify-self-end">
            <p
              className="text-[11px] font-semibold uppercase text-slate-500"
              style={{ letterSpacing: "0.22em" }}
            >
              Live now
            </p>
            <p className="font-display mt-3 text-[3.75rem] font-semibold leading-none text-slate-950">
              {isLoading || isFetching ? "..." : data?.count ?? 0}
            </p>
            <p className="mt-2 max-w-[18rem] text-sm leading-6 text-slate-500">
              {searchTerm || tag
                ? "Filtered results update as you refine search or topic."
                : "Ready-to-open quizzes for teachers, trainers, and students."}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="surface-outline rounded-full px-4 py-2 text-sm text-slate-700">
              Active quizzes only
            </div>
            {searchTerm && (
              <div className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                Search: <span className="font-medium">{searchTerm}</span>
              </div>
            )}
            {tag && (
              <div className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                Tag: <span className="font-medium">{tag}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button color="primary" onClick={handleFiltersOpen} variant="contained">
              <span className="inline-flex items-center gap-2">
                <FiFilter size={16} />
                Filters
              </span>
            </Button>
            {(searchTerm || tag) && (
              <Button
                color="secondary"
                onClick={clearFilters}
                variant="outlined"
              >
                <span className="inline-flex items-center gap-2">
                  <FiRefreshCw size={16} />
                  Clear filters
                </span>
              </Button>
            )}
          </div>
        </div>
      </section>

      {isLoading || isFetching ? (
        <Loader halfScreen />
      ) : data?.quizes.length > 0 ? (
        <div className="mt-10 grid gap-8 pb-8 [grid-template-columns:repeat(auto-fit,minmax(min(22rem,100%),1fr))]">
          {data?.quizes.map((quiz: IQuiz) => (
            <QuizCard key={quiz._id} {...quiz} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyResponse
            resource={
              searchTerm || tag
                ? "All Active Filtered Quizes"
                : "All Active Quizes"
            }
          />
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {Array.from(Array(totalPages).keys()).map((_, index) => (
            <Button
              color="primary"
              variant={currentPage - 1 === index ? "contained" : "outlined"}
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
      <ModalSkeleton open={filtersOpen} onClose={handleFiltersClose}>
        <FiltersForm
          modalClose={handleFiltersClose}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setTag={setTag}
          tag={tag}
        />
      </ModalSkeleton>
    </div>
  );
};
