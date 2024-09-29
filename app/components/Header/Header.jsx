import { Contact, House, Logs } from "lucide-react";
import React from "react";
import LoginButton from "./LoginButton";
import AuthContextProvider from "@/lib/context/AuthContext";

const Header = () => {
  const liStyle = "flex items-center gap-2";
  return (
    <div className=" flex justify-between px-7 py-3 border-b-2 bg-lime-100">
      <img src="/logo.svg" alt="logo" className="w-16 h-10" />
      <ul className="flex gap-6 items-center">
        <li className={liStyle}>
          <House />
          Home
        </li>
        <li className={liStyle}>
          <Logs />
          Blogs
        </li>
        <li className={liStyle}>
          <Contact />
          Contact us
        </li>
      </ul>
      <AuthContextProvider>
        <LoginButton />
      </AuthContextProvider>
    </div>
  );
};

export default Header;
