import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { Todo } from '../../types/todo';
import { todoActions, todoReducer } from '../todo-slice/todo-slice';
import { todoListenerMiddleware } from './todo-listener';

const key = process.env.STORAGE_KEY;
const todosMock: Todo[] = [
  { id: '1', title: 'first1', date: new Date().toLocaleDateString(), completed: false },
  { id: '2', title: 'first2', date: new Date().toLocaleDateString(), completed: true },
  { id: '3', title: 'first3', date: new Date().toLocaleDateString(), completed: true },
];
describe('todo listener', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: { todo: todoReducer },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(todoListenerMiddleware.middleware),
    });
  });

  describe('listener set storage', () => {
    test('on add todo action', () => {
      store.dispatch(todoActions.addTodo(todosMock[0]));
      const dataFromStorage = JSON.parse(localStorage.getItem(key) as string);
      expect(dataFromStorage).toEqual([todosMock[0]]);
    });

    test('on update todo action', () => {
      store.dispatch(todoActions.setTodos(todosMock));
      const testTitle = 'TEST';
      store.dispatch(todoActions.updateTodo({ id: todosMock[0].id, changes: { title: testTitle } }));
      const dataFromStorage = JSON.parse(localStorage.getItem(key) as string);
      expect(dataFromStorage[0].title).toEqual(testTitle);
    });

    test('on remove completed todos action', () => {
      store.dispatch(todoActions.setTodos(todosMock));
      store.dispatch(todoActions.removeCompletedTodos());
      const dataFromStorage = JSON.parse(localStorage.getItem(key) as string) as Todo[];
      expect(dataFromStorage.length).toBe(1);
      expect(dataFromStorage.every((item) => !item.completed)).toBeTruthy();
    });
  });
});
