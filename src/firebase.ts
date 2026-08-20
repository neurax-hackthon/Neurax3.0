// ─── Firebase Configuration ────────────────────────────────────────────────
// Dedicated Firebase project for NeuraX 3.0 (separate from the 2.0 site's
// `neurax-2026` project, so nothing here can collide with 2.0's live data).
// The API key below is a public client identifier, not a secret — Firebase's
// security model relies on Firestore Security Rules (see firestore.rules),
// not on hiding this config.
// ────────────────────────────────────────────────────────────────────────────
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbXfazG_1rjZbV3aaMxvVCpvnfIlBkIBs",
  authDomain: "neurax-3.firebaseapp.com",
  projectId: "neurax-3",
  storageBucket: "neurax-3.firebasestorage.app",
  messagingSenderId: "14049056968",
  appId: "1:14049056968:web:d42399420630e2e2aeedfd",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
