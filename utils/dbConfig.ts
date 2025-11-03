// lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URL as string;

if (!MONGODB_URI) {
  throw new Error(" Please define the MONGODB_URI environment variable inside .env.local");
}

let isConnected = false; // track connection state

export const dbConnect = async (): Promise<void> => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGODB_URI);

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional


// const firebaseConfig = {
//   apiKey: "AIzaSyBnoqY7NwhGxkJWgfx-mJ45uAvXZiFT5Vk",
//   authDomain: "geeta-university-data.firebaseapp.com",
//   projectId: "geeta-university-data",
//   storageBucket: "geeta-university-data.firebasestorage.app",
//   messagingSenderId: "4691492071",
//   appId: "1:4691492071:web:1167d8e8735df2c1c53642",
//   measurementId: "G-511VQHGJB3"
// };

// // Initialize Firebase
//  const app = initializeApp(firebaseConfig);
//  const db = getFirestore(app);

// // Export the database instance
// export { db };
