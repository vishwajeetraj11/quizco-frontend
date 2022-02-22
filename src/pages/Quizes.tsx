import { IconButton } from "@material-ui/core";
import { useState } from "react";
import { FcClearFilters } from "react-icons/fc";
import { RiFilterFill } from "react-icons/ri";
import { EmptyResponse } from "../components/EmptyResponse";
import { FiltersForm } from "../components/forms/FiltersForm";
import { ModalSkeleton } from "../components/Modal";
import { QuizCard } from "../components/QuizCard";
import { Loader } from "../components/Svgs";
import { globalColors } from "../shared/constants";
import { IQuiz } from "../shared/interfaces";
import { useQuizes } from "../shared/queries";
import { endpoints } from "../shared/urls";

export const Quizes = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tag, setTag] = useState<string>("");

  const { data, isLoading, isFetching } = useQuizes(
    `${endpoints.quizes}?search=${encodeURIComponent(
      searchTerm
    )}&tag=${encodeURIComponent(tag)}`,
    ["Quizes", searchTerm, tag]
  );

  const [filtersOpen, setFiltersOpen] = useState(false);
  const handleFiltersOpen = () => setFiltersOpen(true);
  const handleFiltersClose = () => setFiltersOpen(false);

  const clearFilters = () => {
    setSearchTerm("");
    setTag("");
  };

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="text-2xl font-semibold text-center my-3">All Quizes</h3>
        <div className="flex items-center justify-center ml-3">
          <IconButton onClick={handleFiltersOpen} aria-label="Filters">
            <RiFilterFill fill={globalColors.brand} size={25} />
          </IconButton>
          {(searchTerm || tag) && (
            <IconButton onClick={clearFilters} aria-label="Filters">
              <FcClearFilters size={25} fill={globalColors.red} />
            </IconButton>
          )}
        </div>
      </div>

      {isLoading || isFetching ? (
        <Loader halfScreen />
      ) : data?.quizes.length > 0 ? (
        <div className="grid gap-7 mt-10 grid-flow-row grid-quizes pb-8">
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
