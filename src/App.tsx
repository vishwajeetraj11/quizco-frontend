import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AddQuestions } from "./pages/AddQuestions";
import { Attempts } from "./pages/Attempts";
import { CreateQuiz } from "./pages/CreateQuiz";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { PlayerScreen } from "./pages/PlayerScreen";
import { Quizes } from "./pages/Quizes";
import { QuizResponse } from "./pages/QuizResponse";
import { SignInPage } from "./pages/SignIn";
import SignUpPage from "./pages/Signup";
import { StatisticsAllQuestions } from "./pages/stats/StatisticsAllQuestions";
import { StatisticsByQuiz } from "./pages/stats/StatisticsByQuiz";
import { StatisticsByQuizQuestionsId } from "./pages/stats/StatisticsByQuizQuestionsId";
import { UpdateQuestion } from "./pages/UpdateQuestion";
import { UpdateQuiz } from "./pages/UpdateQuiz";

function App() {
  const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;
  const navigate = useNavigate();

  return (
    <ClerkProvider frontendApi={frontendApi} navigate={(to) => navigate(to)}>
      <Layout>
        <SignedIn>
          <Routes>
            <Route path="/quizes" element={<Quizes />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/attempts" element={<Attempts />} />
            <Route
              path="/dashboard/attempts/:attemptId"
              element={<QuizResponse />}
            />
            <Route
              path="/statistics/quiz/:quizId"
              element={<StatisticsByQuiz />}
            />
            <Route
              path="/statistics/:quizId/questions/:questionId"
              element={<StatisticsByQuizQuestionsId />}
            />
            <Route
              path="/statistics/:quizId/questions"
              element={<StatisticsAllQuestions />}
            />
            <Route path="/quizes/add" element={<CreateQuiz />} />
            <Route path="/quizes/:id" element={<PlayerScreen />} />
            <Route path="/quizes/:id/update" element={<UpdateQuiz />} />
            <Route path="/quizes/:id/questions" element={<AddQuestions />} />
            <Route
              path="/quizes/:quizId/questions/:questionId"
              element={<UpdateQuestion />}
            />
            <Route path="/" element={<Navigate replace to="/quizes" />} />
          </Routes>
        </SignedIn>
        <SignedOut>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
          {/* <RedirectToSignIn /> */}
        </SignedOut>
      </Layout>
    </ClerkProvider>
  );
}

export default App;
