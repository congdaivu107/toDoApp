import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, onToggleStatus, onEdit }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
