import { Todo } from '../../types/todo';
import { DEFAULT_FILTER, FilterActionState } from '../../types/todo-filters';
import { TodoState } from '../../types/todo-state';
import { todoActions, todoReducer } from './todo-slice';

const initialState = {
  ids: [],
  entities: {},
  initialTodos: [],
  filter: DEFAULT_FILTER,
} as TodoState;
const todosMock: Todo[] = [
  { id: '1', title: 'first1', date: new Date().toLocaleDateString(), completed: false },
  { id: '2', title: 'first2', date: new Date().toLocaleDateString(), completed: true },
  { id: '3', title: 'first3', date: new Date().toLocaleDateString(), completed: true },
];

describe('todo slice', () => {
  test('set todos', () => {
    const newState = todoReducer(initialState, todoActions.setTodos(todosMock));
    console.log(newState);
    expect(Object.values(newState.entities)).toEqual(todosMock);
  });

  test('add todo', () => {
    const newState = todoReducer(initialState, todoActions.addTodo(todosMock[0]));
    expect(newState.entities[1]).toEqual(todosMock[0]);
  });

  test('update todo', () => {
    const stateWithTodo = todoReducer(initialState, todoActions.addTodo(todosMock[0]));
    const newTitle = 'TEST';
    const newState = todoReducer(
      stateWithTodo,
      todoActions.updateTodo({ id: todosMock[0].id, changes: { title: newTitle } }),
    );
    expect(newState.entities[1].title).toEqual(newTitle);
  });

  test('update filter', () => {
    const newFilter = { label: 'label', type: FilterActionState.completed };
    const newState = todoReducer(initialState, todoActions.updateFilter(newFilter));
    expect(newState.filter).toEqual(newFilter);
  });

  test('remove completed todos', () => {
    const stateWithTodos = todoReducer(initialState, todoActions.setTodos(todosMock));
    const newState = todoReducer(stateWithTodos, todoActions.removeCompletedTodos());
    const items = Object.values(newState.entities);
    expect(items.length).toBe(1);
    expect(items.every((item) => !item.completed)).toBeTruthy();
  });
});
