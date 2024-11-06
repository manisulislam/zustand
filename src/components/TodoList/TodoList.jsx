
import  { useState } from 'react';
import useStore from '../../store/store.js';

const TodoList = () => {
  const { todos, addTodo, removeTodo, toggleComplete } = useStore();
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 mx-1 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white transition duration-200`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 mx-1 rounded-lg ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white transition duration-200`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 mx-1 rounded-lg ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white transition duration-200`}
        >
          Completed
        </button>
      </div>

      <ul className="space-y-2">
        {filteredTodos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow hover:shadow-md transition duration-200">
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} className={`${todo.completed ? 'text-gray-400' : 'text-gray-800'} transition duration-200`}>
              {todo.text}
            </span>
            <div>
              <button
                onClick={() => toggleComplete(index)}
                className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition duration-200 mr-2"
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => removeTodo(index)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
