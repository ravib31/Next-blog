import { db, storage } from '@/lib/firebase'
import { deleteDoc, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { uploadBytes } from 'firebase/storage'
import React from 'react'

export const createNewPost = async({data,image}) => {
    // console.log(data)
    // console.log(image)
    if(!data?.title){
        throw new Error("Title is required")
    }
    if(!data?.cat){
        throw new Error("Category is required")
    }
    if(!image){
        throw new Error("Image is required")
    }
    const imageRef = ref(storage, `posts/${data?.cat}.png`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);
    const firebaseRef = doc(db, `posts/${data?.cat}`)
    await setDoc(firebaseRef,{
        ...data,
        id:data?.cat,
        imageURL:imageURL,
        timestamp:Timestamp.now()
    })
 
}

export const updatePost = async({data,image}) => {
    if(!data?.title){
        throw new Error("Name is required")
    }
    if(!data?.cat){
        throw new Error("Category is required")
    }
    var imageURL = data?.imageURL;
    if(image){
        const imageRef = ref(storage, `posts/${data?.cat}.png.png`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
    }
    const firebaseRef = doc(db, `posts/${data?.id}`)
    await updateDoc(firebaseRef,{
        ...data,
        imageURL:imageURL,
        timestamp:Timestamp.now()
    })
 
}
export const deletePost = async(id) => {
    if(!id){
        throw new Error("Id is required")
    }
    await deleteDoc(doc(db, `posts/${id}`));
 
}


