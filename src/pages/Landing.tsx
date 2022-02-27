import { useNavigate } from "react-router-dom";
import Active from "../assets/illustations/Active.png";
import AddQuestions from "../assets/illustations/Add Questions.png";
import Create from "../assets/illustations/Create.png";
import EcoFriendly from "../assets/illustations/ecofriendly.png";
import LandingIllustration from "../assets/illustations/landing.png";
import Stats from "../assets/illustations/Stats.png";
import Logo from "../assets/logos/White-Purple-Circle.png";
import { Footer } from "../components/Footer";
import { useStats } from "../shared/queries";

export const Landing = () => {
  const navigate = useNavigate();
  const { data, isError } = useStats();

  return (
    <div className="">
      <div className="landing">
        <div
          style={{ height: "90vh" }}
          className="flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-5 md:mx-auto"
        >
          <div className="w-12/12 md:w-6/12 flex items-center justify-center">
            <div className="h-72 md:h-96 w-72 md:w-96">
              <img
                src={LandingIllustration}
                className="h-full w-full object-cover"
                alt="landing"
              />
            </div>
          </div>
          <div className="w-12/12 md:w-6/12">
            <div className="flex items-center">
              <img
                src={Logo}
                className="h-20 w-20 object-cover"
                alt="landing"
              />
              <h1 className="text-2xl font-thin text-slate-800">Quizco</h1>
            </div>
            <h2 className="text-4xl font-medium mt-2 text-slate-600">
              Quiz Builder and Assessment Tool
            </h2>
            <p className="w-10/12 mt-4 text-slate-600 font-medium text-2xl">
              Using Quizco, it’s super fast and easy to create a quiz - perfect
              for revision guides, driving theory practice and trivia.
            </p>
            <div>
              <button
                onClick={() => navigate("/sign-up")}
                className="px-6 py-4 bg-indigo-600 text-white rounded-md mt-4"
              >
                Start Building
              </button>
            </div>
          </div>
        </div>
      </div>
      {!isError && (
        <div
          style={{
            gridTemplateColumns: "repeat(3,1fr)",
          }}
          className="mx-auto mb-10 mt-10 md:mt-0 items-center justify-items-center grid max-w-screen-xl"
        >
          <div>
            <h2 className="text-4xl md:text-7xl text-center text-slate-600 font-thin">
              {data?.users}+
            </h2>
            <p className="text-center text-lg md:text-xl font-medium">Users</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-7xl text-center text-slate-600">
              {data?.quizes}+
            </h2>

            <p className="text-center text-lg md:text-xl font-medium">
              Quizes Created
            </p>
          </div>
          <div>
            <h2 className="text-4xl md:text-7xl text-center text-slate-600">
              {data?.timesQuizesPlayed}+
            </h2>

            <p className="text-center text-lg md:text-xl font-medium">
              Times Quizes Played
            </p>
          </div>
        </div>
      )}

      <div className="my-20 max-w-screen-xl mx-5 md:mx-auto">
        <h2 className="text-center text-2xl md:text-4xl font-medium text-slate-600">
          Everything You Need to Build and Manage Your Quiz
        </h2>
        <div style={{ gap: 20 }} className="grid mt-10 grid-use-app">
          {AppUseData.map((useData) => (
            <div
              className="flex flex-col px-4 py-7 items-center justify-center shadow-large rounded-md"
              key={useData.id}
            >
              <div className="w-16 h-16">
                <img
                  src={useData.imgsrc}
                  className="w-full h-full object-cover"
                  alt="Create a Quiz Illustration"
                />
              </div>
              <p className="ml-4 mt-3 text-md w-50 text-center">
                {useData.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-20 max-w-screen-xl mx-5 md:mx-auto flex flex-wrap md:flex-nowrap items-center justify-between">
        <div className="w-40 h-40 w-2/12">
          <img
            src={EcoFriendly}
            className="w-full h-full object-contain"
            alt=""
          />
        </div>
        <p className="w-full md:w-10/12 ml-0 md:ml-4 text-2xl">
          Save resources and money by avoiding print-out quiz sheets and test
          papers. Users can complete your paperless quiz via Quizco.
        </p>
      </div>

      <Footer />
    </div>
  );
};

/*
Make your own quiz and test yourself
*/

const AppUseData = [
  {
    id: "1",
    imgsrc: Create,
    label: "Create a Quiz",
  },
  {
    id: "2",
    imgsrc: AddQuestions,
    label: "Add Questions to your Quiz",
  },
  {
    id: "3",
    imgsrc: Active,
    label: "Set status of Quiz to Active",
  },
  {
    id: "4",
    imgsrc: Stats,
    label: "Checkout Statistics",
  },
];
