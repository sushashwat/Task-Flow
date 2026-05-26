import { useState } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';

// Utility: generate a unique id for each task
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// App — root component; owns all state and passes handlers as props
function App() {
  // State: array of todo objects { id, text, completed }
  const [todos, setTodos] = useState([
    { id: generateId(), text: '', completed: true},
    { id: generateId(), text: '', completed: true },
    { id: generateId(), text: '', completed: false },
    { id: generateId(), text: '', completed: false},
  ]);

  // State: controlled input value for new task
  const [inputValue, setInputValue] = useState('');

  // State: active filter tab
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // ── Event Handlers ──────────────────────────────────────────────

  // Add a new todo
  function handleAdd(e) {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;
    setTodos((prev) => [
      { id: generateId(), text, completed: false },
      ...prev,
    ]);
    setInputValue('');
  }

  // Toggle completed state of a todo
  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Delete a todo
  function handleDelete(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  // Edit text of an existing todo
  function handleEdit(id, newText) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }

  // ── Derived Values ──────────────────────────────────────────────
  const completedCount = todos.filter((t) => t.completed).length;
  const progress = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="app-wrapper">
      {/* Header receives stats as props */}
      <Header total={todos.length} completed={completedCount} />

      <main className="app-main">
        {/* Add task form */}
        <form className="add-task-form" onSubmit={handleAdd}>
          <input
            className="add-task-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task and press Enter…"
            aria-label="New task"
          />
          <button className="add-task-btn" type="submit">
            + Add
          </button>
        </form>

        {/* Progress bar */}
        <div className="progress-bar-wrap">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-pct">{progress}%</span>
        </div>

        {/* Filter tabs */}
        <div className="filter-tabs" role="tablist">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`filter-tab${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
              role="tab"
              aria-selected={filter === f}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* ToDoList receives filtered todos + all handlers as props */}
        <ToDoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
}

export default App;
