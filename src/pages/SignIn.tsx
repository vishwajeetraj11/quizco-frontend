import { SignIn } from "@clerk/clerk-react";
import { AuthShell } from "../components/AuthShell";

export const SignInPage = () => (
  <AuthShell>
    <SignIn />
  </AuthShell>
);
