import { useAppDispatch, useAppSelector } from 'app/configs/store/hooks';
import { getFilteredTodos } from 'entities/todo/model/selectors/todo-selectors';
import { todoActions } from 'entities/todo/model/slices/todo-slice/todo-slice';
import { TodoCreateField } from 'entities/todo/ui/todo-create-field';
import { TodoFilters } from 'entities/todo/ui/todo-filters';
import { TodoList } from 'entities/todo/ui/todo-list';
import { useEffect } from 'react';
import { StorageService } from 'shared/utils/storage/storage';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: var(--wrapper-width);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
  background: white;
  padding: var(--gap-md) var(--gap-md) var(--gap-lg) var(--gap-md);
  margin-bottom: var(--gap-sm);
  position: sticky;
  top: 0;
  z-index: 99;
`;

const Title = styled.h2`
  font-size: var(--font-size-xl);
  line-height: var(--line-height-xl);
  font-weight: 700;
  margin-bottom: var(--gap-md);
  text-align: center;
`;

const storage = new StorageService(process.env.STORAGE_KEY);

export const TodoPage = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(getFilteredTodos);

  useEffect(() => {
    dispatch(todoActions.setTodos(storage.get() || []));
  }, [dispatch]);

  return (
    <Wrapper>
      <Header>
        <Title>todoшечка</Title>
        <TodoCreateField />
        <TodoFilters />
      </Header>
      <TodoList items={todos} />
    </Wrapper>
  );
};
