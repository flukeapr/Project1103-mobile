// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_imtODvT-hwTrZoSAtEumTBnCpLFf5YE",
  authDomain: "book-system-31d99.firebaseapp.com",
  projectId: "book-system-31d99",
  storageBucket: "book-system-31d99.appspot.com",
  messagingSenderId: "758955766377",
  appId: "1:758955766377:web:82997bf57fddcea04e68f8",
  measurementId: "G-F026914DEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)