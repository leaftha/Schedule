// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATi4mS1TtSoMRiFAzOPP3OHH38scQSnYo",
  authDomain: "schedule-c92fe.firebaseapp.com",
  projectId: "schedule-c92fe",
  storageBucket: "schedule-c92fe.firebasestorage.app",
  messagingSenderId: "745612699733",
  appId: "1:745612699733:web:c3d8e8264fe3e2e6b54cdc",
  measurementId: "G-P5XR78TY7C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
