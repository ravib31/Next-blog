import { db, storage } from '@/lib/firebase'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { uploadBytes } from 'firebase/storage'
import React from 'react'

const createNewCategory = async({data,image}) => {
    console.log(data)
    console.log(image)
    if(!data?.name){
        throw new Error("Name is required")
    }
    if(!data?.cat){
        throw new Error("Category is required")
    }
    if(!image){
        throw new Error("Image is required")
    }
    const imageRef = ref(storage, `categories/${data?.cat}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);
    const firebaseRef = doc(db, `categories/${data?.cat}`)
    await setDoc(firebaseRef,{
        ...data,
        id:data?.cat,
        iconURL:imageURL,
        timestamp:Timestamp.now()
    })
 
}

export default createNewCategory