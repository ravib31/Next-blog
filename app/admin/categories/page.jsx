import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="p-6 w-full">
      <div className="justify-between flex items-center">
        <h1>Categories Page</h1>
        <Link href={'/admin/categories/form'}>
          <button className=" flex gap-1 items-center px-4 py-2 bg-lime-200 text-black rounded-full font-bold">
            <Plus />
            Add
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
