import { SignUp } from "@clerk/clerk-react";
import { AuthShell } from "../components/AuthShell";

const SignUpPage = () => (
  <AuthShell>
    <SignUp />
  </AuthShell>
);

export default SignUpPage;
