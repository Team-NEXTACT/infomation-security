// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHDaHy0QZCMTQPTTyqhGQGM7MnNSpd7gw",
  authDomain: "pdf-security.firebaseapp.com",
  projectId: "pdf-security",
  storageBucket: "pdf-security.firebasestorage.app",
  messagingSenderId: "929096820439",
  appId: "1:929096820439:web:a580aaf45ee7e6de1c7292",
  measurementId: "G-SQRVWNDBJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 필요한 서비스만 초기화
export const auth = getAuth(app);
export const db = getFirestore(app); 