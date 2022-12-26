// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAPqG7nJGv-mQd9YB4e5n0thKCTHROcdRE",
  authDomain: "social-89bc3.firebaseapp.com",
  projectId: "social-89bc3",
  storageBucket: "social-89bc3.appspot.com",
  messagingSenderId: "1023582550306",
  appId: "1:1023582550306:web:9c9c2b05c387043e888d7b",
  measurementId: "G-V0FPX0RPCW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
