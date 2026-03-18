import { modalStyle } from "../shared/constants";
import { Button } from "../ui";

interface IDeleteModal {
  deleteModalActive: boolean;
  handleDeleteModalClose: () => void;
  deleteLoading: boolean;
  onDelete: () => void;
  resource: string;
  confirmMessage?: string;
  informMessage?: string;
  modalTitle?: string;
}

export const DeleteModal = ({
  deleteModalActive,
  handleDeleteModalClose,
  deleteLoading,
  onDelete,
  resource,
  confirmMessage = "Are you sure?",
  informMessage = `You want to delete this ${resource || "resource"}.`,
  modalTitle = `Delete ${resource || "Resource"}`,
}: IDeleteModal) =>
  deleteModalActive ? (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/40 px-4 py-6"
      onClick={handleDeleteModalClose}
      role="dialog"
    >
      <div
        className="w-full overflow-auto rounded-md bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        style={{ ...modalStyle, minWidth: 250 }}
      >
        <h4 className="text-gray-555 text-center font-semibold text-2xl">
          {modalTitle}
        </h4>
        <div className="my-4 mb-5">
          <p className="text-gray-555 text-md font-medium">{confirmMessage}</p>
          <p className="text-gray-555 text-md fomt-medium">{informMessage}</p>
        </div>
        <div className="flex flex-1 w-full mt-4">
          <div className="flex ml-auto">
            <Button onClick={handleDeleteModalClose} disabled={deleteLoading}>
              Cancel
            </Button>
            <div className="ml-4">
              <Button
                variant="contained"
                color="secondary"
                disabled={deleteLoading}
                onClick={onDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
