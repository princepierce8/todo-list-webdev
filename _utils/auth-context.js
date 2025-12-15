"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ LOGIN
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // ✅ SIGNUP (THIS WAS MISSING OR MISNAMED)
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // ✅ LOGOUT
  function logout() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(AuthContext);
}
