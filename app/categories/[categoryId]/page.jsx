import { PostCard } from '@/app/components/PostListView';
import { getCategories } from '@/lib/firebase/category/read_server';
import { getAllPostsWithCategory } from '@/lib/firebase/post/read_server';
import React from 'react'

const page = async({params}) => {
    let {categoryId}= params;
    categoryId = decodeURIComponent(categoryId);
    const posts = await getAllPostsWithCategory(categoryId)
  return (
    <div className='p-10'>
        <div className='flex p-5 gap-4'>
            <h1 className='font-bold'>Category</h1>
        <CategoryCard categoryId={categoryId}/>

        </div>
    <div className='grid grid-cols-4 gap-5'>
        {posts?.map((post,key)=>{
            return <PostCard post={post} key={key}/>
        })}
    </div>
    </div>
  )
}

async function CategoryCard({ categoryId }) {
    const category = await getCategories(categoryId);
    return (
     
        <div className=" flex gap-2 items-center rounded-full bg-opacity-60 px-2 py-1 border">
          <img
            src={category?.iconURL}
            alt=""
            className="w-4 h-4 rounded-full object-cover"
          />
          <h4 className="text-xs text-black">{category?.name}</h4>
          {/* <h5 className='text-sm text-gray-500'>{author?.email}</h5> */}
        </div>
     
    );
  }

export default page