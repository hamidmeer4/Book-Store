// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6FaMjRoWRhTWJ91tniq9ZrIUge6gv47Y",
  authDomain: "mern-book-inventory-3b349.firebaseapp.com",
  projectId: "mern-book-inventory-3b349",
  storageBucket: "mern-book-inventory-3b349.appspot.com",
  messagingSenderId: "113893062037",
  appId: "1:113893062037:web:c0bfda46954462e9a3329c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;