// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7cHpGyrMsMC7Oy3Id5-A8J_RB_bXZmKo",
  authDomain: "login-auth-37e47.firebaseapp.com",
  projectId: "login-auth-37e47",
  storageBucket: "login-auth-37e47.firebasestorage.app",
  messagingSenderId: "1010729978296",
  appId: "1:1010729978296:web:a78cb0195273c46b09e74d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;