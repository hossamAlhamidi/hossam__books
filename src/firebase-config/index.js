import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// should be inside an env file but for the sake of simplicity and easy deployment I will leave it here
const firebaseConfig = {
    apiKey: "AIzaSyAlb2KWVVPFEqol4QUVHtJcEmxY1J7SXT0",
    authDomain: "mybooks-hossam.firebaseapp.com",
    projectId: "mybooks-hossam",
    storageBucket: "mybooks-hossam.appspot.com",
    messagingSenderId: "261698633378",
    appId: "1:261698633378:web:f9467a3f3e1bcd3df9a1fb",
    measurementId: "G-ZN32FG7LNX"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);