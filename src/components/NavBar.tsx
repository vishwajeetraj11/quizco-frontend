import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

interface Props {}

export const NavBar: React.FC<Props> = () => {
  return (
    <div className="px-4 sm:px-10 py-4 flex items-center h-[8%]">
      <Link to="/" className="font-semibold text-gray-888 text-xs sm:text-xl">
        Quizco
      </Link>
      <div className="ml-auto flex items-center">
        <SignedOut>
          <Link to="/sign-up" className="mr-4">
            <p className="cursor-pointer rounded-full px-3 py-2 bg-indigo-600 text-white font-normal">
              Sign Up
            </p>
          </Link>
          <Link to="/sign-in">
            <p className="text-indigo-600 cursor-pointer rounded-full px-2.5 py-1.5 border-indigo-600 border-2 text-primary font-normal">
              Sign In
            </p>
          </Link>
        </SignedOut>

        <SignedIn>
          <Link to="/quizes" className="">
            <p className="text-default text-xs sm:text-sm cursor-pointer px-4">
              Quizes
            </p>
          </Link>
          <Link to="/dashboard">
            <p className="text-default text-xs sm:text-sm cursor-pointer px-4">
              Dashboard
            </p>
          </Link>
          <UserButton afterSignOutAllUrl="/" afterSignOutOneUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
};
