// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEW6gAjUQSg88_70vwjjMVNjnV1vShj_s",
  authDomain: "thinkify-c33fe.firebaseapp.com",
  projectId: "thinkify-c33fe",
  storageBucket: "thinkify-c33fe.appspot.com",
  messagingSenderId: "244048845482",
  appId: "1:244048845482:web:e0e400805a313b64624ed3",
  measurementId: "G-JW68ZLK8ND"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);