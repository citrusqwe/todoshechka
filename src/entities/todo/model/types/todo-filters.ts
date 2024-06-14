export enum FilterActionState {
  'all' = 0,
  'active' = 1,
  'completed' = 2,
}

export interface FilterActionItem {
  label: string;
  type: FilterActionState;
}

export const DEFAULT_FILTER: FilterActionItem = {
  label: 'All',
  type: FilterActionState.all,
};

export const FILTERS_ACTIONS: FilterActionItem[] = [
  DEFAULT_FILTER,
  {
    label: 'Active',
    type: FilterActionState.active,
  },
  {
    label: 'Completed',
    type: FilterActionState.completed,
  },
];
