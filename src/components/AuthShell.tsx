interface Props {
  children: React.ReactNode;
}

export const AuthShell: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative min-h-[calc(100vh-84px)] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/70">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl" />
      </div>
      <div className="relative flex min-h-[calc(100vh-84px)] w-full items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};
