import { FiBarChart2, FiLayers, FiZap } from "react-icons/fi";
import Logo from "../assets/logos/White-Purple-Circle.png";

interface Props {
  children: React.ReactNode;
}

export const AuthShell: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative min-h-[calc(100vh-96px)] overflow-hidden px-4 pb-10 pt-3 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute bottom-4 right-0 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
      </div>
      <div className="relative mx-auto grid min-h-[calc(100vh-120px)] w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white/60 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden flex-col justify-between bg-slate-900 px-10 py-12 text-white lg:flex">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white/10">
                <img src={Logo} alt="Quizco Logo" className="h-full w-full" />
              </div>
              <div>
                <p
                  className="text-xs uppercase text-white/60"
                  style={{ letterSpacing: "0.24em" }}
                >
                  Welcome to
                </p>
                <h1 className="text-3xl font-semibold">Quizco</h1>
              </div>
            </div>
            <h2 className="mt-10 text-4xl font-semibold leading-tight">
              Build standout quizzes and keep your whole workflow in one place.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-300">
              Create assessments faster, track how each quiz performs, and keep
              every revision round organized.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                icon: <FiZap size={20} />,
                title: "Fast setup",
                description:
                  "Launch a polished quiz space in minutes instead of stitching tools together.",
              },
              {
                icon: <FiLayers size={20} />,
                title: "One workspace",
                description:
                  "Manage quizzes, questions, attempts, and updates without leaving the app.",
              },
              {
                icon: <FiBarChart2 size={20} />,
                title: "Built-in insights",
                description:
                  "See which quizzes are being played and where learners need more support.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-teal-300">
                  {item.icon}
                </div>
                <p className="text-lg font-medium">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-8 sm:px-8 lg:px-10">
          <div className="w-full max-w-md rounded-[28px] border border-slate-200/70 bg-white/95 p-3 shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
