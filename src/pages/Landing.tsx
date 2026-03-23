import {
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiLayers,
  FiZap,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Active from "../assets/illustations/Active.png";
import AddQuestions from "../assets/illustations/Add Questions.png";
import Create from "../assets/illustations/Create.png";
import EcoFriendly from "../assets/illustations/ecofriendly.png";
import Stats from "../assets/illustations/Stats.png";
import { Footer } from "../components/Footer";
import { useStats } from "../shared/queries";
import { Button } from "../ui";

const formatNumber = (value?: number) =>
  new Intl.NumberFormat("en-US").format(Number(value || 0));

export const Landing = () => {
  const navigate = useNavigate();
  const { data, isError } = useStats();

  return (
    <div className="overflow-hidden pb-10">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-2 sm:px-6 lg:px-8">
        <div className="app-panel relative overflow-hidden px-6 py-8 sm:px-10 sm:py-12 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-teal-200/35 blur-3xl" />
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-amber-200/35 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-sky-200/30 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-center">
            <span className="section-chip">Smarter quiz building</span>
            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Make assessments that feel polished from the first click.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Quizco helps you create quizzes faster, keep everything
              paperless, and review results with the context you need to keep
              improving.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="min-w-[180px]"
                color="primary"
                onClick={() => navigate("/sign-up")}
                variant="contained"
              >
                Start Building
              </Button>
              <Button
                className="min-w-[160px]"
                color="primary"
                onClick={() => navigate("/sign-in")}
                variant="outlined"
              >
                Sign In
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroHighlights.map((item) => (
                <div
                  key={item}
                  className="surface-outline rounded-full px-4 py-2 text-sm text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {heroBenefits.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-white/70 bg-white/72 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    {item.icon}
                  </div>
                  <p className="mt-4 text-base font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-12 lg:mt-0">
            <div className="animate-float absolute -left-2 top-6 z-20 rounded-[24px] border border-white/80 bg-white/90 px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)] sm:-left-6">
              <p className="text-sm font-medium text-slate-900">
                Publish in minutes
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Draft, activate, and update quizzes without friction.
              </p>
            </div>
            <div
              className="animate-float absolute bottom-8 right-0 z-20 rounded-[24px] border border-white/80 bg-slate-900 px-4 py-3 text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] sm:right-4"
              style={{ animationDelay: "1.4s" }}
            >
              <p className="text-sm font-medium">Track what learners miss</p>
              <p className="mt-1 text-xs text-slate-300">
                Jump from attempts to quiz statistics in one flow.
              </p>
            </div>
            <div className="app-panel-soft relative overflow-hidden p-4 sm:p-6">
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-teal-500/12 via-sky-500/8 to-amber-400/14" />
              <div className="relative rounded-[28px] bg-gradient-to-br from-slate-50 via-white to-teal-50/40 p-4 sm:p-5">
                {/* Faux app chrome */}
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-3 text-[11px] font-medium text-slate-400">
                      quizco.vishwajeet.co/quizes
                    </span>
                  </div>

                  {/* Mock quiz cards */}
                  <div className="space-y-3 p-4">
                    {/* Quiz card 1 */}
                    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-sm font-bold text-white">
                        Q1
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          JavaScript Fundamentals
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          12 questions &middot; 24 attempts
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                        Active
                      </span>
                    </div>

                    {/* Quiz card 2 */}
                    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-sm font-bold text-white">
                        Q2
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          React Component Patterns
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          8 questions &middot; 17 attempts
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                        Active
                      </span>
                    </div>

                    {/* Quiz card 3 */}
                    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-sm font-bold text-white">
                        Q3
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          CSS Grid &amp; Flexbox
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          10 questions &middot; 9 attempts
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                        Draft
                      </span>
                    </div>

                    {/* Mini stats bar */}
                    <div className="mt-1 flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3">
                      <FiBarChart2 className="text-teal-400" size={16} />
                      <div className="flex flex-1 gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Avg score
                          </p>
                          <p className="text-sm font-bold text-white">78%</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Completion
                          </p>
                          <p className="text-sm font-bold text-white">92%</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            This week
                          </p>
                          <p className="text-sm font-bold text-emerald-400">
                            +14
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        {isError ? (
          <div className="app-panel-soft px-6 py-7 text-center">
            <p className="text-sm font-medium text-red-600">
              Could not load platform statistics. Please try again later.
            </p>
          </div>
        ) : data ? (
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                label: "Creators using Quizco",
                value: data?.users,
                description:
                  "Teams and individuals building quizzes without messy handoffs.",
              },
              {
                label: "Quizes created",
                value: data?.quizes,
                description:
                  "Assessment libraries growing across revision, theory, and trivia use cases.",
              },
              {
                label: "Play sessions recorded",
                value: data?.timesQuizesPlayed,
                description:
                  "Attempts tracked so you can understand performance over time.",
              },
            ].map((item) => (
              <div key={item.label} className="app-panel-soft px-6 py-7">
                <p
                  className="text-sm uppercase text-slate-500"
                  style={{ letterSpacing: "0.18em" }}
                >
                  {item.label}
                </p>
                <p className="mt-4 text-4xl font-black text-slate-900 sm:text-5xl">
                  {formatNumber(item.value)}+
                </p>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="section-chip">How it works</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Everything you need to launch and manage a quiz
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              The workflow is simple: create a quiz, add strong questions,
              activate it when you are ready, and keep an eye on results.
            </p>
          </div>
          <div className="rounded-full bg-white/80 px-5 py-3 text-sm font-medium text-slate-600 shadow-sm">
            Four simple steps to go from idea to live assessment
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {AppUseData.map((useData, index) => (
            <div
              className="app-panel-soft flex h-full flex-col px-6 py-7 transition-transform duration-300 hover:-translate-y-1"
              key={useData.id}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-teal-700">
                  Step {index + 1}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {index + 1}
                </span>
              </div>
              <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-[22px] bg-slate-50">
                <img
                  src={useData.imgsrc}
                  className="h-full w-full object-contain"
                  alt={useData.label}
                />
              </div>
              <p className="mt-5 text-xl font-semibold text-slate-900">
                {useData.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {useData.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="app-panel-soft px-6 py-8 sm:px-8">
            <span className="section-chip">Why teams choose Quizco</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900">
              Cleaner workflow, stronger delivery, and better follow-up
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Whether you are making quick revision checks or a bigger assessment
              bank, Quizco keeps the creation, delivery, and review loop tidy.
            </p>

            <div className="mt-8 grid gap-4">
              {reasonsToChoose.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-slate-200/80 bg-white p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="app-panel-soft relative overflow-hidden px-6 py-8 sm:px-8">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-teal-100/60 blur-3xl" />
            <span className="section-chip">Paperless by design</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900">
              Save printing time and keep every response in one place
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Skip the stack of printed quiz sheets. Learners can complete their
              quiz digitally while you stay focused on the results that matter.
            </p>

            <div className="mt-8 rounded-[28px] bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-4">
              <img
                src={EcoFriendly}
                className="mx-auto h-56 w-full object-contain"
                alt="Eco friendly illustration"
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "No print-run overhead",
                "Faster quiz distribution",
                "Responses stay organized",
                "Easy to revisit performance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
                >
                  <FiCheckCircle className="text-teal-600" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="app-panel overflow-hidden px-6 py-8 sm:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="section-chip">Ready to build</span>
              <h2 className="mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Set up your next quiz space with a cleaner, more modern workflow
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Start creating right away or jump back in to manage the quizzes
                you already have.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                className="min-w-[180px]"
                onClick={() => navigate("/sign-up")}
                variant="contained"
              >
                Create an account
              </Button>
              <Button
                className="min-w-[180px]"
                onClick={() => navigate("/sign-in")}
                variant="outlined"
              >
                Continue to sign in
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const heroHighlights = [
  "Quiz creation without the busywork",
  "Built-in analytics for every attempt",
  "A clean paperless assessment flow",
];

const heroBenefits = [
  {
    title: "Fast authoring",
    description: "Spin up a new quiz, add questions, and get it live quickly.",
    icon: <FiZap size={20} />,
  },
  {
    title: "Structured management",
    description: "Keep updates, question edits, and quiz status changes in sync.",
    icon: <FiLayers size={20} />,
  },
  {
    title: "Useful statistics",
    description: "Review attempts and see how learners are performing over time.",
    icon: <FiBarChart2 size={20} />,
  },
];

const AppUseData = [
  {
    id: "1",
    imgsrc: Create,
    label: "Create a quiz",
    description:
      "Start with a title, a clear description, and the tags that make discovery easier later.",
  },
  {
    id: "2",
    imgsrc: AddQuestions,
    label: "Add strong questions",
    description:
      "Build out your question set so each quiz feels complete before you share it.",
  },
  {
    id: "3",
    imgsrc: Active,
    label: "Switch it live",
    description:
      "Move from draft to active when the quiz is ready for learners to start playing.",
  },
  {
    id: "4",
    imgsrc: Stats,
    label: "Review the statistics",
    description:
      "Keep an eye on attempts, question outcomes, and the spots that need attention.",
  },
];

const reasonsToChoose = [
  {
    title: "One place for the whole quiz lifecycle",
    description:
      "You are not bouncing between authoring tools, spreadsheets, and separate reporting views.",
    icon: <FiLayers size={20} />,
  },
  {
    title: "A friendlier experience for learners",
    description:
      "Quizzes feel clearer to take, which helps people focus on the questions instead of the interface.",
    icon: <FiArrowRight size={20} />,
  },
  {
    title: "Better follow-up after every round",
    description:
      "Use results to spot trends, improve question quality, and make the next version even stronger.",
    icon: <FiBarChart2 size={20} />,
  },
];
