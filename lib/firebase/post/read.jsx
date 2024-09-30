'use client'
import { doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { collection, getDoc, onSnapshot } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'

function UsePosts() {
  const { data,error } = useSWRSubscription(['posts'], ([path], { next }) => {
    const ref = collection(db, path);
    const unsub = onSnapshot(ref, (snapshot) => {
      const categories = snapshot.docs.map((v) => v.data());
      next(null, categories);
    },(error)=>{
        next(error?.message)
    })
    
    return () => unsub();
  })
 
  return {
    data,error,isLoading: data=== undefined ? true : false,
  }
}

export const getPost = async (id)=>{
    return await getDoc(doc(db,`posts/${id}`));
}
export default UsePosts;
