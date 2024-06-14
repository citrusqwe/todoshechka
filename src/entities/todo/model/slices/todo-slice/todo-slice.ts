import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filteredTodos } from '../../../helpers/todo-helper';
import { Todo } from '../../types/todo';
import { DEFAULT_FILTER, FilterActionItem, FilterActionState } from '../../types/todo-filters';
import { TodoState } from '../../types/todo-state';

export const todosAdapter = createEntityAdapter({
  selectId: (todo: Todo) => todo.id,
});

export const todoSlice = createSlice({
  name: 'todo',
  initialState: todosAdapter.getInitialState<TodoState>({
    ids: [],
    entities: {},
    initialTodos: [],
    filter: DEFAULT_FILTER,
  }),
  reducers: {
    setTodos: todosAdapter.setAll,
    addTodo: todosAdapter.addOne,
    updateTodo: todosAdapter.updateOne,
    updateFilter(state, action: PayloadAction<FilterActionItem>) {
      state.filter = action.payload;
    },
    removeCompletedTodos(state) {
      const completedTodosIds = filteredTodos(Object.values(state.entities), FilterActionState.completed).map(
        (todo) => todo.id,
      );
      todosAdapter.removeMany(state, completedTodosIds);
    },
  },
});

export const { reducer: todoReducer, actions: todoActions } = todoSlice;
