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
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="w-full overflow-auto rounded-[28px] border border-white/70 bg-white/95 shadow-[0_28px_80px_rgba(15,23,42,0.16)]"
        onClick={(event) => event.stopPropagation()}
        style={{ ...modalStyle, minWidth: 250, padding: 0, maxHeight: "calc(100vh - 3rem)" }}
      >
        {children}
      </div>
    </div>
  );
};
