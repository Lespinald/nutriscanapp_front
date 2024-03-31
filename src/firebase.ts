// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpRwgRKW6TkB8Wg_uxBQWJWiISEUFTLWI",
  authDomain: "nutriscan-9f5cf.firebaseapp.com",
  projectId: "nutriscan-9f5cf",
  storageBucket: "nutriscan-9f5cf.appspot.com",
  messagingSenderId: "573939312414",
  appId: "1:573939312414:web:dc86758471de2d164e4b0f",
  measurementId: "G-SV3F45PR2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };