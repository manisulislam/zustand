import {create} from 'zustand';

const useStore = create((set) => ({
  todos: JSON.parse(localStorage.getItem('todos')) || [],

  addTodo: (todo) => set((state) => {
    const newTodos = [
      ...state.todos, 
      { text: todo, completed: false }
    
    ];

    localStorage.setItem('todos', JSON.stringify(newTodos));

    return { todos: newTodos };
  }),


  removeTodo: (index) => set((state) => {
    const todos = [
      ...state.todos
    ];

    todos.splice(index, 1);

    localStorage.setItem('todos', JSON.stringify(todos));

    return { todos };
  }),

  toggleComplete: (index) => set((state) => {
    const todos = [
      
      ...state.todos
    ];
    
    todos[index].completed = !todos[index].completed;

    localStorage.setItem('todos', JSON.stringify(todos));

    return { todos };
  }),
}));

export default useStore;