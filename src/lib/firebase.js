// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-f9ed6.firebaseapp.com",
  projectId: "reactchat-f9ed6",
  storageBucket: "reactchat-f9ed6.appspot.com",
  messagingSenderId: "280139473034",
  appId: "1:280139473034:web:ceb6009984dee79f87cd73"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();