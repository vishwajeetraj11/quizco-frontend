import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { FiArrowRight, FiCompass, FiGrid } from "react-icons/fi";
import { NavLink, useMatch } from "react-router-dom";
import Logo from "../assets/logos/White-Purple-Circle.png";

interface Props {}

export const NavBar: React.FC<Props> = () => {
  const isSignInPage = useMatch("/sign-in");
  const isSignUpPage = useMatch("/sign-up");
  const isAuthPage = !!(isSignInPage || isSignUpPage);

  const navItemClassName = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-all ${
      isActive
        ? "bg-slate-900 text-white shadow-lg"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 px-4 py-3 sm:px-6 lg:px-8">
      <div className="app-panel mx-auto flex w-full max-w-7xl items-center gap-3 px-3 py-2.5 sm:px-5">
        <NavLink
          to="/"
          className="flex min-w-0 items-center gap-3 text-slate-900"
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm sm:h-11 sm:w-11">
            <img
              src={Logo}
              alt="Quizco Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p
              className="text-[10px] font-medium uppercase text-slate-500 sm:text-[11px]"
              style={{ letterSpacing: "0.18em" }}
            >
              Quiz Builder
            </p>
            <p className="truncate text-2xl font-semibold leading-none sm:text-[2rem]">
              Quizco
            </p>
          </div>
        </NavLink>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <SignedOut>
            {isAuthPage ? (
              <NavLink
                to="/"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Back home
              </NavLink>
            ) : (
              <>
                <p className="hidden text-sm text-slate-500 lg:block">
                  Build polished quizzes, ship them fast, and track results.
                </p>
                <NavLink
                  to="/sign-in"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/sign-up"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-0.5 hover:bg-teal-700"
                >
                  Start Building
                  <FiArrowRight size={16} />
                </NavLink>
              </>
            )}
          </SignedOut>

          <SignedIn>
            <nav className="hidden items-center gap-2 md:flex">
              <NavLink to="/quizes" className={navItemClassName}>
                <span className="inline-flex items-center gap-2">
                  <FiCompass size={15} />
                  Quizes
                </span>
              </NavLink>
              <NavLink to="/dashboard" className={navItemClassName}>
                <span className="inline-flex items-center gap-2">
                  <FiGrid size={15} />
                  Dashboard
                </span>
              </NavLink>
            </nav>
            <div className="ml-1 rounded-full border border-white/70 bg-white/80 p-1 shadow-sm">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};
