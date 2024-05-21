import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getDocs,
  getFirestore,
  collection,
  addDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  ref,
  getDownloadURL,
} from "firebase/storage";

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
    const auth = FIREBASE_AUTH;
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const postsCollection = collection(FIRESTORE_DB, "Posts"); // the database name and collection name as parameters
    const resultDocs = await getDocs(postsCollection);
    const result = resultDocs.docs.map((doc) => doc.data());
    return result;
  } catch (error) {
    console.error("getAllPosts Error" + error);
  }
};

export const getPostsByEmail = async (email) => {
  try {
    const postsCollection = collection(FIRESTORE_DB, "Posts");
    const q = query(postsCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc) => doc.data());
    console.log("Firebase - getPostsByEmail result:", result);
    return result;
  } catch (error) {
    console.error("getPostsByEmail Error" + error);
  }
};

export const submitNewPost = async (email, caption, image) => {
  console.log("in firebase in sumbitnewpost the image is", image);
  try {
    const storage = getStorage();
    const imagesurl = sRef(storage, "/posts-images/" + Date.now());
    const response = await fetch(image);
    const blob = await response.blob();
    const bytesref = await uploadBytes(imagesurl, blob);
    const downloadURL = await getDownloadURL(bytesref.ref);

    const newPost = {
      email: email,
      title: caption,
      imageURL: downloadURL,
      time: Date.now(),
    };
    const postsCollection = collection(db, "Posts");
    await addDoc(postsCollection, newPost);
  } catch (error) {
    console.error("submitNewPost Error" + error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const usersCollection = collection(FIRESTORE_DB, "users");
    const resultDocs = await getDocs(usersCollection);
    const result = resultDocs.docs
      .map((doc) => doc.data())
      .find((user) => user.email == email);
    return result;
  } catch (error) {
    console.error("getUserByEmail Error" + error);
  }
};

export const getCurrentUserProfileImage = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    try {
      const storage = getStorage();
      const profileImageRef = ref(storage, `profile-images/${user.uid}`);
      const downloadURL = await getDownloadURL(profileImageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error getting current user's profile image:", error);
      return null;
    }
  } else {
    console.log("No user is currently signed in");
    return null;
  }
};

export const getCurrentUserUsername = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const firestore = getFirestore();
      const userId = user.uid;
      const userDocRef = doc(firestore, "users", userId);

      const unsubscribe = onSnapshot(
        userDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            resolve(userData.username);
          } else {
            console.log("User data not found");
            resolve(null);
          }
        },
        (error) => {
          console.error("Error getting user data:", error);
          reject(error);
        }
      );

      // Return the unsubscribe function
      return unsubscribe;
    } else {
      console.log("No user is currently signed in");
      resolve(null);
    }
  });
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

//export { FIREBASE_APP, FIRESTORE_DB };
