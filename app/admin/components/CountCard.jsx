"use client";
import useCollectionCount from "@/lib/firebase/count";
import React from "react";

const CountCard = ({ path, name, icon }) => {
  const { data, isLoading, error } = useCollectionCount({ path: path });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="bg-lime-200 hover:bg-lime-400 flex gap-8 items-center rounded px-6 py-2">
      {icon}
      <div >
        <h1 className='font-bold'>{name}</h1>
        <h1 className='text-xl font-bold'>{data}</h1>
      </div>
    </div>
  );
};

export default CountCard;
