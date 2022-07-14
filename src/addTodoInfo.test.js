import { Info } from './create-update-remove.js';

let initialTodoInfo = {};

beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn((key, value) => {
    initialTodoInfo[key] = value;
  });
  global.Storage.prototype.getItem = jest.fn((key) => initialTodoInfo[key]);
});

beforEach(() => {
  initialTodoInfo = {
    todos: JSON.stringify([]),
  };
});

afterAll(() => {
  // return our mocks to their original values
  global.Storage.prototype.setItem.mockReset();
  global.Storage.prototype.getItem.mockReset();
});

describe('addTodoItem()', () => {
  it('add a todo item to local storage', () => {
    const todo = { description: "test",completed: false, index: 0 };
    Info.addTodoItem(todo);
    expect(JSON.parse(initialTodoInfo.todos)).toEqual([todo]);
  });
});

describe('deleteTodo()', () => {
  it('remove a todo item from local storage', () => {
    const index = 0;
    const todo = { description: "test", completed: false, index };
    Info.addTodoItem(todo);
    Info.deleteTodo(index);
    expect(JSON.parse(initialTodoInfo.todos)).toEqual([]);
  });
});
