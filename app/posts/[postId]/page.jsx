import { getAuthors } from "@/lib/firebase/author/read_server";
import { getCategories } from "@/lib/firebase/category/read_server";
import { getPost } from "@/lib/firebase/post/read_server";



export async function generateMetadata(
  { params },parent){
    const {postId}= params;
    const post  = await getPost(postId);
  
 
  return {
    title: post?.title,
    openGraph: {
      images: [post?.imageURL],
    },
  }
}

export default async function Page({ params }) {
  console.log("params:", params);
  let { postId } = params;

  // Decode the postId
  postId = decodeURIComponent(postId);
  // console.log("Decoded postId:", postId);

  if (!postId) {
    console.error("postId is undefined or missing");
    return <div>Error: Post ID is missing</div>;
  }

  const post = await getPost(postId);
  // console.log("Fetched post:", post);

  if (!post) {
    return <div>Error: Post not found</div>;
  }

  return (
    <main className="flex justify-center bg-lime-100 ">
      <div className="flex flex-col gap-5 px-16 py-10  max-w[800px]">
        <CategoryCard categoryId={post?.categoryId} />
        <section className="flex flex-col gap-5 px-16 py-10 max-w-[800px]">
          <img
             className="w-full object-cover transform transition duration-500 ease-in-out hover:scale-125"
             src={post?.imageURL}
             alt={post?.title}
          />

          <h1 className="text-2xl font-bold ">{post?.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
        </section>
        <div className="flex justify-between items-center">
          <AuthorCard authorId={post?.authorId} />
          <h5 className="text-xs text-gray-500">
            {post?.timestamp?.toDate()?.toLocaleDateString()}
          </h5>
        </div>
      </div>
    </main>
  );
}

async function AuthorCard({ authorId }) {
  const author = await getAuthors(authorId);
  return (
    <div className=" flex gap-2 items-center">
      <img
        src={author?.photoURL}
        alt=""
        className="w-6 h-6 rounded-full object-cover"
      />
      <h4 className="text-sm text-gray-500">{author?.name}</h4>
      {/* <h5 className='text-sm text-gray-500'>{author?.email}</h5> */}
    </div>
  );
}
async function CategoryCard({ categoryId }) {
  const category = await getCategories(categoryId);
  return (
    <div className="flex">
      <div className=" flex gap-2 items-center rounded-full bg-opacity-60 px-2 py-1 border">
        <img
          src={category?.iconURL}
          alt=""
          className="w-4 h-4 rounded-full object-cover"
        />
        <h4 className="text-xs text-black">{category?.name}</h4>
        {/* <h5 className='text-sm text-gray-500'>{author?.email}</h5> */}
      </div>
    </div>
  );
}
