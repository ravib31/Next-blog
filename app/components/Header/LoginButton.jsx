"use client";
import { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";
import React from "react";

const LoginButton = () => {
  const { user, isLoading, error, handleLogin, handleLogout } = useAuth();
  const buttonStyle = "bg-black text-white px-4 py-2 rounded-full flex items-center gap-3"
//   console.log(user)
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(user){
    return (
        <div className='flex ap-4 items-center'>
      <button
        onClick={() => {handleLogout()}}
        className={buttonStyle}
      >
        {/* <img src={user?.photoURL} alt="userImage" className=" h-6 rounded-full border-2" /> */}
        Logout
      </button>
      <Link href='/admin'>
       <div className='px-3 py-2'>
       <img src={user?.photoURL} alt="userImage" className=" h-10 rounded-full border-2" />
       </div>
      </Link>
      </div>
    );
  }
  return (
    <section>
    <button
      onClick={() => {handleLogin()}}
      className={buttonStyle}
    >
      <img src="/google.png" alt="google" className=" h-6" />
      Login
    </button>
    </section>
  );
};

export default LoginButton;
