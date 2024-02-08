// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-27df5.firebaseapp.com",
  projectId: "real-estate-27df5",
  storageBucket: "real-estate-27df5.appspot.com",
  messagingSenderId: "44476994271",
  appId: "1:44476994271:web:524356cb38507f0e0bcf6a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);