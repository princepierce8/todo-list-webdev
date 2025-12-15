"use client";

import TaskItem from "./TaskItem";

export default function TaskList({ todos }) {
  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <TaskItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
