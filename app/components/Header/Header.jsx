import { Contact, House, Logs } from "lucide-react";
import React from "react";
import LoginButton from "./LoginButton";
import AuthContextProvider from "@/lib/context/AuthContext";
import Link from "next/link";

const Header = () => {
  const liStyle = "flex items-center gap-2";
  return (
    <div className=" flex justify-between px-7 py-3 border-b-2 bg-lime-200">
        <Link href='/'>
      <img src="/logo.svg" alt="logo" className="w-16 h-10" />
        </Link>
      <ul className="flex gap-10 items-center font-bold">
        <Link href={'/'}>
        <li className={liStyle}>
          {/* <House /> */}
          Home
        </li>
        </Link>
        <Link href={'/categories'}>
        <li className={liStyle}>
          {/* <Logs /> */}
          Category
        </li>
        </Link>
        <Link href={'/'}>
        <li className={liStyle}>
          {/* <Contact /> */}
          Contact us
        </li>
        </Link>
      </ul>
      <AuthContextProvider>
        <LoginButton />
      </AuthContextProvider>
    </div>
  );
};

export default Header;
