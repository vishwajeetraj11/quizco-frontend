import { useMatch } from "react-router-dom";
import { NavBar } from "./NavBar";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const isPlayerPage = useMatch("/quizes/:id");
  const isQuestionsPage = useMatch("/quizes/:id/questions");
  const isLandingPage = useMatch("/");
  const isSignInPage = useMatch("/sign-in");
  const isSignUpPage = useMatch("/sign-up");
  const isFullWidthPage = !!(
    isPlayerPage ||
    isQuestionsPage ||
    isLandingPage ||
    isSignInPage ||
    isSignUpPage
  );

  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <NavBar />
      <div
        className={`flex-1 xl:w-full ${isFullWidthPage ? "" : "lg:max-w-screen-xl mx-4 "}xl:mx-auto`}
      >
        {children}
      </div>
    </div>
  );
};
