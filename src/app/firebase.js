// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEUzkco8H_9d-k3YjQd03SQ4EY2sj69q4",
  authDomain: "pantry-app-v1.firebaseapp.com",
  projectId: "pantry-app-v1",
  storageBucket: "pantry-app-v1.appspot.com",
  messagingSenderId: "808653746294",
  appId: "1:808653746294:web:1a8b48b5634226906daf57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {app, firestore}