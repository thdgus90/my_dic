// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFDM7Jkv2dMcmZ6qowVxt5n-hgI63ZQ0g",
  authDomain: "my-dictionary-403cd.firebaseapp.com",
  projectId: "my-dictionary-403cd",
  storageBucket: "my-dictionary-403cd.appspot.com",
  messagingSenderId: "32249395465",
  appId: "1:32249395465:web:aa9f85f11dfb531a59bbd8",
  measurementId: "G-GQ1RQJNTT0"
};

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();