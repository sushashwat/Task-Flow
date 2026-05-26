import { useState } from 'react';

// ToDoItem — displays a single task with complete, edit, delete actions
function ToDoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleEditSave() {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    } else {
      setEditText(todo.text); // revert if empty or unchanged
    }
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  }

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      {/* Completion toggle */}
      <button
        className={`todo-checkbox${todo.completed ? ' checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      />

      {/* Text or edit input */}
      <div className="todo-text-wrapper">
        {isEditing ? (
          <input
            className="todo-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span className="todo-text">{todo.text}</span>
        )}
      </div>

      {/* Action buttons */}
      <div className="todo-actions">
        {isEditing ? (
          <button
            className="icon-btn save"
            onClick={handleEditSave}
            aria-label="Save edit"
            title="Save"
          >
            ✓
          </button>
        ) : (
          <button
            className="icon-btn"
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
            title="Edit"
          >
            ✎
          </button>
        )}
        <button
          className="icon-btn danger"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete task"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </li>
  );
}

export default ToDoItem;
