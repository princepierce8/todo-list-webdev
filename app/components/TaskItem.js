'use client';

import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';

export default function TaskItem({ todo }) {
  const { user } = useAuth();

  const handleToggle = async () => {
    if (!user) return; 

    try {
      const todoRef = doc(db, 'todos', todo.id);

      await updateDoc(todoRef, {
        completed: !todo.completed
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDelete = async () => {
    if (!user) return; 

    try {
      const todoRef = doc(db, 'todos', todo.id);

      await deleteDoc(todoRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <li className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition duration-200 ${todo.completed ? 'bg-green-100 border-l-4 border-green-500' : 'bg-white border-l-4 border-gray-200 hover:shadow-md'}`}>
      <div 
        className={`flex-grow cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
        onClick={handleToggle}
      >
        {todo.text}
        <span className="block text-xs text-gray-400">
            {todo.timestamp?.toDate().toLocaleDateString()}
        </span>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={handleToggle}
          className={`p-2 rounded-full text-white transition duration-150 ${todo.completed ? 'bg-gray-400 hover:bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
          title={todo.completed ? 'Mark as Pending' : 'Mark as Complete'}
        >
          {todo.completed ? 'Undo' : 'Done'} 
        </button>

        <button
          onClick={handleDelete}
          className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition duration-150"
          title="Delete Task"
        >
          Del
        </button>
      </div>
    </li>
  );
}