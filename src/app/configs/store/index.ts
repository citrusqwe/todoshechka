import { configureStore } from '@reduxjs/toolkit';
import { todoReducer, TodoState } from 'entities/todo';
import { todoListenerMiddleware } from 'entities/todo/model/slices/todo-listener/todo-listener';

export interface State {
  todo: TodoState;
}

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(todoListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
