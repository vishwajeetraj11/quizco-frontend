import { SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div>
      <p>Landing Page</p>
      <Link to="/quiz/kdmdl">Play</Link>
      <SignInButton />
    </div>
  );
};
