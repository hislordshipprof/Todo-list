export class Info {
  // get todo items from local storage
  static getTodos = () => JSON.parse(localStorage.getItem('todos')) || [];

  static addTodoItem = (todo) => {
    const todos = this.getTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  static updateTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  static updateIndex = (todos) => {
    let indexedTodo = [];
    todos.forEach((todo, todoIndex) => {
      todo.index = todoIndex;
      indexedTodo = [...indexedTodo, todo];
    });
    return indexedTodo;
  };

  static deleteTodo = (ind) => {
    const todos = this.getTodos();
    const newTodos = todos.filter((todo) => todo.index !== ind);

    localStorage.setItem('todos', JSON.stringify(this.updateIndex(newTodos)));
  };
}

const TodoListContainer = document.querySelector('.list-container');
const displayTodo = () => {
  TodoListContainer.innerHTML = ' ';
  const todos = Info.getTodos();
  todos.forEach(({ description, completed, index }) => {
    const listItem = document.createElement('div');
    listItem.className = `row list-item list-item-${index}`;
    listItem.innerHTML = `
    <button class="check-box" data-ind="${index}">
      <span class="icon-check" data-completed="${completed}"></span>
      <i class="fa-solid fa-check" data-completed="${completed}"></i>
    </button>
    <input class="todo-item" type="text" data-todo="${index}" data-completed="${completed}" value='${description}' />
    <button class="delete" data-del="${index}"><i class="fa-solid fa-trash-can" ></i></button>
    <svg
      width="25px"
      height="30px"
      class="icon-move"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="#b6b6b8"
      ></path>
    </svg>
  `;

    TodoListContainer.appendChild(listItem);
  });
};

const createTodoInfo = () => {
  // get todo description
  const description = document.querySelector('#new-todo').value;
  if (!description) return;

  // create new todo object
  const todo = {
    description: `${description}`,
    completed: false,
    index: Info.getTodos().length,
  };

  // add new todo to local storage
  Info.addTodoItem(todo);

  // add new todo to UI
  displayTodo();
};

const updateTodos = (el) => {
  el.addEventListener('keyup', () => {
    const todos = Info.getTodos();
    const todoNum = +el.dataset.todo;
    const todo = todos.find((todo) => todo.index === todoNum);
    todo.description = el.value.trim();

    Info.updateTodos(todos);
  });
};

export { displayTodo, createTodoInfo, updateTodos };
