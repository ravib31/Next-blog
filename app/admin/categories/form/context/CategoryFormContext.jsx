"use client";
import createNewCategory from "@/lib/firebase/category/write";
import { createContext, useContext, useState } from "react";

const CategoryFormContext = createContext();

export default function CategoryFormContextProvider({ children }) {
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
        isSuccess,
      }}
    >
      {children}
    </CategoryFormContext.Provider>
  );
}

export const useCategoryForm = () => useContext(CategoryFormContext);
