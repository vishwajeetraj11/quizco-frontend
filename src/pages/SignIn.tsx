import { SignIn } from "@clerk/clerk-react";

export const SignInPage = () => (
  <>
    <SignIn path="/sign-in" routing="path" />
  </>
);
