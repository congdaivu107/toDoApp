import React, { useState, useEffect } from 'react';
import { Typography, Card, List, Checkbox, Input, Button, Modal } from 'antd';
import 'antd/dist/reset.css';
import './Todo.css';

const { Title } = Typography;

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setInputValue('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodoStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, text) => {
    setEditingTodoId(id);
    setEditingText(text);
  };

  const handleEditSubmit = (newText) => {
    if (!newText.trim()) return; 
    setTodos(
      todos.map((todo) => (todo.id === editingTodoId ? { ...todo, text: newText } : todo))
    );
    setEditingTodoId(null);
    setEditingText('');
  };

  const TodoForm = () => (
    <div style={{ marginBottom: '16px' }}>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={() => addTodo(inputValue)}
        style={{ marginRight: '8px' }}
      />
      <Button type="primary" onClick={() => addTodo(inputValue)}>
        Add
      </Button>
    </div>
  );

  return (
    <div className="todo-app">
      <Title level={2}>Todo List</Title>
      <Card className="todo-list">
        <TodoForm />
        <List
          itemLayout="horizontal"
          dataSource={todos}
          renderItem={(item) => (
            <List.Item
              className={`${
                item.completed ? 'todo-item completed' : 'todo-item'
              } ${editingTodoId === item.id ? 'editing' : ''}`}
            >
              <Checkbox
                checked={item.completed}
                onChange={() => toggleTodoStatus(item.id)}
                style={{ marginRight: '8px' }}
              />
              {editingTodoId === item.id ? (
                <Modal open={true} onCancel={() => setEditingTodoId(null)}>
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onPressEnter={() => handleEditSubmit(editingText)}
                  />
                  <Button type="primary" onClick={() => handleEditSubmit(editingText)}>
                    Save
                  </Button>
                </Modal>
              ) : (
                <span>{item.text}</span>
              )}
              <Button type="danger" onClick={() => deleteTodo(item.id)} style={{ marginLeft: 'auto' }}>
                Delete
              </Button>
              <Button type="link" onClick={() => editTodo(item.id, item.text)}>
                Edit
              </Button>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default Todo;
