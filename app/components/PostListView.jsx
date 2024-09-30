import { getAuthors } from "@/lib/firebase/author/read_server";
import { getCategories } from "@/lib/firebase/category/read_server";
import {getAllPosts} from "@/lib/firebase/post/read_server";
import Link from "next/link";
import React from "react";

const PostListView = async () => {
  const posts = await getAllPosts();
//   console.log(posts);
  if (!posts) return <h1>Data Not Found !!!</h1>;

  return (
    <div className='p-5'>
    <div className='grid grid-cols-4 gap-5'>
      {posts?.map((post,key) => {
        return <PostCard  key={key}  post={post}/>;
})}
    </div>
    </div>
  );
};

export function PostCard({ post }) {
  return (
    <Link href={`/posts/${post?.id}`}>
    <div className='p-5 rounded bg-lime-200 hover:bg-lime-400 flex flex-col gap-3 rounded'>
        <div className='relative'>

        <div className='absolute flex justify-end w-full p-3'>
            <CategoryCard categoryId={post?.categoryId}/>
        </div>
        <img src={post?.imageURL} alt="" className='w-full h-28 object-cover' />
        </div>
      <h1 className='font-bold'>{post?.title}</h1>
      <div className='flex justify-between'>
      <AuthorCard authorId={post?.authorId}/>
      <h5 className='text-xs text-gray-500'>{post?.timestamp?.toDate()?.toLocaleDateString()}</h5>
      </div>
      {/* <p className='text-sm'>{post?.content}</p> */}
    </div>
    </Link>
  );
}

async function AuthorCard({authorId}){
     const author = await getAuthors(authorId)
     return <div className=' flex gap-2 items-center'>
        <img src={author?.photoURL} alt="" className='w-6 h-6 rounded-full object-cover' />
        <h4 className='text-sm text-gray-500'>{author?.name}</h4>
        {/* <h5 className='text-sm text-gray-500'>{author?.email}</h5> */}
     </div>

}
async function CategoryCard({categoryId}){
     const category = await getCategories(categoryId)
     return <div className=' flex gap-2 items-center rounded-full bg-lime-600 bg-opacity-60 px-2 py-1 '>
        <img src={category?.iconURL} alt="" className='w-4 h-4 rounded-full object-cover' />
        <h4 className='text-xs text-black'>{category?.name}</h4>
        {/* <h5 className='text-sm text-gray-500'>{author?.email}</h5> */}
     </div>

}

export default PostListView;
