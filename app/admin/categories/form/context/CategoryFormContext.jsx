"use client";
import { getCategory } from "@/lib/firebase/category/read";
import createNewCategory, { deleteCategory, updateCategory } from "@/lib/firebase/category/write";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

const CategoryFormContext = createContext();

export default function CategoryFormContextProvider({ children }) {
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
        await createNewCategory({data:data,image:image});
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
        await updateCategory({data:data,image:image});
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
        await deleteCategory(id);
      setIsSuccess(true);
      router.push("/admin/categories");
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
      const res = await getCategory(id);
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
    <CategoryFormContext.Provider
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
    </CategoryFormContext.Provider>
  );
}

export const useCategoryForm = () => useContext(CategoryFormContext);
