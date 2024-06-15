import { useAppDispatch, useAppSelector } from 'app/configs/store/hooks';
import { Button } from 'shared/ui/button';
import styled, { css } from 'styled-components';
import { getActiveTodosLength, getTodoFilter } from '../model/selectors/todo-selectors';
import { todoActions } from '../model/slices/todo-slice/todo-slice';
import { FilterActionItem, FILTERS_ACTIONS } from '../model/types/todo-filters';
import { devices } from 'shared/const/breakpoints';

const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (${devices.sm}) {
    flex-direction: column;
    gap: var(--gap-md);
    align-items: unset;
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: var(--gap-md);
`;

const filterActiveStyles = css`
  background: var(--accent-color);
`;

export const TodoFilters = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(getTodoFilter);
  const totalTodos = useAppSelector(getActiveTodosLength);

  const handleFilter = (filter: FilterActionItem) => {
    if (filter.type === currentFilter.type) return;
    dispatch(todoActions.updateFilter(filter));
  };

  const removeCompletedTodos = () => {
    dispatch(todoActions.removeCompletedTodos());
  };

  return (
    <FiltersWrapper>
      <span>{totalTodos} todos left</span>
      <FilterActions>
        {FILTERS_ACTIONS.map((action) => (
          <Button
            key={action.label}
            theme="accent"
            css={currentFilter.type === action.type ? filterActiveStyles : undefined}
            onClick={() => handleFilter(action)}
          >
            {`#${action.label}`}
          </Button>
        ))}
      </FilterActions>
      <Button onClick={removeCompletedTodos}>Remove completed</Button>
    </FiltersWrapper>
  );
};
