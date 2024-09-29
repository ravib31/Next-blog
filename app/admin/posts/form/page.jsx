"use client";
import React, { useEffect } from "react";

import { useSearchParams } from "next/navigation";
import { usePostForm } from "./context/PostFormContext";
import UseCategories from "@/lib/firebase/category/read";
import UseAuthors from "@/lib/firebase/author/read";
import { RTEField } from "./components/RTEField";

const page = () => {
  const searchParams = useSearchParams();
  const updatePostId = searchParams.get("id");

  const {
    data,
    isLoading,
    image,
    setImage,
    error,
    handleCreate,
    handleSubmit,
    handleUpdate,
    handleDelete,
    isSuccess,
    fetchData,
  } = usePostForm();

  useEffect(() => {
    if (updatePostId) {
      fetchData(updatePostId);
    }
  }, [updatePostId]);
  //   console.log(updatePostId);
  return (
    <div className="w-full p-6 flex flex-col gap-3">
      <div className="flex gap-5 items-center">
        {updatePostId ? (
          <h1 className="font-bold text-green-500">Update Post</h1>
        ) : (
          <h1 className="font-bold">Add Post</h1>
        )}
      </div>
      <div className="flex">
        <form
          className="flex flex-col gap-2 bg-lime-100 p-7 rounded-xl "
          onSubmit={(e) => {
            e.preventDefault();
            if (updatePostId) {
              handleUpdate();
            } else {
              handleCreate();
            }
          }}
        >
          <input
            type="text"
            onChange={(e) => {
              handleSubmit("title", e.target.value);
            }}
            value={data?.title}
            required
            placeholder="Enter Title *"
            className="w-full p-2  border rounded-lg"
          />
          <br />

          <input
            onChange={(e) => {
              handleSubmit("cat", e.target.value);
            }}
            value={data?.cat}
            required
            disabled={updatePostId}
            cols="5"
            rows="3"
            placeholder="Post *"
            className="w-full p-2  border rounded-lg"
          />
          <br />
          <SelectCategoryField />
          <SelectAuthorField/>
          <label className="text-sm  text-gray-500">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              e.preventDefault();
              setImage(e.target.files[0]);
            }}
            placeholder="Image"
            className="w-full p-2  border rounded-lg"
          />
          <br />
          {data?.imageURL && (
            <img
              src={data?.imageURL}
              alt="image"
              className="w-[100px] h-[100px] object-cover rounded-2xl"
            />
          )}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="image"
              className="w-[100px] h-[100px] object-cover rounded-2xl"
            />
          )}
          {!isSuccess && (
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="px-4 py-2 bg-lime-200 hover:bg-lime-400 rounded-full font-bold "
            >
              {isLoading ? "Loading..." : updatePostId ? "Update" : "Create"}
            </button>
          )}
          {updatePostId && !isSuccess && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(updatePostId);
              }}
              disabled={isLoading || isSuccess}
              className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded-full font-bold "
            >
              {isLoading ? "Loading..." : "Delete"}
            </button>
          )}
          {isSuccess && (
            <p className="text-green-500 text-center font-bold">
              Post {updatePostId ? "Updated" : "Created"} successfully !!!
            </p>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <RTEField/>
      </div>
    </div>
  );
};

function SelectCategoryField() {
  const { data, handleSubmit } = usePostForm();
  const { data: categories } = UseCategories();
  return (
    <div>
      <label className="text-sm  text-gray-500">
        Category<span className="text-red-600">*</span>
      </label>
      <select
        className="w-full p-2  border rounded-lg"
        name="category"
        id="category"
        required
        value={data?.categoryId}
        onChange={(e) => {
          handleSubmit("categoryId", e.target.value);
        }}
      >
        <option value="">Select Category</option>
        {categories &&
          categories?.map((item) => {
            return <option value={item?.id}>{item?.name}</option>;
          })}
      </select>
    </div>
  );
}


function SelectAuthorField() {
  const { data, handleSubmit } = usePostForm();
  const { data: authors } = UseAuthors();
  return (
    <div>
      <label className="text-sm  text-gray-500">
        Author<span className="text-red-600">*</span>
      </label>
      <select
        className="w-full p-2  border rounded-lg"
        name="authorId"
        id="authorId"
        required
        value={data?.authorId}
        onChange={(e) => {
          handleSubmit("authorId", e.target.value);
        }}
      >
        <option value="">Select Author</option>
        {authors &&
          authors?.map((item) => {
            return <option value={item?.id}>{item?.name}</option>;
          })}
      </select>
    </div>
  );
}


export default page;
