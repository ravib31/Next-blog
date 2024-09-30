"use client";


import { getPost, getpost } from "@/lib/firebase/post/read";
import { createNewPost, deletePost, updatePost } from "@/lib/firebase/post/write";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

const PostFormContext = createContext();

export default function PostFormContextProvider({ children }) {
  const router = useRouter();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [image,setImage]=useState(null);
  

  const handleSubmit = (key, value) => {
    setIsSuccess(false);
    setData({ ...data, [key]: value });
  };

  const handleCreate = async () => {
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);
    try {
        await createNewPost({data:data,image:image});
      setIsSuccess(true);
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };
  const handleUpdate = async () => {
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);
    try {
        await updatePost({data:data,image:image});
      setIsSuccess(true);
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };
  const handleDelete = async (id) => {
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);
    try {
        await deletePost(id);
      setIsSuccess(true);
      router.push("/admin/posts");
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };
  const fetchData = async(id) =>{
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const res = await getPost(id);
      if(res.exists()){
        setData(res.data());
      }
      else{
        throw new Error("Post not found");
      }

      
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);

  };
  return (
    <PostFormContext.Provider
      value={{
        data,
        isLoading,
        error,
        image,
        setImage,
        handleCreate,
        handleSubmit,
        handleUpdate,
        handleDelete,
        isSuccess,
        fetchData,
       
      }}
    >
      {children}
    </PostFormContext.Provider>
  );
}

export const usePostForm = () => useContext(PostFormContext);
