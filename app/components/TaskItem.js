"use client";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../_utils/firebase";

export default function TaskItem({ todo }) {
  async function remove() {
    await deleteDoc(doc(db, "todos", todo.id));
  }

  return (
    <li className="flex justify-between border p-3 rounded">
      <span>{todo.text}</span>
      <button
        onClick={remove}
        className="bg-red-600 text-white px-2 rounded cursor-pointer hover:bg-red-700"
      >
        Delete
      </button>
    </li>
  );
}
