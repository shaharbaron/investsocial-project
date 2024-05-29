import {
  signInWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
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
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  ref,
  getDownloadURL,
} from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const app = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
// export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
    console.log("10....");
    return result;
  } catch (error) {
    console.log(error);
    console.log("11....");
  }
};

export const getAllPosts = async () => {
  try {
    const firestore = getFirestore();
    const postsCollection = collection(firestore, "Posts"); // the database name and collection name as parameters
    const resultDocs = await getDocs(postsCollection);
    const result = resultDocs.docs.map((doc) => doc.data());
    return result;
  } catch (error) {
    console.error("getAllPosts Error" + error);
  }
};

export const getPostsByEmail = async (email) => {
  try {
    const firestore = getFirestore();
    const postsCollection = collection(firestore, "Posts");
    const q = query(postsCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc) => doc.data());
    return result;
  } catch (error) {
    console.error("getPostsByEmail Error" + error);
  }
};

export const submitNewPost = async (email, caption, image) => {
  console.log("Firebase - in sumbitnewpost the image is", image);
  try {
    const firestore = getFirestore();
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
    };

    const postsCollection = collection(firestore, "Posts");
    await addDoc(postsCollection, newPost);
  } catch (error) {
    console.error("submitNewPost Error" + error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const firestore = getFirestore();
    const usersCollection = collection(firestore, "users");
    const resultDocs = await getDocs(usersCollection);
    const result = resultDocs.docs
      .map((doc) => doc.data())
      .find((user) => user.email.toLowerCase() == email.toLowerCase());
    return result;
  } catch (error) {
    console.error("getUserByEmail Error" + error);
  }
};

export const getPostByEmail = async (email) => {
  try {
    const firestore = getFirestore();
    console.log("Firebase - getPostByEmail - the email is: ", email);
    const PostsCollection = collection(firestore, "Posts");
    const resultDocs = await getDocs(PostsCollection);
    const result = resultDocs.docs
      .map((doc) => doc.data())
      .find((Post) => Post.email == email);
    console.log("Firebase - getPostByEmail - the post is: ", result);
    return result;
  } catch (error) {
    console.error("getPostByEmail" + error);
  }
};

export const getEmailByUsername = async (username) => {
  try {
    // console.log("Firebase - getEmailByUser is :", username);
    const firestore = getFirestore();
    const usersCollection = collection(firestore, "users");
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
  if (user) {
    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log(
          "firebase - getcurrentprofile - the userdata is :",
          userData
        );
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

export const updateProfileImage = async (userId, imageUri) => {
  try {
    const storage = getStorage();
    const imageRef = sRef(storage, `/profile-images/${userId}`);
    const response = await fetch(imageUri);
    const blob = await response.blob();
    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);

    const firestore = getFirestore();
    const userDocRef = doc(firestore, "users", userId);
    await updateDoc(userDocRef, {
      profileImageUrl: downloadURL,
    });

    return downloadURL;
  } catch (error) {
    console.error("Error updating profile image:", error);
    throw error;
  }
};

export const updateUsername = async (userId, newUsername) => {
  try {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userDocRef);

    console.log("Firebase - updateuser - the userdoc is :", userDoc);
    if (userDoc.exists()) {
      // Check if the new username is already taken
      const usersCollection = collection(firestore, "users");
      const q = query(usersCollection, where("username", "==", newUsername));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Username is available, update the user document
        await updateDoc(userDocRef, {
          username: newUsername,
        });
        return true;
      } else {
        // Username is already taken
        return false;
      }
    } else {
      console.log("User document does not exist");
      return false;
    }
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
};

export const updatePost = async (postId, newTitle, newImage) => {
  try {
    console.log("Firebase - the postId is :", postId);
    console.log("Firebase - the newTitle is :", newTitle);
    console.log("Firebase - the newImage is :", newImage);
    const firestore = getFirestore();
    const postsCollection = collection(firestore, "Posts");
    const postDoc = await getDoc(doc(postsCollection, postId));
    if (postDoc.exists()) {
      const postData = postDoc.data();
      console.log("Firebase - the post is :", postData);

      const updatedPost = {
        ...postData,
        title: newTitle || postData.title,
      };

      if (newImage) {
        const storage = getStorage();
        const imagesUrl = sRef(storage, "/posts-images/" + postId);
        const response = await fetch(newImage);
        const blob = await response.blob();
        await uploadBytes(imagesUrl, blob);
        const downloadURL = await getDownloadURL(imagesUrl);
        updatedPost.imageURL = downloadURL;
      }

      await updateDoc(postDoc.ref, updatedPost);
      console.log("Post updated successfully");
    } else {
      console.log("Post does not exist");
    }
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (postId) => {};
