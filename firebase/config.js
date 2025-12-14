import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKK_0ruHpbUB4P_2V-38YOtSVIjp_geIQ",
  authDomain: "todo-list-webdev-57b03.firebaseapp.com",
  projectId: "todo-list-webdev-57b03",
  storageBucket: "todo-list-webdev-57b03.firebasestorage.app",
  messagingSenderId: "208558597388",
  appId: "1:208558597388:web:f591e742fdcd2c0d449529",
  measurementId: "G-SECWEHW4KW"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };