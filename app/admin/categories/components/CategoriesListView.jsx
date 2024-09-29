"use client";
import UseCategories from "@/lib/firebase/category/read";
import Link from "next/link";
import React from "react";

const CategoriesListView = () => {
  const { data, error, isLoading } = UseCategories();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <h1>Data Not Found !!!</h1>;
  }
  return (
    <div>
      <table className="w-full rounded-2xl">
        <thead>
          <tr className="bg-lime-200">
            <th className="border px-4 py-2">Sr.</th>
            <th className="border px-4 py-2">Icon</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr className="text-center items-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <img className="h-10 w-10 rounded-full" src={item.iconURL} />
                </td>
                <td className="border px-4 py-2">{item?.name}</td>
                <td className="border px-4 py-2">{item?.cat}</td>
                <td className="border px-4 py-2">
                  <Link href={`/admin/categories/form?id=${item?.id}`}>
                    <button className="bg-green-800 px-3 py-1 text-sm rounded-full text-white">
                      Action
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesListView;
