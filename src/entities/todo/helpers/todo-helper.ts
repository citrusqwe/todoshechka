import { Todo } from '../model/types/todo';
import { FilterActionState } from '../model/types/todo-filters';

const COMPLETED_VALUE_BY_FILTER_STATUSES = {
  [FilterActionState.all]: undefined,
  [FilterActionState.active]: false,
  [FilterActionState.completed]: true,
};

export function filteredTodos(todos: Todo[], filter: FilterActionState): Todo[] {
  return todos.filter((todo) => {
    const filterValue = COMPLETED_VALUE_BY_FILTER_STATUSES[filter];
    if (typeof filterValue !== 'boolean' && !filterValue) return true;
    return todo.completed === filterValue;
  });
}
