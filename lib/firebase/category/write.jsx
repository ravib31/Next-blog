import { db, storage } from '@/lib/firebase'
import { deleteDoc, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { uploadBytes } from 'firebase/storage'
import React from 'react'

export const createNewCategory = async({data,image}) => {
    // console.log(data)
    // console.log(image)
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

export const updateCategory = async({data,image}) => {
    if(!data?.name){
        throw new Error("Name is required")
    }
    if(!data?.cat){
        throw new Error("Category is required")
    }
    var imageURL = data?.iconURL;
    if(image){
        const imageRef = ref(storage, `categories/${data?.cat}.png`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
    }
    const firebaseRef = doc(db, `categories/${data?.id}`)
    await updateDoc(firebaseRef,{
        ...data,
        iconURL:imageURL,
        timestamp:Timestamp.now()
    })
 
}
export const deleteCategory = async(id) => {
    if(!id){
        throw new Error("Id is required")
    }
    await deleteDoc(doc(db, `categories/${id}`));
 
}


