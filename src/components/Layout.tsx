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
    <div className="page-shell flex min-h-screen flex-1 flex-col">
      <NavBar />
      <main className="relative flex-1">
        {isFullWidthPage ? (
          children
        ) : (
          <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
