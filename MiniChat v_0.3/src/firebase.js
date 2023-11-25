// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAegA5JPNyV9P4rT4zJDsM7ASIt5d80hoY",
  authDomain: "react-firebase-auth-14067.firebaseapp.com",
  projectId: "react-firebase-auth-14067",
  storageBucket: "react-firebase-auth-14067.appspot.com",
  messagingSenderId: "964780563894",
  appId: "1:964780563894:web:db7a7001b31696c64d3517",
  measurementId: "G-HWJT4YQE3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth,app}