import { useAppSelector } from 'app/configs/store/hooks';
import { FC } from 'react';
import EmptyListIcon from 'shared/assets/icons/empty-list.svg';
import { Icon } from 'shared/ui/icon';
import styled, { css } from 'styled-components';
import { getIsTodosEmpty, getTodoFilter } from '../model/selectors/todo-selectors';
import { Todo } from '../model/types/todo';
import { TodoItem } from './todo-item';

interface TodoListProps {
  items: Todo[];
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  padding: 0 var(--gap-md) var(--gap-xl) var(--gap-md);
`;

const ListEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-sm);
  margin-top: 36px;
  text-align: center;
`;

const emptyIconStyles = css`
  max-width: 320px;
  max-height: 320px;
  width: 100%;
  height: 100%;
`;

const ListEmptyTitle = styled.h5`
  font-size: var(--font-size-lg);
  line-height: var(--line-height-lg);
  font-weight: 500;
`;

const FilteredListEmpty = styled.span`
  text-align: center;
  font-size: var(--font-size-lg);
  line-height: var(--line-height-lg);
  font-weight: 500;
  margin-top: var(--gap-lg);
`;

export const TodoList: FC<TodoListProps> = ({ items }) => {
  const isTodosEmpty = useAppSelector(getIsTodosEmpty);
  const { label } = useAppSelector(getTodoFilter);

  if (isTodosEmpty) {
    return (
      <ListEmpty>
        <ListEmptyTitle>Your todo list is empty.</ListEmptyTitle>
        <ListEmptyTitle>Write down what would you like todo to get started!</ListEmptyTitle>
        <Icon Component={EmptyListIcon} css={emptyIconStyles} />
      </ListEmpty>
    );
  }

  return (
    <List>
      {items.length > 0 ? (
        items.map((item) => <TodoItem key={item.id} item={item} />)
      ) : (
        <FilteredListEmpty>No {label} todos found</FilteredListEmpty>
      )}
    </List>
  );
};
