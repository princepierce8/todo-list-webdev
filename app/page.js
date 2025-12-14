import AuthGuard from './components/AuthGuard';
import LogoutButton from './components/LogoutButton'; 
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="max-w-xl mx-auto p-8"> 
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">TaskFlow Dashboard</h1>
          <LogoutButton />
        </div>
        
        <UserInfo />
        
        <TaskForm />

        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
            <TaskList />
        </div>
      </div>
    </AuthGuard>
  );
}

function UserInfo() {
    const { user } = useAuth();
    if (user) {
        return (
            <p className="text-gray-600">
                Logged in as: <span className="font-semibold">{user.email}</span>
            </p>
        );
    }
    return null;
}