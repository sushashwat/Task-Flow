import ToDoItem from './ToDoItem';

// ToDoList — renders filtered list of todos using map()
function ToDoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className="todo-empty">
        <div className="todo-empty-icon">📭</div>
        <p>No tasks yet. Start by adding your first task 🚀</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo) => (
        // Each item needs a unique key — using todo.id
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
