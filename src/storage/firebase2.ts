// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW10f6peONshtkWLZlQPlDZa-gT8VbrGg",
  authDomain: "testnutriscan.firebaseapp.com",
  projectId: "testnutriscan",
  storageBucket: "testnutriscan.appspot.com",
  messagingSenderId: "647978610230",
  appId: "1:647978610230:web:9c376801a6b179ab61b297"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);