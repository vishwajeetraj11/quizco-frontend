import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { PlayerScreen } from "./pages/PlayerScreen";
import { Quizes } from "./pages/Quizes";

function App() {
  const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;
  const navigate = useNavigate();

  return (
    <ClerkProvider frontendApi={frontendApi} navigate={(to) => navigate(to)}>
      <SignedIn>
        <Routes>
          <Route path="/quizes" element={<Quizes />} />
          <Route path="/quizes/:id" element={<PlayerScreen />} />
          <Route path="/" element={<Navigate replace to="/quizes" />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;
