
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

console.log("db connected firestore")

const firebaseConfig = {
  apiKey: "AIzaSyBnoqY7NwhGxkJWgfx-mJ45uAvXZiFT5Vk",
  authDomain: "geeta-university-data.firebaseapp.com",
  projectId: "geeta-university-data",
  storageBucket: "geeta-university-data.firebasestorage.app",
  messagingSenderId: "4691492071",
  appId: "1:4691492071:web:1167d8e8735df2c1c53642",
  measurementId: "G-511VQHGJB3"
};
console.log("db connected firestore")

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };