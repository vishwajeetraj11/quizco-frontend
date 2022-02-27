import React from "react";
import Logo from "../assets/logos/White-Black-Circle.png";

export const Footer = () => (
  <footer className="bg-white shadow-large py-3 flex items-center justify-center">
    <img src={Logo} className="h-10 w-10 object-cover" alt="landing" />
    <p className="text-center">&copy; Quizco 2022</p>
  </footer>
);
