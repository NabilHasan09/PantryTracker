// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJx1djl_aiwpTepmuHT2MBJfCyoqGGwtM",
  authDomain: "pantryai-a6ea5.firebaseapp.com",
  projectId: "pantryai-a6ea5",
  storageBucket: "pantryai-a6ea5.appspot.com",
  messagingSenderId: "648995020679",
  appId: "1:648995020679:web:8d87a2c877790e82e5bd22",
  measurementId: "G-PQR2CTNV0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);