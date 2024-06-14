import { useAppDispatch } from 'app/configs/store/hooks';
import DOMPurify from 'dompurify';
import { ChangeEvent, FC, FormEvent, KeyboardEvent, memo, useRef, useState } from 'react';
import UpdateIcon from 'shared/assets/icons/update.svg';
import { Button } from 'shared/ui/button';
import { Checkbox } from 'shared/ui/checkbox';
import { Icon } from 'shared/ui/icon';
import styled from 'styled-components';
import { todoActions } from '../model/slices/todo-slice/todo-slice';
import { Todo } from '../model/types/todo';

interface TodoItemProps {
  item: Todo;
}

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  gap: var(--gap-sm);
  padding: var(--gap-md);
  border-radius: var(--border-radius);
  background: var(--primary-color);
  border: 2px solid var(--border-color);
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: break-spaces;
`;

const ItemBody = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
`;

const ItemTitle = styled.p`
  font-weight: 500;
  color: var(--title-color);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-lg);

  &:focus {
    outline: none;
    padding: 0 var(--gap-sm);
    border: 2px solid var(--accent-color);
    border-radius: var(--border-radius);
  }
`;

const ItemDate = styled.span`
  color: var(--text-color-muted);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
`;

const ItemActions = styled.div`
  display: flex;
  gap: var(--gap-xs);
`;

export const TodoItem: FC<TodoItemProps> = memo(({ item: { id, title, completed, date } }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const dispatch = useAppDispatch();

  const handleCompletedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const completed = e.target.checked;
    dispatch(todoActions.updateTodo({ id, changes: { completed } }));
  };

  const handleTitleChanges = (e: FormEvent<HTMLParagraphElement>) => {
    const title = e.currentTarget.innerText;
    setTodoTitle(title);
  };

  const startUpdating = () => {
    setIsUpdating(true);
    queueMicrotask(() => titleRef.current?.focus());
  };
  const stopUpdating = () => setIsUpdating(false);

  const updateTodo = (e: KeyboardEvent<HTMLParagraphElement>) => {
    if (e.key === 'Enter') {
      const title = DOMPurify.sanitize(todoTitle);
      dispatch(todoActions.updateTodo({ id, changes: { title } }));
      setIsUpdating(false);
    }
  };

  return (
    <Item>
      <ItemBody>
        <Checkbox checked={completed} onChange={handleCompletedChange} />
        <div>
          <ItemDate>{date}</ItemDate>
          <ItemTitle
            ref={titleRef}
            contentEditable={isUpdating}
            suppressContentEditableWarning={isUpdating}
            onKeyDown={updateTodo}
            onInput={handleTitleChanges}
            onBlur={stopUpdating}
          >
            {title}
          </ItemTitle>
        </div>
      </ItemBody>
      <ItemActions>
        <Button variant="icon" disabled={isUpdating} onClick={startUpdating}>
          <Icon Component={UpdateIcon} />
        </Button>
      </ItemActions>
    </Item>
  );
});
