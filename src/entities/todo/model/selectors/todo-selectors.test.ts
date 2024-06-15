import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { todoActions, todoReducer } from '../slices/todo-slice/todo-slice';
import { Todo } from '../types/todo';
import { FilterActionState } from '../types/todo-filters';
import { getActiveTodosLength, getFilteredTodos, getIsTodosEmpty, getTodoFilter } from './todo-selectors';

const todosMock: Todo[] = [
  { id: '1', title: 'first1', date: Date.now(), completed: false },
  { id: '2', title: 'first2', date: Date.now(), completed: true },
  { id: '3', title: 'first3', date: Date.now(), completed: true },
];

describe('todo selectors', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        todo: todoReducer,
      },
    });
    store.dispatch(todoActions.setTodos(todosMock));
  });

  test('getFilteredTodos return all todos', () => {
    store.dispatch(todoActions.updateFilter({ label: 'test', type: FilterActionState.all }));
    expect(getFilteredTodos(store.getState())).toEqual(todosMock);
  });

  test('getFilteredTodos return active todos', () => {
    store.dispatch(todoActions.updateFilter({ label: 'test', type: FilterActionState.active }));
    expect(getFilteredTodos(store.getState()).every((item) => !item.completed)).toBeTruthy();
  });

  test('getFilteredTodos return completed todos', () => {
    store.dispatch(todoActions.updateFilter({ label: 'test', type: FilterActionState.completed }));
    expect(getFilteredTodos(store.getState()).every((item) => item.completed)).toBeTruthy();
  });

  test('getActiveTodosLength return exact number of active todos', () => {
    expect(getActiveTodosLength(store.getState())).toBe(1);
  });

  test('getIsTodosEmpty', () => {
    expect(getIsTodosEmpty(store.getState())).toBeFalsy();
  });

  test('getTodoFilter', () => {
    const testFilter = { label: 'test', type: FilterActionState.completed };
    store.dispatch(todoActions.updateFilter(testFilter));
    expect(getTodoFilter(store.getState())).toEqual(testFilter);
  });
});
