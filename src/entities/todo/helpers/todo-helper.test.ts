import { Todo } from '../model/types/todo';
import { FilterActionState } from '../model/types/todo-filters';
import { filteredTodos } from './todo-helper';

const todosMock: Todo[] = [
  { id: '1', title: '11', date: Date.now(), completed: false },
  { id: '2', title: '22', date: Date.now(), completed: true },
  { id: '3', title: '33', date: Date.now(), completed: false },
];

describe('todo-helper', () => {
  describe('filteredTodos func', () => {
    test('return all todos', () => {
      expect(filteredTodos(todosMock, FilterActionState.all)).toEqual(todosMock);
    });

    test('return active todos', () => {
      expect(filteredTodos(todosMock, FilterActionState.active).length).toBe(2);
    });

    test('return completed todos', () => {
      expect(filteredTodos(todosMock, FilterActionState.completed).length).toBe(1);
    });

    test('return empty array', () => {
      expect(filteredTodos([], FilterActionState.all)).toEqual([]);
    });
  });
});
