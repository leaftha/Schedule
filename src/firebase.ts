// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FireBase_apiKey,
  authDomain: process.env.REACT_APP_FireBase_authDomain,
  databaseURL: process.env.REACT_APP_FireBase_databaseURL,
  projectId: process.env.REACT_APP_FireBase_projectId,
  storageBucket: process.env.REACT_APP_FireBase_storageBucket,
  messagingSenderId: process.env.REACT_APP_FireBase_messagingSenderId,
  appId: process.env.REACT_APP_FireBase_appId,
  measurementId: process.env.REACT_APP_FireBase_measurementId,
};
const app = initializeApp(firebaseConfig);

//export default app;
export const db = getDatabase(app);
export const auth = getAuth(app);
