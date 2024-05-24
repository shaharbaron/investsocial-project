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
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  ref,
  getDownloadURL,
} from "firebase/storage";
import darkColors from "react-native-elements/dist/config/colorsDark";

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

// export function formatTime(timestamp) {
//   const now = Date.now();
//   const diff = now - timestamp;

//   const seconds = Math.floor(diff / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);

//   if (seconds < 60) {
//     return 'now';
//   } else if (minutes < 60) {
//     return `${minutes}m`;
//   } else if (hours < 24) {
//     return `${hours}h`;
//   } else {
//     return `${days}d`;
//   }
// }

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
    // console.log("Firebase - the email is :", email);
    const postsCollection = collection(FIRESTORE_DB, "Posts");
    const q = query(postsCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc) => doc.data());
    // console.log("Firebase - getPostsByEmail result:", result);
    return result;
  } catch (error) {
    console.error("getPostsByEmail Error" + error);
  }
};

export const submitNewPost = async (email, caption, image) => {
  console.log("Firebase - in sumbitnewpost the image is", image);
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
      createdAt: new Date().toISOString(), // save the time in ISO format
      // time: Date.now(),
    };

    const postsCollection = collection(FIRESTORE_DB, "Posts");
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
      .find((user) => user.email.toLowerCase() == email.toLowerCase());
    return result;
  } catch (error) {
    console.error("getUserByEmail Error" + error);
  }
};

export const getEmailByUsername = async (username) => {
  try {
    // console.log("Firebase - getEmailByUser is :", username);
    const usersCollection = collection(FIRESTORE_DB, "users");
    const q = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      // console.log("Firebase - getEmailByUser the email is :", user.email);
      return user.email;
    } else {
      return null;
    }
  } catch (error) {
    console.error("getEmailByUsername Error", error);
    return null;
  }
};

export const getCurrentUserProfileImage = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  // console.log("firebase - getpropic - the user is: ", user);
  if (user) {
    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("firebase - the userdata is :", userData);
        const profileImageUrl = userData.profileImageUrl;
        console.log("firebase - the profileImageUrl is:", profileImageUrl);
        return profileImageUrl;
      } else {
        console.log("User document does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error getting user document:", error);
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
