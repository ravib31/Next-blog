import { db, storage } from '@/lib/firebase'
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { uploadBytes } from 'firebase/storage'
import React from 'react'

export const createNewAuthor = async({data,image}) => {
    console.log(data)
    if(!data?.name){
        throw new Error("Name is required")
    }
    
    if(!image){
        throw new Error("Image is required")
    }
    const  id = doc(collection(db,'ids')).id;
    const imageRef = ref(storage, `authors/${id}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);
    const firebaseRef = doc(db, `authors/${id}`)
    await setDoc(firebaseRef,{
        ...data,
        id:id,
        photoURL:imageURL,
        timestamp:Timestamp.now()
    })
 
}

export const updateAuthor = async({data,image}) => {
    if(!data?.name){
        throw new Error("Name is required")
    }
   
    var imageURL = data?.photoURL;
    if(image){
        const imageRef = ref(storage, `authors/${data?.id}.png`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
    }
    const firebaseRef = doc(db, `authors/${data?.id}`)
    await updateDoc(firebaseRef,{
        ...data,
        photoURL:imageURL,
        timestamp:Timestamp.now()
    })
 
}
export const deleteAuthor = async(id) => {
    if(!id){
        throw new Error("Id is required")
    }
    await deleteDoc(doc(db, `authors/${id}`));
 
}


