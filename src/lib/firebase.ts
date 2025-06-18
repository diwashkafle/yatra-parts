// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2izZrnHxlPrHI20-hQA9OHzDez4t6vsA",
  authDomain: "ecommerce-project-f6645.firebaseapp.com",
  projectId: "ecommerce-project-f6645",
  storageBucket: "ecommerce-project-f6645.firebasestorage.app",
  messagingSenderId: "236640156593",
  appId: "1:236640156593:web:a6e4f18a7cea5f86b41b90",
  measurementId: "G-8MN3E1TKSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};