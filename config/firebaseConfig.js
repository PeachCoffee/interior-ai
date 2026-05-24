// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWoKAO4zP9bY00GgJAyXlZlk6RKXyPaYA",
  authDomain: "interior-ai-1d97f.firebaseapp.com",
  projectId: "interior-ai-1d97f",
  storageBucket: "interior-ai-1d97f.firebasestorage.app",
  messagingSenderId: "166630602350",
  appId: "1:166630602350:web:7a3e9fc97271b08e09d87f",
  measurementId: "G-P902BDXMVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);