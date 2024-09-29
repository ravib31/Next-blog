'use client'
import React from 'react'
import { useCategoryForm } from './context/CategoryFormContext'
const page = () => {
    const {
        data,
        isLoading,
        image,
        setImage,
        error,
       handleCreate,
       handleSubmit,
       isSuccess
    }= useCategoryForm();
  return (
    <div className='w-full p-6 flex flex-col gap-3'>
        <h1 className='font-bold'>Add a post</h1>
        <div className='flex'>
        <form className='flex flex-col gap-2 bg-lime-100 p-7 rounded-xl ' onSubmit={(e)=>{
            e.preventDefault()
            handleCreate();
        }}>
            <input type="text" onChange={(e)=>{
                handleSubmit('name',e.target.value)
            }} value={data?.name} required placeholder='Name *' className='w-full p-2  border rounded-lg' /><br />

            <input onChange={(e)=>{
                handleSubmit('cat',e.target.value)
            }} value={data?.cat} required  cols="5" rows="3" placeholder='Category *' className='w-full p-2  border rounded-lg'/><br />
            <label className='text-sm  text-gray-500'>Image <span className='text-red-500'>*</span></label>
            <input type="file" accept='image/*' onChange={(e)=>{
                e.preventDefault();
                setImage(e.target.files[0])
            }} required placeholder='Image *' className='w-full p-2  border rounded-lg' /><br />
            {image && <img src={URL.createObjectURL(image)} alt="image" className='w-[100px] h-[100px] object-cover rounded-2xl' />}
            {!isSuccess && <button type='submit' disabled={isLoading || isSuccess} className='px-4 py-2 bg-lime-200 hover:bg-lime-400 rounded-full font-bold '>{isLoading ? "Loading...":"Add"}</button>}
            {isSuccess && <p className='text-green-500 text-center font-bold'>Post added successfully !!!</p>}
            {error && <p className='text-red-500'>{error}</p>}
        </form>
        </div>
    </div>
  )
}

export default page