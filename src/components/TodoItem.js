import React from 'react';

function TodoItem({ todo, onDelete, onToggleStatus, onEdit }) {
  const handleEdit = () => {
    const newText = prompt('Edit todo:', todo.text);
    if (newText !== null) {
      onEdit(todo.id, newText);
    }
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleStatus(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
