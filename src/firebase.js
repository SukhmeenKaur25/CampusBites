// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ2C8lH3oK63UMQ8p3mqbOn2UAHjNnozI",
  authDomain: "campus-crave-74800.firebaseapp.com",
  projectId: "campus-crave-74800",
  storageBucket: "campus-crave-74800.firebasestorage.app",
  messagingSenderId: "565598707428",
  appId: "1:565598707428:web:fa1b02767e149cf5d916f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();