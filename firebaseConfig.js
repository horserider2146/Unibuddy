import { initializeApp } from "firebase/app";

// IMPORTANT: Replace these with your actual Firebase project credentials
// You can find these in your Firebase project settings under "General" -> "Your apps" -> "SDK setup and configuration"
const firebaseConfig = {
  apiKey: "AIzaSyCRSpqi8JR93sZZbk4jKAaRNoGlFd4yeVQ",
  authDomain: "unibuddy-97489.firebaseapp.com",
  projectId: "unibuddy-97489",
  storageBucket: "unibuddy-97489.firebasestorage.app",
  messagingSenderId: "1092813921261",
  appId: "1:1092813921261:web:0f76c5d734757085bce5e4",
  measurementId: "G-MF0T6V13NR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
