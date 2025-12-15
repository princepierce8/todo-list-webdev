"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../_utils/firebase";
import { useUserAuth } from "../_utils/auth-context";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function DashboardPage() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
    if (!user) return;

    const q = query(
      collection(db, "todos"),
      where("ownerId", "==", user.uid)
    );

    const snapshot = await getDocs(q);
    const todosData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTodos(todosData);
  }

  useEffect(() => {
    fetchTodos();
  }, [user]);

  if (!user) {
    return <p className="text-center mt-10">You must be logged in.</p>;
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">TaskTr4cker</h1>

      <TaskForm refreshTodos={fetchTodos} />
      <TaskList todos={todos} />
    </main>
  );
}
