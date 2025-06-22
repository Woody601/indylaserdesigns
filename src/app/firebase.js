// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7xFTOkeW65gQl2DGvTJJwlYbSgtuP138",
  authDomain: "indy-laser-designs.firebaseapp.com",
  projectId: "indy-laser-designs",
  storageBucket: "indy-laser-designs.firebasestorage.app",
  messagingSenderId: "1035137940583",
  appId: "1:1035137940583:web:e70fbf0c79fe1ca098a8c2",
  measurementId: "G-MTC1D65SSS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
