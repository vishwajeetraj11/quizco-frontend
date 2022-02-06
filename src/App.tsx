import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AddQuestions } from "./pages/AddQuestions";
import { CreateQuiz } from "./pages/CreateQuiz";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { PlayerScreen } from "./pages/PlayerScreen";
import { Quizes } from "./pages/Quizes";
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
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </SignedOut>
      </Layout>
    </ClerkProvider>
  );
}

export default App;
