import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import PostListView from "./components/PostListView";

const Page = () => {
  return (
    <div className="p-6 w-full flex flex-col gap-6">
      <div className="justify-between flex items-center">
        <h1 className='font-bold'>Posts</h1>
        <Link href={'/admin/posts/form'}>
          <button className=" flex gap-1 items-center px-4 py-2 bg-lime-200 text-black rounded-full font-bold">
            <Plus />
            Add
          </button>
        </Link>
      </div>
      <PostListView/>
    </div>

  );
};

export default Page;
