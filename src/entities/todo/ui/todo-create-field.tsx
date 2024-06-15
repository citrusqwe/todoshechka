import { useAppDispatch } from 'app/configs/store/hooks';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Input } from 'shared/ui/input';
import { validators } from 'shared/utils/validators/validators';
import styled, { css } from 'styled-components';
import { v4 as uuid } from 'uuid';
import { todoActions } from '../model/slices/todo-slice/todo-slice';

const inputStyles = css`
  margin-bottom: var(--gap-xs);
`;

const Error = styled.span`
  color: var(--error-color);
`;

export const TodoCreateField = () => {
  const [inputError, setInputError] = useState('');
  const [todoTitle, setTodoTitle] = useState('');
  const dispatch = useAppDispatch();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
    if (inputError) {
      setInputError('');
    }
  };

  const createTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const error = validators.required(todoTitle);
    if (error) {
      setInputError(error);
      return;
    }

    const todo = {
      id: uuid(),
      title: todoTitle,
      completed: false,
      date: Date.now(),
    };
    dispatch(todoActions.addTodo(todo));
    setTodoTitle('');
  };

  return (
    <>
      <Input
        css={inputStyles}
        placeholder="What would you like to do?"
        value={todoTitle}
        onChange={handleTitleChange}
        onKeyDown={createTodo}
      />
      {inputError && <Error>{inputError}</Error>}
    </>
  );
};
