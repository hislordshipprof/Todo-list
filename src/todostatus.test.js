import { Info, updateTodos } from './create-update-remove.js';
import { updateTodo, clearCompletedTodo } from './todostatus.js';

describe('updateTodos()', () => {
  beforeEach(() => {
    localStorage.setItem('todos', JSON.stringify([]));
  });

  it('Edit the todo description in localStorage', () => {
    const index = 0;
    const todo = { description: 'test', completed: false, index };
    Info.addTodo(todo);
    const newDescription = 'new description';

    updateTodos(index, newDescription);

    expect(JSON.parse(localStorage.getItem('todos'))[0].description).toEqual(newDescription);
  });
});

describe('local storage status', () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <div class='list-container'></div>
  `;
  });

  beforeEach(() => {
    localStorage.setItem('todos', JSON.stringify([]));
  });

  it('Update the completed ', () => {
    const index = 0;
    const todo = { description: 'test', completed: false, index };
    Info.addTodo(todo);
    updateTodo(index);
    expect(JSON.parse(localStorage.getItem('todos'))[0].completed).toEqual(true);
  });

  it('clear all completed todos', () => {
    const todo = { description: 'test', completed: false, index: 0 };
    const todo2 = { description: 'test2', completed: true, index: 1 };
    Info.addTodo(todo);
    Info.addTodo(todo2);
    clearCompletedTodo();
    expect(JSON.parse(localStorage.getItem('todos'))).toEqual([todo]);
  });
});