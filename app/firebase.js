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
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFromCache, saveToCache, clearCache } from "./cache";

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
    if (result) {
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
    }
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
    return result;
  } catch (error) {
    console.error("getPostsByEmail Error" + error);
  }
};

export const submitNewPost = async (email, caption, image) => {
  console.log(
    "Firebase - submitNewPost - in sumbitnewpost the image is",
    image
  );
  try {
    const storage = getStorage();
    const imagesurl = sRef(storage, "/posts-images/" + Date.now());
    const response = await fetch(image);
    const blob = await response.blob();
    console.log("firebase - sumbitNewPost - the image URL is: ", imagesurl);
    await uploadBytes(imagesurl, blob);

    const downloadURL = await getDownloadURL(imagesurl);

    const newPost = {
      email: email,
      title: caption,
      imageURL: downloadURL,
      time: Date.now(),
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
    //console.log("Firebase - getEmailByUsername is :", username);
    const usersCollection = collection(FIRESTORE_DB, "users");
    const q = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      // console.log("Firebase - getEmailByUsername the email is :", user.email);
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
    const cacheKey = `userProfileImage_${user.uid}`;
    const cachedImageUrl = await getFromCache(cacheKey);
    if (cachedImageUrl) {
      console.log(
        "Firebase - getCurrentUserProfileImage - Profile image retrieved from cache"
      );
      return cachedImageUrl;
    }
    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log(
          "firebase - getCurrentUserProfileImage - the userdata is :",
          userData
        );
        const profileImageUrl = userData.profileImageUrl;
        console.log(
          "firebase - getCurrentUserProfileImage - the profileImageUrl is:",
          profileImageUrl
        );
        await saveToCache(cacheKey, profileImageUrl);
        console.log(
          "Profile image retrieved from Firestore and saved to cache"
        );
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
    console.log("Firebase - updateProfile - the downloadURL is: ", downloadURL);

    // Create a reference to the user document in Firestore
    const db = getFirestore();
    const userDocRef = doc(db, "users", userId);

    await updateDoc(userDocRef, {
      profileImageUrl: downloadURL,
    });

    const cacheKey = `userProfileImage_${userId}`;
    await clearCache(cacheKey);
    console.log("Profile image updated and cache cleared");

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
      console.log("firebase - updateUsername - User document does not exist");
      return false;
    }
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
};

export const getPostByTime = async (time) => {
  try {
    const firestore = getFirestore();
    console.log("Firebase - getPostByTime - the time is: ", time);
    const PostsCollection = collection(firestore, "Posts");
    const resultDocs = await getDocs(PostsCollection);
    const result = resultDocs.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .find((Post) => Post.time == time);
    console.log("Firebase - getPostByTime - the post is: ", result);
    return result;
  } catch (error) {
    console.error("getPostByTime" + error);
  }
};

export const updatePost = async (postId, newCaption, newImage) => {
  try {
    const firestore = getFirestore();
    const post = await getPostByTime(postId);
    console.log("Firebase - updatePost - the  post is: ", post);
    console.log("firebase - updatePost - the postId is: ", postId);
    console.log("firebase - updatePost - the newCaption is: ", newCaption);
    console.log("firebase - updatePost - the newImage is: ", newImage);

    if (post) {
      const postDocRef = doc(firestore, "Posts", post.id);
      let updatedData = {};

      if (newCaption) {
        updatedData.title = newCaption;
      }
      console.log("Firebase - updatePost - the updateData is: ", updatedData);

      if (newImage) {
        const storage = getStorage();
        const imagesurl = sRef(storage, "/posts-images/" + post.id);
        const response = await fetch(newImage);
        const blob = await response.blob();
        await uploadBytes(imagesurl, blob);
        const downloadURL = await getDownloadURL(imagesurl);

        updatedData.imageURL = downloadURL;
      }

      await updateDoc(postDocRef, updatedData);
      console.log("Post updated successfully");
    } else {
      console.log("Post not found");
    }
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (postTime) => {
  try {
    const firestore = getFirestore();
    const storage = getStorage();
    const post = await getPostByTime(postTime);

    if (post) {
      // Delete the post document from Firestore
      const postDocRef = doc(firestore, "Posts", post.id);
      await deleteDoc(postDocRef);
      console.log("Firebase - deletePost - Post deleted successfully");

      // Delete the post image from Storage
      const imageURL = post.imageURL;
      if (imageURL) {
        const imageRef = ref(storage, imageURL);
        await deleteObject(imageRef);
        console.log("Post image deleted successfully");
      }
    } else {
      console.log("Post not found");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
