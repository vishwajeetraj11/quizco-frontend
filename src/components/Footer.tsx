import React from "react";
import Logo from "../assets/logos/White-Black-Circle.png";

export const Footer = () => (
  <footer className="border-t border-white/60 bg-white/70 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
          <img src={Logo} className="h-full w-full object-cover" alt="Quizco" />
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-900">Quizco</p>
          <p className="text-sm text-slate-500">
            Create, deliver, and review quizzes in one polished workflow.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1.5">
          Fast authoring
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5">
          Live quiz delivery
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5">
          Clear statistics
        </span>
      </div>
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Quizco
      </p>
    </div>
  </footer>
);
