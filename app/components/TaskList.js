'use client';

import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import TaskItem from './TaskItem';

export default function TaskList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'todos'),
        where('ownerId', '==', user.uid),
        orderBy('timestamp', 'desc') 
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const todosArray = [];
        
        snapshot.forEach((doc) => {
          todosArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setTodos(todosArray);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching todos: ", error);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading tasks...</p>;
  }

  if (todos.length === 0) {
    return <p className="text-center text-gray-500">No tasks found. Start by adding one above!</p>;
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TaskItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}