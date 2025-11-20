import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDu6mLMt8dn44vBQbkhZiGFk3cHsAFTKE",
  authDomain: "dietplanner-db43f.firebaseapp.com",
  projectId: "dietplanner-db43f",
  storageBucket: "dietplanner-db43f.firebasestorage.app",
  messagingSenderId: "914086890954",
  appId: "1:914086890954:web:fd57a217b0d6f271fc9333",
  measurementId: "G-J82N2DBM40"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
