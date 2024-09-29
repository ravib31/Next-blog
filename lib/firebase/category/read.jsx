'use client'
import { doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { collection, getDoc, onSnapshot } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'

function UseCategories() {
  const { data,error } = useSWRSubscription(['categories'], ([path], { next }) => {
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

export const getCategory = async (id)=>{
    return await getDoc(doc(db,`categories/${id}`));
}
export default UseCategories;
