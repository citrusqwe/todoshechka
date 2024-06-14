import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { todoActions } from '../todo-slice/todo-slice';
import { AppDispatch, RootState } from 'app/configs/store';
import { todosSelectors } from '../../selectors/todo-selectors';
import { StorageService } from 'shared/utils/storage/storage';

export const todoListenerMiddleware = createListenerMiddleware();
const startAppListening = todoListenerMiddleware.startListening.withTypes<RootState, AppDispatch>();

const storage = new StorageService(process.env.STORAGE_KEY);

startAppListening({
  matcher: isAnyOf(todoActions.addTodo, todoActions.updateTodo, todoActions.removeCompletedTodos),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState();
    const todos = todosSelectors.selectAll(state);
    storage.set(todos);
  },
});
