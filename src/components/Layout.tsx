import { useMatch } from "react-router-dom";
import { NavBar } from "./NavBar";

interface Props {}

export const Layout: React.FC<Props> = ({ children }) => {
  const isPlayerPage = useMatch("/quizes/:id");
  const isQuestionsPage = useMatch("/quizes/:id/questions");
  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <NavBar />
      <div
        className={`flex-1 xl:w-full ${
          isPlayerPage || isQuestionsPage ? "" : "lg:max-w-screen-xl mx-4 "
        }xl:mx-auto`}
      >
        {children}
      </div>
    </div>
  );
};
