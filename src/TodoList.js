import React from 'react';

import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle }) {
  return (
    <ul className="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} onToggle={() => onToggle(todo.id)} {...todo} />
      ))}
    </ul>
  );
}
