import { EntityState } from '@reduxjs/toolkit';
import { Todo } from './todo';
import { FilterActionItem } from './todo-filters';

export interface TodoState extends EntityState<Todo, string> {
  initialTodos: Todo[];
  filter: FilterActionItem;
}
