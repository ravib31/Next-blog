'use client'
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore'
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

export default UseCategories