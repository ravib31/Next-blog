"use client";
import { useAuth } from "@/lib/context/AuthContext";
import React from "react";

const LoginButton = () => {
  const { user, isLoading, error, handleLogin, handleLogout } = useAuth();
  const buttonStyle = "bg-black text-white px-4 py-2 rounded-full flex items-center gap-3"
  console.log(user)
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(user){
    return (
      <button
        onClick={() => {handleLogout()}}
        className={buttonStyle}
      >
        <img src={user?.photoURL} alt="google" className=" h-6 rounded-full" />
        Logout
      </button>
    );
  }
  return (
    <button
      onClick={() => {handleLogin()}}
      className={buttonStyle}
    >
      <img src="/google.png" alt="google" className=" h-6" />
      Login
    </button>
  );
};

export default LoginButton;
