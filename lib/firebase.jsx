import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBO7g7DFfytybDGs_kboeVdKKgW7FXkzSo",
  authDomain: "next-blog-4b2a5.firebaseapp.com",
  projectId: "next-blog-4b2a5",
  storageBucket: "next-blog-4b2a5.appspot.com",
  messagingSenderId: "193730886293",
  appId: "1:193730886293:web:1d9dad77daed570bf0399c",
  measurementId: "G-D8SHMT8KC3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();