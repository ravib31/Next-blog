import { getAllCategories } from '@/lib/firebase/category/read_server'
import Link from 'next/link'
import React from 'react'

const page = async() => {
    const categories = await getAllCategories()
  return (
    <div className='p-4'>
    <div className='grid grid-cols-5 p-4'>
        {categories?.map((category,key)=>{
            return <CategoryCard category={category} key={key}/>
        })
    }
    </div>
    </div>
)}

function CategoryCard({category}){
    return <Link href={`/categories/${category?.id}`}>
    <div className='flex flex-col items-center justify-center gap-2 hover:bg-lime-400 rounded-xl p-2'>
        <img className='h-28 w-28 object-cover rounded-full' src={category?.iconURL} alt="" />
        <h1 className='font-bold'>{category?.name}</h1>
    </div>
    </Link>
}

export default page