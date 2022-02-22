import { Backdrop, Box, Fade, Modal } from "@material-ui/core";
import { modalStyle } from "../shared/constants";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ModalSkeleton: React.FC<Props> = ({ open, onClose, children }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={{ ...modalStyle, minWidth: 200, padding: 0 }}>
          <h3 className="text-2xl font-semibold text-center">{children}</h3>
        </Box>
      </Fade>
    </Modal>
  );
};
