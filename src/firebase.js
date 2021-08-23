import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/firebase-storage";

// TODO:
// Set up emulator to test auth functionality

const firebaseConfig = {
  apiKey: "AIzaSyDMls1bWaSm9CtXGMZN0Ad4VoUWNtDb_mc",
  authDomain: "murrit-ec42e.firebaseapp.com",
  projectId: "murrit-ec42e",
  storageBucket: "murrit-ec42e.appspot.com",
  messagingSenderId: "394096318363",
  appId: "1:394096318363:web:d6b0a87470426a05f5733e"
};

firebase.initializeApp(firebaseConfig);

// Firestore
const db = firebase.firestore();
if (window.location.hostname === "localhost") {
  db.useEmulator("localhost", 8080);
}

// Auth
const auth = firebase.auth();
if (window.location.hostname === "localhost") {
  auth.useEmulator("http://localhost:9099");
}

const provider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
}

// Auth - User handling
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName } = user;
    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

// Storage

const storage = firebase.storage();
if (window.location.hostname === "localhost") {
  storage.useEmulator("localhost", 9199);
}
storage.useEmulator("localhost", 9199);


export { db, auth, signInWithGoogle, storage };