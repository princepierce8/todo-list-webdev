"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../_utils/firebase";
import { useUserAuth } from "../../_utils/auth-context";

export default function TaskForm({ refreshTodos }) {
  const [text, setText] = useState("");
  const { user } = useUserAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || !user) return;

    await addDoc(collection(db, "todos"), {
      text,
      completed: false,
      ownerId: user.uid,
      createdAt: serverTimestamp(),
    });

    setText("");
    refreshTodos(); // ✅ CORRECT
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        className="border p-2 flex-grow"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 rounded cursor-pointer hover:bg-blue-700">
        Add
      </button>
    </form>
  );
}
