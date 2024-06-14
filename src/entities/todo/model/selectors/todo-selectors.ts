import { createSelector } from '@reduxjs/toolkit';
import { RootState, State } from 'app/configs/store';
import { filteredTodos } from '../../helpers/todo-helper';
import { todosAdapter } from '../slices/todo-slice/todo-slice';
import { FilterActionState } from '../types/todo-filters';

export const getTodoFilter = (state: State) => state.todo.filter;

export const todosSelectors = todosAdapter.getSelectors<RootState>((state) => state.todo);
export const getFilteredTodos = createSelector(
  [todosSelectors.selectAll, (state) => state.todo.filter],
  (todos, filter) => filteredTodos(todos, filter.type),
);
export const getActiveTodosLength = createSelector(
  [todosSelectors.selectAll],
  (todos) => filteredTodos(todos, FilterActionState.active).length,
);
export const getIsTodosEmpty = createSelector([todosSelectors.selectAll], (todos) => !todos.length);
