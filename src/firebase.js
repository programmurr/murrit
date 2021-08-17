import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMls1bWaSm9CtXGMZN0Ad4VoUWNtDb_mc",
  authDomain: "murrit-ec42e.firebaseapp.com",
  projectId: "murrit-ec42e",
  storageBucket: "murrit-ec42e.appspot.com",
  messagingSenderId: "394096318363",
  appId: "1:394096318363:web:d6b0a87470426a05f5733e"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
if (window.location.hostname === "localhost") {
  db.settings({
    host: "localhost:8080",
    ssl: false
  });
};

const auth = firebase.auth();

export { db, auth };