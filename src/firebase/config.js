import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore/lite";
import { getEnvironments } from "../journal/helpers";

const env = getEnvironments();
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
auth.languageCode = "es";
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: "select_account" });

// Auth
export const signInWithGoogle = async () =>
  signInWithPopup(auth, googleAuthProvider);
export const signUpWithEmailAndPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
export const singInWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const updateUserProfile = (user, displayName) =>
  updateProfile(user, { displayName });
export const checkUserSession = (callback) =>
  onAuthStateChanged(auth, callback);
export const signOutUser = () => signOut(auth);

// DB
export const createANote = (userUid, note) => {
  const collectionRef = collection(db, `${userUid}`, "journal/notes");
  return addDoc(collectionRef, note);
};

export const getNotes = async (userUid) => {
  const collectionRef = collection(db, `${userUid}`, "journal/notes");
  const queryRef = query(collectionRef);
  const docsSnapshot = await getDocs(queryRef);
  const notes = [];

  docsSnapshot.forEach((doc) => {
    notes.push({ ...doc.data(), id: doc.id });
  });

  return notes;
};

export const updateNote = (userUid, note, id) => {
  const docRef = doc(db, `${userUid}`, `journal/notes/${id}`);
  return updateDoc(docRef, note);
};
export const deleteNote = (userUid, id) => {
  const docRef = doc(db, `${userUid}`, `journal/notes/${id}`);
  return deleteDoc(docRef);
};

export const getNoteForTesting = (ref) => {
  const docRef = doc(db, ref);
  return getDoc(docRef);
};

export const deleteAllDBNotes = async (uid) => {
  const collectionRef = collection(db, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const deletePromises = [];
  docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
  await Promise.all(deletePromises);
};
