import { modalStyle } from "../shared/constants";

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const ModalSkeleton: React.FC<Props> = ({ open, onClose, children }) => {
  if (!open) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/40 px-4 py-6"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="w-full overflow-auto rounded-md bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        style={{ ...modalStyle, minWidth: 250, padding: 0 }}
      >
        {children}
      </div>
    </div>
  );
};
