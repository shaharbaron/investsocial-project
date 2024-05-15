import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDFgBraP1poMH5hMAupic9dJ344GcVzlfk",
  authDomain: "invest-social-c2ad4.firebaseapp.com",
  projectId: "invest-social-c2ad4",
  storageBucket: "invest-social-c2ad4.appspot.com",
  messagingSenderId: "874121355029",
  appId: "1:874121355029:web:b380eee6525b77096b131c",
};
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
