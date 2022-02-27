import { Backdrop, Box, Button, Fade, Modal } from "@material-ui/core";
import { modalStyle } from "../shared/constants";

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
}: IDeleteModal) => (
  <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={deleteModalActive}
    onClose={handleDeleteModalClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 200,
    }}
  >
    <Fade in={deleteModalActive}>
      <Box sx={{ ...modalStyle, minWidth: 250 }}>
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
      </Box>
    </Fade>
  </Modal>
);
