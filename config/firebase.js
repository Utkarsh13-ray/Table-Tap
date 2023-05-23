// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC0uKC5heI-0BPIan7jf-Aow7UZUY_aww",
  authDomain: "table-tap-81547.firebaseapp.com",
  projectId: "table-tap-81547",
  storageBucket: "table-tap-81547.appspot.com",
  messagingSenderId: "818749732813",
  appId: "1:818749732813:web:4214c2e6a8e36b6635b684",
  measurementId: "G-K359K52X4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = getAuth(app)