import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALd4cQb4vsMxWCVfKHrMZxBef7AYPrXJ4",
  authDomain: "whatsapp-c92de.firebaseapp.com",
  projectId: "whatsapp-c92de",
  storageBucket: "whatsapp-c92de.appspot.com",
  messagingSenderId: "587439148671",
  appId: "1:587439148671:web:38467bd1bbb5bf377bb94a",
  measurementId: "G-5RYF2QREN5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
