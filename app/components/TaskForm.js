'use client';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

export default function TaskForm() {
  const [taskText, setTaskText] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskText.trim() || !user) return;

    setLoading(true);
    
    try {
      const collectionRef = collection(db, "todos");

      const newTodo = {
        text: taskText,
        completed: false,
        timestamp: new Date(),
        ownerId: user.uid, 
      };

      await addDoc(collectionRef, newTodo);

      setTaskText('');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 p-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="What needs to be done?"
        required
        className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-150 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}