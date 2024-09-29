"use client";
import React,{ useEffect } from "react";

import { useSearchParams } from "next/navigation";
import { useAuthorForm } from "./context/AuthorFormContext";

const page = () => {
  const searchParams = useSearchParams();
  const updateAuthorId = searchParams.get("id");

 

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
    fetchData
  } = useAuthorForm();

  useEffect(()=>{
    if(updateAuthorId){
     fetchData(updateAuthorId);
    }
  },[updateAuthorId])
//   console.log(updateAuthorId);
  return (
    <div className="w-full p-6 flex flex-col gap-3">
      <div className="flex gap-5 items-center">
        {updateAuthorId ? (
          <h1 className="font-bold text-green-500">Update Author</h1>
        ) : (
          <h1 className="font-bold">Add Author</h1>
        )}
      </div>
      <div className="flex">
        <form
          className="flex flex-col gap-2 bg-lime-100 p-7 rounded-xl "
          onSubmit={(e) => {
            e.preventDefault();
            if(updateAuthorId){
              handleUpdate();
            }else{
            handleCreate();
            }
          }}
        >
          <input
            type="text"
            onChange={(e) => {
              handleSubmit("name", e.target.value);
            }}
            value={data?.name}
            required
            placeholder="Author Name *"
            className="w-full p-2  border rounded-lg"
          />
          <br />

          <input
            onChange={(e) => {
              handleSubmit("email", e.target.value);
            }}
            value={data?.email}
            required
            cols="5"
            rows="3"
            placeholder="Author Email *"
            className="w-full p-2  border rounded-lg"
          />
          <br />
          <label className="text-sm  text-gray-500">
            Image
          </label>
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
          {data?.photoURL && (
            <img
              src={data?.photoURL}
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
              {isLoading ? "Loading..." : updateAuthorId ? "Update" : "Create"}
            </button>
          )}
          {updateAuthorId && !isSuccess && (
            <button
              onClick={(e)=>{
                    e.preventDefault();   
                    handleDelete(updateAuthorId);          
              }}
              disabled={isLoading || isSuccess}
              className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded-full font-bold "
            >
              {isLoading ? "Loading..." :  "Delete"}
            </button>
          )}
          {isSuccess && (
            <p className="text-green-500 text-center font-bold">
              Author {updateAuthorId ? "Updated":"Created"} successfully !!!
            </p>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default page;
