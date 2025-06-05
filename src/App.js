import React, { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = () => {
    if (todo.trim()) {
      const newTodos = [
        { text: todo, description: description.trim(), completed: false },
        ...todos,
      ];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      setTodo('');
      setDescription('');
      setShowInput(false);
    }
  };

  const toggleComplete = (index) => {
    const updated = todos.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTodos(updated);
    localStorage.setItem('todos', JSON.stringify(updated));
  };

  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
    localStorage.setItem('todos', JSON.stringify(updated));
  };

  return (
    <div className="container py-5">
      <div className="card rounded-4 shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-0 fw-bold">Today's Task</h5>
          </div>
          <button
            className="btn btn-sm btn-outline-primary rounded-pill"
            onClick={() => setShowInput(!showInput)}
          >
            + New Task
          </button>
        </div>

        {showInput && (
          <div className="mb-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Task name..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              Add Task
            </button>
          </div>
        )}

        <div className="list-group">
          {todos.map((item, index) => (
            <div
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center rounded mb-2"
              style={{ backgroundColor: '#f9f9f9' }}
            >
              <div className={`todo-text ${item.completed ? 'completed' : ''}`}>
                <div className="fw-semibold">{item.text}</div>
                {item.description && (
                  <small className="text-muted">{item.description}</small>
                )}
              </div>
              <div className="d-flex align-items-center">
                <button
                  className={`btn btn-sm me-2 border rounded-circle ${
                    item.completed ? 'btn-primary' : ''
                  }`}
                  style={{ width: '28px', height: '28px' }}
                  onClick={() => toggleComplete(index)}
                  title="Mark complete"
                >
                  <i class="fa-solid fa-check"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger rounded-circle"
                  style={{ width: '28px', height: '28px', lineHeight: '10px' }}
                  onClick={() => deleteTodo(index)}
                  title="Delete"
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;