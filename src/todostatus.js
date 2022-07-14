import { Info, displayTodo } from './create-update-remove.js';

const updateTodo = (ind) => {
  const todos = Info.getTodos();
  const todo = todos.find((todo) => todo.index === ind);
  todo.completed = !todo.completed;

  Info.updateTodos(todos);
  displayTodo();
};

const clearCompletedTodo = () => {
  const todos = Info.getTodos();
  const newTodos = todos.filter((todo) => todo.completed === false);

  Info.updateTodos(Info.updateIndex(newTodos));
  displayTodo();
};

export { updateTodo, clearCompletedTodo };
