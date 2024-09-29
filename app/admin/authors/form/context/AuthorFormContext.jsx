"use client";

import { getAuthors } from "@/lib/firebase/author/read";
import { createNewAuthor, deleteAuthor, updateAuthor } from "@/lib/firebase/author/write";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

const AuthorFormContext = createContext();

export default function AuthorFormContextProvider({ children }) {
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
        await createNewAuthor({data:data,image:image});
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
        await updateAuthor({data:data,image:image});
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
        await deleteAuthor(id);
      setIsSuccess(true);
      router.push("/admin/authors");
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
      const res = await getAuthors(id);
      if(res.exists()){
        setData(res.data());
      }
      else{
        throw new Error("Category not found");
      }

      
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);

  };
  return (
    <AuthorFormContext.Provider
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
    </AuthorFormContext.Provider>
  );
}

export const useAuthorForm = () => useContext(AuthorFormContext);
